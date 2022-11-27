<script setup lang="ts">
import {reactive} from "vue";
import type {SignupForm} from "@client/types/authenticationTypes";
import WrapperInput from "@client/components/WrapperInput.vue";
import InputComponent from "@client/components/InputComponent.vue";
import AuthenticationService from "@client/services/AuthenticationService";
import {ValidationError} from "@client/types/validationError";

const state = reactive<{
  form: SignupForm;
  validationError?: ValidationError;
}>({
  form: {
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  },
  validationError: undefined
});

const emits = defineEmits(['login'])

const signup = async () => {
  try {
    const response = await AuthenticationService.signup(state.form)
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
        Sign up
      </h1>
      <form
          class="space-y-6"
          @submit.prevent="signup"
      >
        <WrapperInput title="First name">
          <InputComponent
              v-model="state.form.first_name"
              name="first_name"
              :validation-error="state.validationError"
          />
        </WrapperInput>
        <WrapperInput title="Last name">
          <InputComponent
              v-model="state.form.last_name"
              name="last_name"
              :validation-error="state.validationError"
          />
        </WrapperInput>
        <WrapperInput title="Username">
          <InputComponent
              v-model="state.form.username"
              name="username"
              :validation-error="state.validationError"
          />
        </WrapperInput>
        <WrapperInput title="Password">
          <InputComponent
              v-model="state.form.password"
              name="password"
              :validation-error="state.validationError"
          />
        </WrapperInput>
        <div class="w-full flex justify-end items-center space-x-4">
          <button
              type="button"
              class="button button-tertiary"
              @click="emits('login')"
          >
            Login
          </button>
          <span>OR</span>
          <button
              type="submit"
              class="button button-primary"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
</template>
