<script setup lang="ts">
import {reactive} from "vue";
import LoginForm from "@client/pages/AuthenticationPage/components/LoginForm.vue";
import SignUpForm from "@client/pages/AuthenticationPage/components/SignUpForm.vue";

const state = reactive<{
  form: 'login' | 'signup';
}>({
  form: 'login',
})
</script>

<template>
  <div class="pt-[33%]">
    <div class="flex-1 max-w-xl mx-auto bg-white p-6 rounded-lg space-y-6">
      <LoginForm
          v-if="state.form === 'login'"
          @signup="state.form = 'signup'"
      />
      <SignUpForm
          v-if="state.form === 'signup'"
          @login="state.form = 'login'"
      />
    </div>
  </div>
</template>
