<script setup>

</script>

<template>
  <div class="bg-white/[0.04] h-[442px] w-[400px] rounded-7.5 p-6">
    <div class="flex flex-row justify-between items-center">
      <h2 class="font-semibold flex flex-row gap-2">
        <div class="relative z-0 flex items-center justify-center -space-x-2 overflow-hidden">
          <img
            src="https://cdn.instadapp.io/icons/tokens/eth.svg"
            alt="token"
            class="w-4 h-4"
          >
          <img
            src="https://cdn.instadapp.io/icons/tokens/wsteth.svg"
            alt="token"
            class="w-4 h-4"
          >
        </div>
        ETH/wstETH
      </h2>
      <div class="flex justifly-center items-center gap-2 text-xs">
        <div class="rounded-full w-2 h-2 bg-green-500" />
        <span class="text-green-500">In Range</span>
      </div>
    </div>
    <div
      class="w-full flex flex-col justify-between items-center gap-4 mt-4 p-4 rounded-7.5 bg-white/[0.04]"
    >
      <div class="w-full flex flex-col justify-between items-center gap-4 rounded-7.5">
        <div
          class="w-full flex flex bg-white/[0.04] rounded-5 h-[80px] p-4 justify-between items-center gap-4 font-medium"
        >
          <img
            src="https://cdn.instadapp.io/icons/tokens/eth.svg"
            alt="token"
            class="w-8 h-8"
          >
          <div class="flex flex-col items-end">
            <p>ETH (48%)</p>
            <p>0.0000</p>
          </div>
        </div>
        <div
          class="w-full flex bg-white/[0.04] rounded-5 h-[80px] p-4 justify-between items-center gap-4 font-medium"
        >
          <img
            src="https://cdn.instadapp.io/icons/tokens/wsteth.svg"
            alt="token"
            class="w-8 h-8"
          >
          <div class="flex flex-col items-end">
            <p>wstETH (52%)</p>
            <p>0.0000</p>
          </div>
        </div>
      </div>

      <div class="w-full px-2 text-sm">
        <div class="w-full flex justify-between items-center">
          <span class="text-white/40 font-medium">Min</span>
          <span class="font-semibold">1.171 wstETH/ETH</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="text-white/40 font-medium">Max</span>
          <span class="font-semibold">1.171 wstETH/ETH</span>
        </div>
        <div class="w-full flex justify-between items-center">
          <span class="text-white/40 font-medium">Net Earnigs</span>
          <span class="font-semibold">$1.56</span>
        </div>
      </div>
    </div>
    <UButton block class="mt-4">
      Manage
    </UButton>
  </div>
</template>
