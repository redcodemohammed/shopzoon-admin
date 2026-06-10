<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue'

const router = useRouter()

if (import.meta.client) {
  useHandleSignInCallback(() => router.replace('/'))
}
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center">
    <UCard class="max-w-sm text-center">
      <UIcon name="i-lucide-loader-circle" class="mx-auto mb-4 size-8 animate-spin" />
      <h2 class="font-semibold">Completing sign in</h2>
      <p class="mt-2 text-sm text-gray-500">Logto is validating your session and returning you to the dashboard.</p>
    </UCard>
  </div>
</template>
