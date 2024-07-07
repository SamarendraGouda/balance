<script setup lang="ts">
const { address, isConnected } = useAccount()
const { connectAsync, connectors } = useConnect()

async function handleConnect() {
  console.log(connectors)
  await connectAsync({
    connector: connectors[0],
    chainId: 1115511,
  })
}
</script>

<template>
  <UButton @click="handleConnect">
    Connect Wallet
  </UButton>
</template>
