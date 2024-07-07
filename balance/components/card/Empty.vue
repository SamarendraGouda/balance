<script setup lang="ts">
defineProps<{
  isConnected: boolean
}>()
</script>

<template>
  <div
    class="bg-white/[0.04] text-white/40 rounded-7.5 h-[486px] w-full flex justify-center items-center"
  >
    {{ isConnected ? 'Your active Uniswap positions will be displayed here.' : 'Connect your wallet to view your Uniswap positions.' }}
  </div>
</template>
