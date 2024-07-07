export function useToken() {
  const tokens = {
    eth: 'https://cdn.instadapp.io/icons/tokens/eth.svg',
    wsteth: 'https://cdn.instadapp.io/icons/tokens/wstETH.svg',
  }

  // @ts-expect-error
  const getTokenUrl = (token: string) => tokens[token] || ''
  return {
    tokens,
    getTokenUrl,
  }
}
