<script setup lang="ts">
defineProps<{ title: string, description?: string, icon?: string }>()
</script>

<template>
  <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div class="flex items-start gap-4">
      <UAvatar v-if="icon" :icon="icon" size="lg" />
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">{{ title }}</h2>
        <p v-if="description" class="mt-1 max-w-3xl text-sm text-gray-500">{{ description }}</p>
      </div>
    </div>
    <slot name="actions" />
  </div>
</template>
