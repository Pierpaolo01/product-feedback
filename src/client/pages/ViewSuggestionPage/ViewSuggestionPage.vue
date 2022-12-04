<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import CommentService from "@client/services/CommentService";
import SuggestionService from "@client/services/suggestionService";
import type {ValidationError} from "@client/types/validationError";
import type {SuggestionType} from "@client/types/suggestionTypes";
import type {CommentType} from "@client/types/commentTypes";
import SuggestionCard from "@client/components/SuggestionCard.vue";
import chevronBack from "@client/assets/icons/chevron-back.svg"
import TextAreaComponent from "@client/components/TextAreaComponent.vue";
import CommentComponent from "@client/pages/ViewSuggestionPage/components/CommentComponent.vue";

const route = useRoute()
const router = useRouter()

const state = reactive<{
  suggestion?: SuggestionType;
  newComment: string;
  comments: CommentType[];
  validationError?: ValidationError;
}>({
  suggestion: undefined,
  newComment: '',
  comments: [],
  validationError: undefined,
})

const getSuggestion = async () => {
  try {
    const response = await SuggestionService.showSuggestion(String(route.params.suggestion_id))
    state.suggestion = response.data.data
  } catch (e) {
    await router.push({name: 'dashboard'})
  }
}

const submitComment = async () => {
  try {
    await CommentService.createComment(String(route.params.suggestion_id), state.newComment.trim())
    state.newComment = ''
    await indexComments()
    await getSuggestion()
  } catch (e: any) {
    if (e.response && e.response.status === 422) {
      state.validationError = e.response.data.data
    }
  }
}

const indexComments = async () => {
  const response = await CommentService.indexSuggestionComments(String(route.params.suggestion_id))
  state.comments = response.data.data;
}

onMounted(() => {
  getSuggestion()
  indexComments()
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
          class="button button-primary shadow-md"
      >
        Edit Feedback
      </router-link>
    </div>
    <SuggestionCard
        :suggestion="state.suggestion"
        :can-navigate="false"
        @refresh="getSuggestion"
    />
    <div class="space-y-6 mt-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-xl text-dark-purple font-bold mb-6">{{ state.comments.length }} Comments</h1>
        <div>
          <CommentComponent
              v-for="comment in state.comments"
              :key="comment.id"
              :comment="comment"
              @refreshComments="indexComments"
          />
        </div>
      </div>
      <div class="space-y-4 bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-xl mb-6 text-dark-purple font-bold">Add Comment</h1>
        <TextAreaComponent v-model="state.newComment" name="text" :validation-error="state.validationError"/>
        <form
            class="flex justify-between"
            @submit.prevent="submitComment"
        >
          <span class="text-grayish">
            {{ 250 - state.newComment.length }} Characters left
          </span>
          <button class="button button-secondary">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
