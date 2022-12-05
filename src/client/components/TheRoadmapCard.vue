<script setup lang="ts">
import {onMounted, reactive} from "vue";
import RoadmapService from "@client/services/roadmapService";
import type {StatusCount} from "@client/types/roadmapTypes";

const state = reactive<{
  roadmapCount: StatusCount[]
}>({
  roadmapCount: []
})

const countStatuses = async () => {
  const response = await RoadmapService.countStatuses()
  state.roadmapCount = response.data.data
}

onMounted(() => {
  countStatuses()
})
</script>

<template>
  <div class="w-[225px] rounded-lg bg-white lg:w-[250px] p-5 space-y-6 shadow-md">
    <div class="flex justify-between">
      <h3 class="font-bold text-lg">
        Roadmap
      </h3>
      <router-link
          :to="{name: 'roadmap'}"
          class="underline text-sm text-purple-2"
      >
        view
      </router-link>
    </div>
    <ul class="space-y-2">
      <li
          v-for="status in state.roadmapCount"
          class="flex justify-between"
      >
        <div class="flex items-center">
          <div class="h-2 w-2 bg-[#F49F85] mr-4 text-grayish rounded-full"/>
          {{ status.status }}
        </div>
        <span class="font-bold text-grayish">
          {{ status.count }}
        </span>
      </li>
    </ul>
  </div>
</template>
