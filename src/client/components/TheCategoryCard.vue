<script setup lang="ts">
import { SuggestionCategories } from "@constants/suggestionCategories";
import BadgeComponent from "@client/components/BadgeComponent.vue";
</script>

<template>
  <div class="w-[225px] rounded-lg bg-white lg:w-[250px] p-5 flex flex-wrap">
    <div
        v-for="category in SuggestionCategories"
        :key="category"
    >
      <BadgeComponent :text="category" class="mx-1 my-2"/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TheCategoryCard"
}
</script>
