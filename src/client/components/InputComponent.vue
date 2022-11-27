<script setup lang="ts">
import {ValidationError} from "@client/types/validationError";
import {computed, ref, watch} from "vue";

let props = withDefaults(defineProps<{
  modelValue: string;
  validationError?: ValidationError;
  name: string;
}>(), {
  name: ''
})
const emits = defineEmits(['update:modelValue'])

const error = ref({...props.validationError});

const validation = computed(() => {
    if (error.value) {
      return error.value.errors?.filter((error) => error.param === props.name)[0]
    }
})

const deleteValidation = () => {
  if (error.value) {
    error.value.errors = error.value.errors?.filter((error) => error.param !== props.name)
  }
}
watch(
    () => props.validationError,
    (value) => {
      error.value = {...value}
    }
)
</script>

<template>
  <div class="space-y-2">
    <input
        :value="modelValue"
        type="text"
        class="bg-app-bg rounded-md focus:border-purple-2 py-3 px-6 w-full"
        :class="validation ? 'border border-red' : ''"
        @input="emits('update:modelValue', $event.target.value); deleteValidation()"
    >
    <p v-if="validation" class="text-red">
      {{validation.msg}}
    </p>
  </div>
</template>
