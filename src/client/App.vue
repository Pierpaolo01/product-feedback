<script setup lang="ts">
import DashboardLayout from "@client/layouts/DashboardLayout.vue";
import TheCategoryCard from "@client/components/TheCategoryCard.vue";
import TheRoadmapCard from "@client/components/TheRoadmapCard.vue";
import TheHeaderComponent from "@client/components/TheHeaderComponent.vue";
import SuggestionCard from "@client/components/SuggestionCard.vue";
</script>

<template>
  <div>
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
  </div>
</template>

<style>
.button {
  @apply px-6 py-3 font-bold rounded-lg text-sm;
}

.button-lg {
  @apply px-6 py-4 font-bold rounded-lg text-sm;
}

.button-primary {
  @apply bg-purple-2 hover:bg-[#7C91F9];
}

.button-secondary {
  @apply bg-[#7C91F9] hover:bg-[#C75AF6];
}

.button-tertiary {
  @apply bg-[#3A4374] hover:bg-[#656EA3];
}

.button-deletion {
  @apply bg-red hover:bg-red-lighter;
}

.button-back {
  @apply hover:underline bg-[#373F68];
}

</style>
