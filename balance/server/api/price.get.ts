export default defineEventHandler(async () => {
  const data = await fetch('https://prices.instadapp.io/mainnet/tokens').then(res => res.json())

  const ethPrice = data.find(token => token.symbol === 'ETH').price
  const wstETHPrice = data.find(token => token.symbol === 'wstETH').price

  const ethInWstETH = wstETHPrice / ethPrice
  const wstETHInEth = ethPrice / wstETHPrice
  return {
    ethPrice,
    wstETHPrice,
    ethInWstETH,
    wstETHInEth,
  }
})
