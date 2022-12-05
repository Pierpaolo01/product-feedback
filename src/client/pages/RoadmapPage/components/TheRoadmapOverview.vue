<script setup lang="ts">
import RoadmapService from "@client/services/roadmapService";
import {computed, onMounted, reactive} from "vue";
import {StatusCount} from "@client/types/roadmapTypes";
import RoadmapColumn from "@client/pages/RoadmapPage/components/RoadmapColumn.vue";

const state = reactive<{
  statusColumns: StatusCount[];
  selectedTab: string;
}>({
  statusColumns: [],
  selectedTab: ''
})

const getStatuses = async () => {
  const response = await RoadmapService.countStatuses(true)
  state.statusColumns = response.data.data
  state.selectedTab = state.statusColumns[0].status
}

const getStatusTab = computed(() => {
  return state.statusColumns.filter(item => item.status === state.selectedTab)
})

onMounted(() => getStatuses())
</script>

<template>
  <div class="w-full h-16 border-b space-x-4 px-6 md:hidden">
    <button
        v-for="tab in state.statusColumns"
        :key="tab.status"
        :class="state.selectedTab === tab.status ? 'text-dark-purple border-b-4 border-blue-700 ' : 'text-grayish'"
        class="h-full font-bold"
        @click="state.selectedTab = tab.status"
    >
      {{ tab.status }}
    </button>
  </div>
  <div class="flex flex-col md:flex-row md:space-x-6">
    <RoadmapColumn
        class="hidden md:block"
        v-for="column in state.statusColumns"
        :key="column.status"
        :column="column"
    />
    <RoadmapColumn
        v-if="getStatusTab[0]"
        class="md:hidden"
        :column="getStatusTab[0]"
    />
  </div>
</template>
