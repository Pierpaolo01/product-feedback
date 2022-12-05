<script setup lang="ts">
import ChevronBack from "@client/assets/icons/chevron-back.svg"
</script>

<template>
  <div class="bg-dark-purple flex justify-between items-center text-white py-5 px-6 md:rounded-xl">
    <div>
      <router-link :to="{name:'dashboard'}" class="button button-back text-sm md:text-base flex items-center space-x-2 -mx-6">
        <img :src="ChevronBack" alt="back" class="fill-white"> <span>Go Back</span>
      </router-link>
      <h1 class="text-lg md:text-2xl font-bold">
        Roadmap
      </h1>
    </div>
    <router-link
        :to="{name: 'create-suggestion'}"
        class="button button-primary"
    >
      + Add Feedback
    </router-link>
  </div>
</template>

<style scoped>
.button-back {
  @apply text-white
}
</style>
