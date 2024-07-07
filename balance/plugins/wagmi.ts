import { mainnet, sepolia } from 'use-wagmi/chains'
import { UseWagmiPlugin, createConfig } from 'use-wagmi'
import { coinbaseWallet, mock, walletConnect } from 'use-wagmi/connectors'

// import SVGCoinbase from '~/assets/icons/coinbase.svg?inline'
// import SVGWalletConnect from '~/assets/icons/walletConnect.svg?inline'

export default defineNuxtPlugin((nuxtContext) => {
  const chains = [sepolia]

  const rpcList = {
    11155111: [
      'https://sepolia.drpc.org',
      'https://rpc2.sepolia.org',
    ],
  }

  const config = createConfig({
    chains: [sepolia],
    // connectors: connectors.map(i => i.connector()),
    transports: {
      [sepolia.id]: fallback(rpcList[sepolia.id].map(i => http(i))),
    },
  })

  nuxtContext.vueApp.use(UseWagmiPlugin, { config })

  return {
    provide: {
      supportedChains: chains,
      wagmiConfig: config,
    //   connectors,
    },
  }
})
