<script setup lang="ts">
import {reactive} from "vue";
import AvatarComponent from "@client/components/AvatarComponent.vue";
import TextAreaComponent from "@client/components/TextAreaComponent.vue";
import type {CommentType, ReplyFormType} from "@client/types/commentTypes";
import type {ValidationError} from "@client/types/validationError";
import CommentService from "@client/services/CommentService";

const props = defineProps<{
  comment: CommentType
}>()

const state = reactive<{
  form: ReplyFormType;
  replied_username?: string;
  toggleReplyForm: boolean;
  validationError?: ValidationError;
}>({
  form: {
    reply: '',
    comment_id: undefined,
  },
  replied_username: undefined,
  toggleReplyForm: false,
  validationError: undefined
})

const emits = defineEmits(['refreshComments'])

const submitReply = async () => {
  try {
    state.toggleReplyForm = false
    state.form.reply = `${state.replied_username} ${state.form.reply}`

    await CommentService.submitReply(props.comment.id, state.form)

    emits('refreshComments')
  } catch (e: any) {
    if (e.response && e.response.status === 422) {
      state.validationError = e.response.data.data;
    }
  }
}

</script>

<template>
  <div class="border-b">
    <div v-if="comment" class="flex flex-col w-full space-y-4 py-8">
      <div class="flex justify-between">
        <AvatarComponent
            :user="comment.user"
        />
        <span
            class="text-purple text-sm font-semibold hover:underline cursor-pointer"
            @click="state.toggleReplyForm = !state.toggleReplyForm; state.replied_username = comment.user.username"
        >
          Reply
        </span>
      </div>
      <p class="text-sm md:text-base text-grayish md:pl-14">
        {{ comment.text }}
      </p>
    </div>
    <div class="ml-4 border-l mb-8 pl-4 space-y-8">
      <div
          v-for="reply in comment.replies"
          :key="reply.id"
      >
        <div class="flex justify-between mb-4">
          <AvatarComponent
              :user="reply.user"
          />
          <span
              class="text-purple text-sm font-semibold hover:underline cursor-pointer"
              @click="state.toggleReplyForm = !state.toggleReplyForm; state.replied_username = reply.user.username"
          >
            Reply
          </span>
        </div>
        <p class="text-sm md:text-base text-grayish md:pl-14">
        <span class="text-purple-2 font-bold">
          {{ reply.reply.split(' ')[0] }}
        </span>
          {{ reply.reply.split(' ').splice(1).join(' ') }}
        </p>
      </div>
    </div>
    <form
        v-if="state.toggleReplyForm"
        class="flex items-center space-x-4"
        @submit.prevent="submitReply"
    >
      <div class="flex-1">
        <span class="text-sm text-grayish">
          replying to {{ state.replied_username }}
        </span>
        <TextAreaComponent v-model="state.form.reply" :validation-error="state.validationError"/>
      </div>
        <button
            type="submit"
            class="button button-secondary self-start mt-6"
        >
          Post Reply
        </button>
    </form>
  </div>
</template>
