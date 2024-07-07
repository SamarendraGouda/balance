export interface IPosition {
  token0: string
  token1: string
  liquidity0: string
  liquidity1: string
  priceRange: string
  price: string
  minPrice: string
  maxPrice: string
}

export const userPositions = () => useState('position', () => [] as IPosition[])
