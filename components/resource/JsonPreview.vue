<script setup lang="ts">
defineProps<{ value: unknown }>()
</script>

<template>
  <pre class="max-h-80 overflow-auto rounded-lg bg-gray-950 p-4 text-xs text-gray-100">{{ JSON.stringify(value, null, 2) }}</pre>
</template>
