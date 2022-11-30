<script setup lang="ts">
import {reactive} from "vue";
import {SortBy} from "@constants/sortByEnum";
import bulb from "@client/assets/icons/bulb.svg"
import checkMark from "@client/assets/icons/check-mark.svg"
import chevronUp from "@client/assets/icons/chevron-up.svg"
import chevronDown from "@client/assets/icons/chevron-down.svg"

defineProps<{
  suggestionCount: number;
}>()

const state = reactive<{
  sortBy: SortBy
  toggleSortOptions: boolean;
}>({
  sortBy: SortBy.LATEST,
  toggleSortOptions: false
})
</script>

<template>
  <div class="bg-dark-purple flex justify-between items-center text-white py-5 px-6 md:rounded-xl">
    <div class="flex items-center md:space-x-10 text-lg font-bold">
      <div class="hidden md:flex items-center">
        <img :src="bulb" alt="idea_bulb" class="mr-4">
        <span>
          {{ suggestionCount ?? 0 }} Suggestions
        </span>
      </div>
      <div class="relative">
        <p class="text-sm cursor-pointer" @click.prevent="state.toggleSortOptions = !state.toggleSortOptions">
          Sort by:
          <span class="font-bold text-sm text-center">{{ state.sortBy }}</span>
          <img :src="state.toggleSortOptions ? chevronUp : chevronDown" alt="chevron_arrow" class="inline-block self-center ml-2">
        </p>
        <ul
            v-if="state.toggleSortOptions"
            v-click-away="() => state.toggleSortOptions = false"
            class="absolute text-sm top-16 w-[250px] bg-white text-black divide-y px-6 rounded-md shadow-2xl"
        >
          <li
              v-for="option in SortBy"
              :key="option"
              class="-mx-6 px-6 py-3 hover:text-purple cursor-pointer flex justify-between"
              @click="state.sortBy = option; state.toggleSortOptions = false"
          >
            {{ option }}
            <img v-if="state.sortBy === option" :src="checkMark" alt="check_mark">
          </li>
        </ul>
      </div>
    </div>
    <router-link
        :to="{name: 'create-suggestion'}"
        class="button button-primary"
    >
      + Add Feedback
    </router-link>
  </div>
</template>
