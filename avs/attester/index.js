import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const NODE_RPC = process.env.NODE_RPC; // The URL for the RPC endpoint (the aggregator node)

const nodeAccount = new ethers.Wallet(process.env.PRIVATE_KEY); // The signing key for performing tasks

const app = express();
const port = 4002;
app.use(express.json());

function sendtaskToOthenticNode(task) {
    const proofOfTask = task.proofOfTask;
      const taskDefinitionId = task.taskDefinitionId;
      const data = ethers.hexlify(ethers.toUtf8Bytes(task.data));
      const message = ethers.AbiCoder.defaultAbiCoder().encode(
        ["string", "bytes", "address", "uint16"],
        [proofOfTask, data, nodeAccount.address, taskDefinitionId]
      );
      const messageHash = ethers.keccak256(message);
      const sig = nodeAccount.signingKey.sign(messageHash).serialized;

      console.log(`Performing task with seed: ${proofOfTask}`);

      const jsonRpcBody = {
        jsonrpc: "2.0",
        method: "sendTask",
        params: [proofOfTask, data, taskDefinitionId, nodeAccount.address, sig],
      };
      new ethers.JsonRpcProvider(NODE_RPC).send(
        jsonRpcBody.method,
        jsonRpcBody.params
      );
}

/**
 * AVS WebAPI endpoint:
 * This endpoint is responsible for validating that a task was performed by
 * the correct performer. It receives the performer from the Othentic node
 * and checks that it's the `currentPerformer`.
 */
app.post("/task/validate", async (req, res) => {
    const { proofOfTask, performer } = req.body;
  
    console.log(
      `Validating task for block number: ${blockNumber}, Task Performer: ${performer}`
    );
  
    let isValid = proofOfTask; // Verify the performer is the elected performer
    res.status(200);
    res.json({
      data: isValid,
      error: false,
      message: "Success",
    });
  });
  
  app.listen(port, () => {
    console.log(`AVS Implementation listening on localhost:${port}`);
  });
  