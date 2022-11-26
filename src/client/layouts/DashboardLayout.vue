<script setup lang="ts">
import hamburgerMenu from "@client/assets/icons/hamburger-menu.svg"
import cross from "@client/assets/icons/cross.svg"
import {reactive} from "vue";

const state = reactive<{
  toggleNav: boolean;
}>({
  toggleNav: false
})
</script>

<template>
  <div class="w-full fixed top-0">
    <div class="flex flex-col md:hidden">
      <div class="gradient h-16 flex justify-between items-center px-6">
        <h1 class="text-center text-white font-bold">
          product feedback
        </h1>
        <img
            :src="!state.toggleNav ? hamburgerMenu : cross"
            alt="hamburger_menu"
            class="cursor-pointer"
            @click="state.toggleNav = !state.toggleNav"
        >
      </div>
      <slot name="header" />
      <main class="p-6 space-y-4">
        <slot name="content" />
      </main>
    </div>
    <aside
        v-if="state.toggleNav"
        class="bg-black/20 fixed top-16 flex justify-end right-0 h-full w-full"
    >
      <nav
          v-click-away="() => state.toggleNav = false"
          class="w-fit p-6 bg-app-bg space-y-6"
      >
        <slot name="navItems"/>
      </nav>
    </aside>
  </div>
  <div class="hidden md:flex flex-col p-8 max-w-7xl mx-auto">
    <div class="flex flex-col w-full space-y-8 lg:space-x-8 lg:space-y-0 lg:flex-row">
      <aside class="space-x-6 lg:space-x-0 lg:space-y-6 flex flex-row lg:flex-col justify-between">
        <div class="w-[225px] h-[225px] rounded-lg bg-white lg:w-[250px] p-5 gradient">
          <h1 class="text-center text-2xl text-white font-bold">
            product feedback
          </h1>
        </div>
        <slot name="navItems"/>
      </aside>
      <main class="space-y-6 flex-1">
        <slot name="header" />
        <slot name="content" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%);
}
</style>
