<script setup lang="ts">

const { createPosition } = usePosition()
const formData = ref<any> (null)

const amount0 = ref<string>('')
const amount1 = ref<string>('')
const priceRange = ref<string>('')
const minPrice = ref<string>('')
const maxPrice = ref<string>('')

const price = asyncComputed(() => {
  const { data } = $fetch('/api/price')
  return data.wstETHInEth
})

watchEffect(() => {
  if (price.value) {
    minPrice.value = (price.value * (1 - Number(priceRange.value))).toFixed(3)
    maxPrice.value = (price.value * (1 + Number(priceRange.value))).toFixed(3)
  }
})

async function handleAddPosition() {
  await createPosition({
    amount0: Number(amount0.value),
    amount1: Number(amount1.value),
    minPrice: Number(minPrice.value),
    maxPrice: Number(maxPrice.value),
  })
}
</script>

<template>
  <div class="px-24 mt-2 mb-12 w-full flex flex-col justify-center items-center gap-4">
    <div class="w-[500px] flex flex-row justify-between items-center px-4">
      <h1 class="text-xl font-semibold">
        Add Liquidity
      </h1>
    </div>
    <div class="w-[500px] bg-white/[0.04] rounded-7.5 h-[600px] p-8 flex flex-col gap-6">
      <div class="w-full flex flex-row justify-between items-center bg-white/[0.04] px-6 py-4 rounded-5">
        <div class="flex flex-col justify-center items-center gap-2 w-[60px]">
          <img
            src="https://cdn.instadapp.io/icons/tokens/eth.svg"
            alt="token"
            class="w-8 h-8"
          >
          <span class="text-sm text-white font-semibold">ETH</span>
        </div>
        <div class="w-full flex flex-col items-end text-xs gap-2 text-white/40">
          <p>Balance 0.005ETH</p>
          <UInput
            v-model="amount0"
            class="w-3/4"
            placeholder="0.0000"
            type="number"
          />
        </div>
      </div>

      <div class="w-full flex flex-row justify-between items-center bg-white/[0.04] px-6 py-4 rounded-5">
        <div class="flex flex-col justify-center items-center gap-2">
          <img
            src="https://cdn.instadapp.io/icons/tokens/wsteth.svg"
            alt="token"
            class="w-8 h-8"
          >
          <span class="text-sm text-white font-semibold">wstETH</span>
        </div>
        <div class="w-full flex flex-col items-end text-xs gap-2 text-white/40">
          <p>Balance 0.005ETH</p>
          <UInput
            v-model="amount1"
            class="w-3/4"
            placeholder="0.0000"
            type="number"
          />
        </div>
      </div>

      <!-- price -->
      <!-- price range -->
      <!--  -->
      <div class="w-full flex flex-row justify-between items-between bg-white/[0.04] px-6 py-4 rounded-5">
        <div class="flex flex-col justify-center items-center gap-2">
          Price Range %
        </div>
        <div class="flex flex-col items-end text-xs gap-2 text-white/40">
          <UInput
            v-model="priceRange"
            class="w-1/2"
            placeholder="0.0000"
            type="number"
          />
        </div>
      </div>

      <div class="flex flex-col w-full bg-white/[0.04] h-40 rounded-5 px-6 py-4 text-sm">
        <div class="w-full flex justify-between items-center">
          <span class="text-white/40 font-medium">Current Price (in wstETH)</span>
          <span class="font-semibold">0.857</span>
        </div>

        <div class="w-full flex justify-between items-center">
          <span class="text-white/40 font-medium">Price Range</span>
          <span class="font-semibold">0.852 to 0.862</span>
        </div>

        <div class="bg-yellow-500/[0.08] px-4 py-2 rounded-[10px] text-yellow-700 mt-[10px]">
          <p> &#x26A0; We only support 50% of the pool</p>
          <p> &#x26A0; Rebalancing fees (0.02% of pool value) will be applied whenever position is rebalanced</p>
        </div>
      </div>

      <UButton block @click="handleAddPosition">
        Add Liquidity
      </UButton>
    </div>
  </div>
</template>
