<script setup lang="ts">
const { address, isConnected } = useAccount()
const positons = userPositions()

async function handleCreatePosition() {
  await navigateTo('/create')
}
</script>

<template>
  <div class="px-24 my-12 w-full flex flex-col justify-center items-center gap-4">
    <div class="w-full flex flex-row justify-between items-center px-4">
      <h1 class="text-xl font-semibold">
        Your Positions
      </h1>
      <UButton :disabled="!isConnected" @click="handleCreatePosition">
        + Create Position
      </UButton>
    </div>
    <CardEmpty
      v-if="!isConnected || !positons.length"
      :is-connected="isConnected"
    />

    <div
      v-else
      class="w-full grid grid-cols-3 gap-4"
    >
      <CardPosition
        v-for="position in positons"
        :key="position.id"
        :position="position"
      />
    </div>
  </div>
</template>
