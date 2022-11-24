<script setup lang="ts">
import DashboardLayout from "@client/layouts/DashboardLayout.vue";
import TheCategoryCard from "@client/components/TheCategoryCard.vue";
import TheRoadmapCard from "@client/components/TheRoadmapCard.vue";
</script>

<template>
  <div>
    <DashboardLayout>
      <template #navItems>
        <TheCategoryCard />
        <TheRoadmapCard />
      </template>
    </DashboardLayout>
  </div>
</template>
