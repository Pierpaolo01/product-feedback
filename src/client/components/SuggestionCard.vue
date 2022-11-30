<script setup lang="ts">
import BadgeComponent from "@client/components/BadgeComponent.vue";
import comment from "@client/assets/icons/comment.svg";
import SuggestionService from "@client/services/suggestionService";
import type {SuggestionType} from "@client/types/suggestionTypes";
import {useRouter} from "vue-router";

const router = useRouter()

const props = withDefaults(defineProps<{
  suggestion: SuggestionType;
  canNavigate?: boolean;
}>(), {
  canNavigate: true
})

const emits = defineEmits(['refresh'])

const likeOrUnlikeSuggestion = async () => {
  if (!props.suggestion.is_liked) {
    await SuggestionService.createSuggestionLike(props.suggestion.id)
  } else {
    await SuggestionService.deleteSuggestionLike(props.suggestion.id)
  }
  emits('refresh')
}

const navigate = () => {
  if (props.canNavigate) router.push({name: 'view-suggestion', params: {suggestion_id: props.suggestion.id}})
}
</script>

<template>
  <div class="rounded-xl">
    <div class="grid grid-cols-2 md:grid-cols-6 p-4 bg-white rounded-lg">
      <div
          class="col-span-2 md:col-span-4 flex flex-col items-start"
          :class="canNavigate ? 'cursor-pointer' : 'cursor-default'"
          @click="navigate"
      >
        <h1 class="font-bold text-lg">{{ suggestion.title }}</h1>
        <p>{{ suggestion.description }}</p>
        <span class="inline-flex cursor-default items-center px-2.5 py-1.5 font-bold text-purple-2 font-semibold rounded-md text-xs font-medium bg-app-bg-darker mt-3">
          {{ suggestion.category }}
        </span>
      </div>
      <div class="col-span-1 md:order-first mt-4 md:mt-0 flex justify-self-start">
        <BadgeComponent
            class="text-center h-fit flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-2"
            :class="suggestion.is_liked ? 'stroke-white' : 'stroke-purple-2'"
            :is-selected="suggestion.is_liked"
            @click="likeOrUnlikeSuggestion"
        >
          <svg :class="suggestion.is_liked ? 'stroke-white' : 'stroke-purple-2'"
               width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L5 2L9 6" stroke-width="2"/>
          </svg>
          <span class="font-bold">{{suggestion.likes}}</span>
        </BadgeComponent>
      </div>
      <div class="col-span-1 mt-4 flex justify-self-end md:mt-0">
        <span class="inline-flex items-center px-2.5 py-1.5 space-x-2">
          <img :src="comment" alt="comment_icon">
          <span class="text-gray-700 font-bold text-sm text-dark-purple-gray">69</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
