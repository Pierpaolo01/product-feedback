<script setup lang="ts">
import BadgeComponent from "@client/components/BadgeComponent.vue";
import comment from "@client/assets/icons/comment.svg";
</script>

<template>
  <div class="rounded-lg">
    <div class="grid grid-cols-2 md:grid-cols-6 p-4 bg-white rounded-lg">
      <div class="col-span-2 md:col-span-4 flex flex-col items-start">
        <h1 class="font-bold text-lg">title</h1>
        <p>suggestion.description</p>
        <span class="inline-flex items-center px-2.5 py-1.5 font-bold text-purple-2 font-semibold rounded-md text-xs font-medium bg-app-bg-darker mt-3">
          suggestion.category
        </span>
      </div>
      <div class="col-span-1 md:order-first mt-4 md:mt-0 flex justify-self-start">
          <BadgeComponent class="text-center h-fit flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-2">
            <svg class="stroke-purple-2" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L5 2L9 6" stroke-width="2"/>
            </svg>
            <span class="text-[#3A4374] font-bold">2</span>
          </BadgeComponent>
      </div>
      <div class="col-span-1 mt-4 flex justify-self-end md:mt-0">
        <span class="inline-flex items-center px-2.5 py-1.5 space-x-1">
          <img :src="comment" alt="comment_icon">
          <span class="text-gray-700 font-bold text-sm text-[#3A4374]">69</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>