export function usePosition() {
  const positions = userPositions()
  async function createPosition(data: IPosition) {
    positions.value.push(data)
  }
  return {
    positions,
    createPosition,
  }
}
