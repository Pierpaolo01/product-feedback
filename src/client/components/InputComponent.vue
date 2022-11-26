<script setup lang="ts">
defineProps<{
  modelValue: string;
}>()

const emits = defineEmits(['update:modelValue'])
</script>

<template>
<input
    :value="modelValue"
    type="text"
    class="bg-app-bg rounded-md focus:border-purple-2 py-3 px-6 w-full"
    @input="emits('update:modelValue')"
>
</template>
