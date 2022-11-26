<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
<div class="space-y-4">
  <div>
    <label class="text-sm text-dark-purple-gray font-bold">
      {{title}}
    </label>
    <br>
    <label class="text-sm text-grayish">
      {{subtitle}}
    </label>
  </div>
  <slot />
</div>
</template>
