<script setup lang="ts">
import editIcon from "@client/assets/icons/edit-icon.svg"
import {onMounted, reactive} from "vue";
import {SuggestionCategories} from "@constants/suggestionCategories";
import WrapperInput from "@client/components/WrapperInput.vue";
import InputComponent from "@client/components/InputComponent.vue";
import SelectComponent from "@client/components/SelectComponent.vue";
import TextAreaComponent from "@client/components/TextAreaComponent.vue";
import chevronBack from "@client/assets/icons/chevron-back.svg"
import type {SuggestionType} from "@client/types/suggestionTypes";
import SuggestionService from "@client/services/suggestionService";
import {useRoute, useRouter} from "vue-router";
import {ValidationError} from "@client/types/validationError";
import {SuggestionStatus} from "@constants/suggestionStatus";

const route = useRoute()
const router = useRouter()

const state = reactive<{
  form?: SuggestionType;
  suggestion?: SuggestionType;
  validationError?: ValidationError;
}>({
  form: undefined,
  suggestion: undefined,
  validationError: undefined
})

const getSuggestion = async () => {
  try {
    const response = await SuggestionService.showSuggestion(String(route.params.suggestion_id))
    state.suggestion = response.data.data
    state.form = {...state.suggestion}
  } catch (e) {
    await router.push({name: 'dashboard'})
  }
}

const updateSuggestion = async () => {
  if (!state.form) return
  try {
    await SuggestionService.updateSuggestion(String(route.params.suggestion_id), state.form)
    await router.back()
  } catch (e) {
    if (e.response && e.response.status === 422) {
      state.validationError = e.response.data.data
    }
  }
}

const deleteSuggestion = async () => {
  await SuggestionService.deleteSuggestion(String(route.params.suggestion_id))
  await router.back()
}

onMounted(() => {
  getSuggestion()
})
</script>

<template>
  <div class="max-w-xl mx-auto space-y-10 mt-20">
    <div>
      <button
          class="button-back flex items-center space-x-4"
          @click="router.back()"
      >
        <img :src="chevronBack" alt="chevron_back">
        <span>
          Go Back
        </span>
      </button>
    </div>
    <form
        v-if="state.form && state.suggestion"
        class="bg-white p-10 rounded-lg relative"
        @submit.prevent="updateSuggestion"
    >
      <img :src="editIcon" alt="plus_icon" class="absolute -top-5">
      <h1 class="font-bold text-2xl text-dark-purple-gray mt-3">Editing '{{state.suggestion.title}}'</h1>
      <div class="mt-10 space-y-6">
        <WrapperInput title="Feedback Title" subtitle="Add a short, descriptive headline">
          <InputComponent
              v-model="state.form.title"
              name="title"
              :validation-error="state.validationError"
          />
        </WrapperInput>
        <WrapperInput title="Category" subtitle="Choose a category for your feedback">
          <SelectComponent
              v-model="state.form.category"
              name="category"
              :validation-error="state.validationError"
          >
            <option
                v-for="category in SuggestionCategories"
                :key="category"
                :value="category"
                class="text-dark-purple-gray"
            >
              {{ category }}
            </option>
          </SelectComponent>
        </WrapperInput>
          <WrapperInput title="Update status" subtitle="Change feature state">
            <SelectComponent
                v-model="state.form.status"
                name="status"
                :validation-error="state.validationError"
            >
              <option
                  v-for="status in SuggestionStatus"
                  :key="status"
                  :value="status"
                  class="text-dark-purple-gray"
              >
                {{ status }}
              </option>
            </SelectComponent>
        </WrapperInput>
        <WrapperInput title="Feedback Detail" subtitle="Include any specific comments on what should be improved, added, etc.">
          <TextAreaComponent
              v-model="state.form.description"
              name="description"
              :validation-error="state.validationError"
          />
        </WrapperInput>
      </div>
      <div class="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between mt-8">
        <div>
          <button
              type="button"
              class="button button-deletion"
              @click="deleteSuggestion"
          >
            Delete
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <router-link :to="{name: 'dashboard'}" type="button" class="button button-tertiary">Cancel</router-link>
          <button type="submit" class="button button-primary">Save Changes</button>
        </div>
      </div>
    </form>
  </div>
</template>
