<script setup lang="ts">
defineProps<{
  text?: string
  isSelected?: boolean;
}>()
</script>

<template>
  <div
      class="rounded-lg text-sm w-fit p-2 font-bold capitalize cursor-pointer px-4 py-2"
      :class="isSelected ? 'bg-purple text-white' : 'bg-app-bg-darker text-purple hover:bg-[#CFD7FF]'"
  >
    {{text}}
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "BadgeComponent"
}
</script>
