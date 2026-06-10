<script setup lang="ts">
definePageMeta({ layout: 'default' })
const auth = useAuth()
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center">
    <UAvatar icon="i-lucide-shield-check" size="3xl" class="mb-6" />
    <h2 class="text-2xl font-semibold">Sign in to Shopzoon Admin</h2>
    <p class="mt-2 text-sm text-gray-500">Authentication is delegated to Logto. Configure the public Logto environment variables before production use.</p>
    <UAlert v-if="!auth.isConfigured.value" class="mt-6 text-left" color="warning" icon="i-lucide-triangle-alert" title="Logto is not configured" description="Set NUXT_PUBLIC_LOGTO_ENDPOINT and NUXT_PUBLIC_LOGTO_APP_ID in your deployment environment." />
    <UButton class="mt-6" size="lg" icon="i-lucide-log-in" :disabled="!auth.isConfigured.value" @click="auth.signIn">Continue with Logto</UButton>
  </div>
</template>
