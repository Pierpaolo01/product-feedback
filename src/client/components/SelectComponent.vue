<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  modelValue: string;
}>()
const emits = defineEmits(['update:modelValue'])
const test = ref('')

const gsModelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <select
      v-model="gsModelValue"
      class="bg-app-bg appearance-none rounded-md focus:border-purple-2 py-3 px-6 w-full bg-[url('@client/assets/icons/chevron-down-purple.svg')] bg-no-repeat bg-[center_right_1rem]"
  >
    <slot />
  </select>
</template>
