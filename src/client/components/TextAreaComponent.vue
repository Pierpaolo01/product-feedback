<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string;
  rows?: number;
}>(), {
  rows: 3
})

const emits = defineEmits(['update:modelValue'])
</script>

<template>
<textarea
    :value="modelValue"
    type="text"
    :rows="rows"
    class="bg-app-bg rounded-md focus:border-purple-2 py-3 px-6 w-full rows"
    @input="emits('update:modelValue')"
/>
</template>
