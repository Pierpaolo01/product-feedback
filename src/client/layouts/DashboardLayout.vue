<script setup lang="ts">
import TheHeaderComponent from "@client/components/TheHeaderComponent.vue";
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
            @click="state.toggleNav = !state.toggleNav"
        >
      </div>
      <TheHeaderComponent />
    </div>
    <aside
        v-if="state.toggleNav"
        class="p-6 bg-white fixed top-16 right-0 h-full"
    >
      <div class="w-[250px]">dsfs</div>
      dfs
    </aside>
  </div>
  <div class="hidden md:flex flex-col">
    <aside>

    </aside>
    <header>

    </header>
    <main>

    </main>
  </div>
</template>

<style scoped>
.gradient {
  background: radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%);
}
</style>
