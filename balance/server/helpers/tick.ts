// Constants
export const MIN_TICK = -887272
export const MAX_TICK = -MIN_TICK

export const MIN_SQRT_RATIO = 4295128739n
export const MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970342n

/**
 * @notice Calculates sqrt(1.0001^tick) * 2^96
 * @dev Throws if |tick| > max tick
 * @param {number} tick - The input tick for the above formula
 * @return {bigint} A Fixed point Q64.96 number representing the sqrt of the ratio of the two assets (token1/token0) at the given tick
 */
export function getSqrtRatioAtTick(tick) {
  const absTick = tick < 0 ? BigInt(-tick) : BigInt(tick)
  if (absTick > BigInt(MAX_TICK))
    throw new Error('T')

  let ratio = absTick & 0x1n ? 0xFFFCB933BD6FAD37AA2D162D1A594001n : 0x100000000000000000000000000000000n
  if (absTick & 0x2n)
    ratio = (ratio * 0xFFF97272373D413259A46990580E213An) >> 128n
  if (absTick & 0x4n)
    ratio = (ratio * 0xFFF2E50F5F656932EF12357CF3C7FDCCn) >> 128n
  if (absTick & 0x8n)
    ratio = (ratio * 0xFFE5CACA7E10E4E61C3624EAA0941CD0n) >> 128n
  if (absTick & 0x10n)
    ratio = (ratio * 0xFFCB9843D60F6159C9DB58835C926644n) >> 128n
  if (absTick & 0x20n)
    ratio = (ratio * 0xFF973B41FA98C081472E6896DFB254C0n) >> 128n
  if (absTick & 0x40n)
    ratio = (ratio * 0xFF2EA16466C96A3843EC78B326B52861n) >> 128n
  if (absTick & 0x80n)
    ratio = (ratio * 0xFE5DEE046A99A2A811C461F1969C3053n) >> 128n
  if (absTick & 0x100n)
    ratio = (ratio * 0xFCBE86C7900A88AEDCFFC83B479AA3A4n) >> 128n
  if (absTick & 0x200n)
    ratio = (ratio * 0xF987A7253AC413176F2B074CF7815E54n) >> 128n
  if (absTick & 0x400n)
    ratio = (ratio * 0xF3392B0822B70005940C7A398E4B70F3n) >> 128n
  if (absTick & 0x800n)
    ratio = (ratio * 0xE7159475A2C29B7443B29C7FA6E889D9n) >> 128n
  if (absTick & 0x1000n)
    ratio = (ratio * 0xD097F3BDFD2022B8845AD8F792AA5825n) >> 128n
  if (absTick & 0x2000n)
    ratio = (ratio * 0xA9F746462D870FDF8A65DC1F90E061E5n) >> 128n
  if (absTick & 0x4000n)
    ratio = (ratio * 0x70D869A156D2A1B890BB3DF62BAF32F7n) >> 128n
  if (absTick & 0x8000n)
    ratio = (ratio * 0x31BE135F97D08FD981231505542FCFA6n) >> 128n
  if (absTick & 0x10000n)
    ratio = (ratio * 0x9AA508B5B7A84E1C677DE54F3E99BC9n) >> 128n
  if (absTick & 0x20000n)
    ratio = (ratio * 0x5D6AF8DEDB81196699C329225EE604n) >> 128n
  if (absTick & 0x40000n)
    ratio = (ratio * 0x2216E584F5FA1EA926041BEDFE98n) >> 128n
  if (absTick & 0x80000n)
    ratio = (ratio * 0x48A170391F7DC42444E8FA2n) >> 128n

  if (tick > 0)
    ratio = (1n << 256n) / ratio

  return BigInt((ratio >> 32n) + (ratio % (1n << 32n) === 0n ? 0n : 1n))
}

/**
 * @notice Calculates the greatest tick value such that getRatioAtTick(tick) <= ratio
 * @dev Throws in case sqrtPriceX96 < MIN_SQRT_RATIO, as MIN_SQRT_RATIO is the lowest value getRatioAtTick may ever return.
 * @param {bigint} sqrtPriceX96 - The sqrt ratio for which to compute the tick as a Q64.96
 * @return {number} The greatest tick for which the ratio is less than or equal to the input ratio
 */
export function getTickAtSqrtRatio(sqrtPriceX96) {
  if (sqrtPriceX96 < MIN_SQRT_RATIO || sqrtPriceX96 >= MAX_SQRT_RATIO)
    throw new Error('R')
  const ratio = BigInt(sqrtPriceX96) << 32n

  let r = ratio
  let msb = 0

  const assembly = (shift, condition) => {
    if (condition) {
      msb |= shift
      r >>= shift
    }
  }

  assembly(7, r > 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn)
  assembly(6, r > 0xFFFFFFFFFFFFFFFFn)
  assembly(5, r > 0xFFFFFFFFn)
  assembly(4, r > 0xFFFFn)
  assembly(3, r > 0xFFn)
  assembly(2, r > 0xFn)
  assembly(1, r > 0x3n)
  assembly(0, r > 0x1n)

  if (msb >= 128)
    r = ratio >> BigInt(msb - 127)
  else r = ratio << BigInt(127 - msb)

  let log_2 = (BigInt(msb) - 128n) << 64n

  const logAssembly = (shift, value) => {
    r = (r * r) >> 127n
    const f = r >> 128n
    log_2 |= f << shift
    r >>= f
  }

  logAssembly(63, r)
  logAssembly(62, r)
  logAssembly(61, r)
  logAssembly(60, r)
  logAssembly(59, r)
  logAssembly(58, r)
  logAssembly(57, r)
  logAssembly(56, r)
  logAssembly(55, r)
  logAssembly(54, r)
  logAssembly(53, r)
  logAssembly(52, r)
  logAssembly(51, r)
  logAssembly(50, r)

  const log_sqrt10001 = log_2 * 255738958999603826347141n

  const tickLow = Number((log_sqrt10001 - 3402992956809132418596140100660247210n) >> 128n)
  const tickHi = Number((log_sqrt10001 + 291339464771989622907027621153398088495n) >> 128n)

  return tickLow === tickHi ? tickLow : getSqrtRatioAtTick(tickHi) <= sqrtPriceX96 ? tickHi : tickLow
}
