<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import SuggestionCard from "@client/components/SuggestionCard.vue";
import SuggestionService from "@client/services/suggestionService";
import type {SuggestionType} from "@client/types/suggestionTypes";
import chevronBack from "@client/assets/icons/chevron-back.svg"

const route = useRoute()
const router = useRouter()

const state = reactive<{
  suggestion?: SuggestionType;
}>({
  suggestion: undefined
})

const getSuggestion = async () => {
  try {
    const response = await SuggestionService.showSuggestion(String(route.params.suggestion_id))
    state.suggestion = response.data.data
  } catch (e) {
    await router.push({name: 'dashboard'})
  }

}

onMounted(() => {
  getSuggestion()
})
</script>

<template>
  <div class="max-w-3xl mx-auto" v-if="state.suggestion">
    <div class="w-full flex justify-between py-6">
      <button
          class="button-back flex items-center space-x-4"
          @click="router.back()"
      >
        <img :src="chevronBack" alt="back">
        <span> Go Back</span>
      </button>
      <router-link
          :to="{name: 'edit-suggestion', params: {suggestion_id: state.suggestion.id}}"
          class="button button-primary"
      >
        Edit Feedback
      </router-link>
    </div>
    <SuggestionCard
        :suggestion="state.suggestion"
        :can-navigate="false"
        @refresh="getSuggestion"
    />
  </div>
</template>
