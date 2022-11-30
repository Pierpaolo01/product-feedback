<script setup lang="ts">
import DashboardLayout from "@client/layouts/DashboardLayout.vue";
import TheCategoryCard from "@client/components/TheCategoryCard.vue";
import TheRoadmapCard from "@client/components/TheRoadmapCard.vue";
import TheHeaderComponent from "@client/components/TheHeaderComponent.vue";
import SuggestionCard from "@client/components/SuggestionCard.vue";
import {onMounted, reactive} from "vue";
import FeedbackService from "@client/services/feedbackService";
import {SuggestionCategories} from "@constants/suggestionCategories";

const state = reactive<{
  suggestions: any[];
  currentCategory: SuggestionCategories
}>({
  suggestions: [],
  currentCategory: SuggestionCategories.ALL
})

const indexSuggestions = async () => {
  const response = await FeedbackService.indexSuggestions()
  state.suggestions = response.data.data;
}

onMounted(() => {
  indexSuggestions()
})
</script>

<template>
  <DashboardLayout>
    <template #header>
      <TheHeaderComponent :suggestion-count="state.suggestions.length" />
    </template>
    <template #navItems>
      <TheCategoryCard
          :current-category="state.currentCategory"
          @onSelect="state.currentCategory = $event"
      />
      <TheRoadmapCard />
    </template>
    <template #content>
      <SuggestionCard
          v-for="suggestion in state.suggestions"
          :key="suggestion.id"
          :suggestion="suggestion"
          @refresh="indexSuggestions()"
      />
    </template>
  </DashboardLayout>
</template>
