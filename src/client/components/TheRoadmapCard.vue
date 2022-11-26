<script setup lang="ts">

</script>

<template>
  <div class="w-[225px] rounded-lg bg-white lg:w-[250px] p-5 space-y-6">
    <div class="flex justify-between">
      <h3 class="font-bold text-lg">
        Roadmap
      </h3>
      <router-link to="todo" class="underline text-sm text-purple-2">
        view
      </router-link>
    </div>
    <ul class="space-y-2">
      <li class="flex justify-between">
        <div class="flex items-center">
          <div class="h-2 w-2 bg-[#F49F85] mr-4 text-grayish rounded-full"/>
          Planned
        </div>
        <span class="font-bold text-grayish">
          2
        </span>
      </li>
      <li class="flex justify-between">
        <div class="flex items-center">
          <div class="h-2 w-2 bg-[#AD1FEA] mr-4 text-grayish rounded-full"/>
          In-progress
        </div>
        <span class="font-bold text-grayish">
          2
        </span>
      </li>
      <li class="flex justify-between">
        <div class="flex items-center">
          <div class="h-2 w-2 bg-[#62BCFA] mr-4 text-grayish rounded-full"/>
          In-progress
        </div>
        <span class="font-bold text-grayish">
          2
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheRoadmapCard"
}
</script>

<style scoped>

</style>
