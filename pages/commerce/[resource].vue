<script setup lang="ts">
import { getResourceDefinition } from '~/core/domain/resources'

const route = useRoute()
const resource = computed(() => getResourceDefinition(String(route.params.resource)))

if (!resource.value) {
  throw createError({ statusCode: 404, statusMessage: 'Resource not implemented in admin dashboard' })
}
</script>

<template>
  <ResourceExplorer v-if="resource" :resource="resource" />
</template>
