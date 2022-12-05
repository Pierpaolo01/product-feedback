<script setup lang="ts">
import type {StatusCount} from "@client/types/roadmapTypes";
import SuggestionCard from "@client/components/SuggestionCard.vue";

defineProps<{
  column: StatusCount
}>()
</script>

<template>
  <div class="space-y-6 p-6 md:p-0">
    <div>
      <h1 class="font-bold text-dark-purple text-lg">
        {{column.status}} ({{column.suggestions?.length}})
      </h1>
      <p class="text-sm">TODO</p>
    </div>
    <div class="space-y-4">
      <div
          v-for="suggestion in column.suggestions"
          class="border-t-4 border-blue-700 rounded-t-lg"
      >
        <SuggestionCard
            :suggestion="suggestion"
        />
      </div>
    </div>
  </div>
</template>
