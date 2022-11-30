<script setup lang="ts">

</script>

<template>
  <router-view />
</template>

<style>
.button {
  @apply px-6 py-3 font-bold rounded-lg text-sm;
}

.button-lg {
  @apply px-6 py-4 font-bold rounded-lg text-sm;
}

.button-primary {
  @apply bg-purple-2 hover:bg-[#7C91F9] text-white;
}

.button-secondary {
  @apply bg-[#7C91F9] hover:bg-[#C75AF6] text-white;
}

.button-tertiary {
  @apply bg-dark-purple-gray hover:bg-[#656EA3] text-white;
}

.button-deletion {
  @apply bg-red hover:bg-red-lighter text-white;
}

.button-back {
  @apply hover:underline text-[#373F68];
}

</style>
