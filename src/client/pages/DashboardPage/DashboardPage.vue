<script setup lang="ts">
import DashboardLayout from "@client/layouts/DashboardLayout.vue";
import TheCategoryCard from "@client/components/TheCategoryCard.vue";
import TheRoadmapCard from "@client/components/TheRoadmapCard.vue";
import TheHeaderComponent from "@client/components/TheHeaderComponent.vue";
import SuggestionCard from "@client/components/SuggestionCard.vue";
</script>

<template>
  <DashboardLayout>
    <template #header>
      <TheHeaderComponent />
    </template>
    <template #navItems>
      <TheCategoryCard />
      <TheRoadmapCard />
    </template>
    <template #content>
      <SuggestionCard />
      <SuggestionCard />
      <SuggestionCard />
    </template>
  </DashboardLayout>
</template>
