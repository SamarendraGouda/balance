<template>
  <main class="bg-slate-950">
    <header class="px-20 py-10 flex justify-between items-center">
      <div class="flex flex-row justify-center items-center gap-8">
        <h1 class="font-semibold text-[28px]">Balance</h1>
        <NavItem />
      </div>
      <NavWalletConnection />
    </header>
    <div class="h-[77vh] overflow-y-auto">
      <slot />
    </div>
    <footer class="flex w-full justify-center items-center text-white/40 py-4">
      <p>&copy; Fleek Hacker House, Brussels 2024</p>
    </footer>
  </main>
</template>