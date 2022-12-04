<script setup lang="ts">
import type {User} from "@client/types/userTypes";

defineProps<{
  user: User
}>()

</script>

<template>
<div class="flex space-x-4 text-sm">
  <img :src="user.avatar_url" alt="avatar" class="w-10 h-10 rounded-full">
  <div>
    <p class="font-bold ">
      {{ user.full_name }}
    </p>
    <p class="text-grayish">
      {{ user.username }}
    </p>
  </div>
</div>
</template>

