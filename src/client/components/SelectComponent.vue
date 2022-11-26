<script setup lang="ts">
defineProps<{
  value: string;
}>()
</script>

<template>
<select
    :value="value"
    type="text"
    class="bg-app-bg appearance-none rounded-md focus:border-purple-2 py-3 px-6 w-full bg-[url('@client/assets/icons/chevron-down-purple.svg')] bg-no-repeat bg-[center_right_1rem]"
>
  <slot />
</select>
</template>
