<script setup lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import chevronBack from "@client/assets/icons/chevron-back.svg";
import WrapperInput from "@client/components/WrapperInput.vue";
import InputComponent from "@client/components/InputComponent.vue";
import TextAreaComponent from "@client/components/TextAreaComponent.vue";
import SelectComponent from "@client/components/SelectComponent.vue";
import plusIcon from "@client/assets/icons/plus-icon.svg";
import {SuggestionCategories} from "@constants/suggestionCategories"
import type {CreateSuggestionFormType} from "@client/types/suggestionTypes";
import type {ValidationError} from "@client/types/validationError";
import SuggestionService from "@client/services/suggestionService";

const router = useRouter();

const state = reactive<{
  form: CreateSuggestionFormType;
  validationError?: ValidationError;
}>({
  form: {
    title: '',
    category: SuggestionCategories.ENHANCEMENT,
    description: ''
  },
  validationError: undefined,
})

const createSuggestion = async () => {
  try {
    await SuggestionService.createSuggestion(state.form);
    await router.push({name: 'dashboard'});
  } catch (e: any) {
      console.log(e)
    if (e.response.status === 422) {
      state.validationError = e.response.data.data;
    }
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto space-y-10 mt-12 md:mt-24">
    <div>
      <router-link
          :to="{name: 'dashboard'}"
          class="button-back flex items-center space-x-4"
      >
        <img :src="chevronBack" alt="chevron_back">
        <span>
          Go Back
        </span>
      </router-link>
    </div>
    <form
        class="bg-white p-10 rounded-lg relative"
        @submit.prevent="createSuggestion"
    >
      <img :src="plusIcon" alt="plus_icon" class="absolute -top-5">
      <h1 class="font-bold text-2xl text-dark-purple-gray mt-3">Create New Feedback</h1>
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
        <WrapperInput title="Feedback Detail" subtitle="Include any specific comments on what should be improved, added, etc.">
          <TextAreaComponent
              v-model="state.form.description"
              name="description"
              :validation-error="state.validationError"
          />
        </WrapperInput>
      </div>
      <div class="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row justify-end space-x-4 mt-8">
        <router-link :to="{name: 'dashboard'}" type="button" class="button button-tertiary">Cancel</router-link>
        <button type="submit" class="button button-primary">Add Feedback</button>
      </div>
    </form>
  </div>
</template>
