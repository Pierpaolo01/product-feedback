<script setup lang="ts">
import {reactive} from "vue";
import type {LoginForm} from "@client/types/authenticationTypes";
import WrapperInput from "@client/components/WrapperInput.vue";
import InputComponent from "@client/components/InputComponent.vue";
import AuthenticationService from "@client/services/AuthenticationService";

const state = reactive<{
  form: LoginForm;
  validationError: any;
}>({
  form: {
    username: '',
    password: ''
  },
  validationError: null
})

const emits = defineEmits(['signup'])

const login = async () => {
  try {
    const response = await AuthenticationService.login(state.form)
  } catch (e: any) {
    if (e.response.status === 422) {
      state.validationError = e.response.data.data;
    }
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto bg-white p-6 rounded-lg space-y-6">
    <h1 class="text-2xl font-bold text-dark-purple-gray">
      Login
    </h1>
    <form
        class="space-y-6"
        @submit.prevent="login"
    >
      <WrapperInput title="Username">
        <InputComponent v-model="state.form.username" />
      </WrapperInput>
      <WrapperInput title="Password">
        <InputComponent v-model="state.form.password" />
      </WrapperInput>
      <div class="w-full flex justify-end items-center space-x-4">
        <button
            type="button"
            class="button button-tertiary"
            @click="emits('signup')"
        >
          SignUp
        </button>
        <span>OR</span>
        <button type="submit" class="button button-primary">
          login
        </button>
      </div>
    </form>
  </div>
</template>
