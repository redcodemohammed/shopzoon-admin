<script setup lang="ts">
import { resourceDefinitions, resourcesByGroup } from '~/core/domain/resources'

const groups = [
  { key: 'catalog', label: 'Catalog', description: 'Products, variants, inventory-facing catalog data.' },
  { key: 'content', label: 'Content', description: 'Taxonomies, terms, collections, and assets.' },
  { key: 'commerce', label: 'Commerce', description: 'Orders and checkout operations.' },
  { key: 'settings', label: 'Settings', description: 'Projects and storefront origins.' }
] as const
</script>

<template>
  <div class="space-y-8">
    <AdminPageHeader title="Dashboard" description="A maintainable Nuxt UI dashboard for AstraIQ CMS admin endpoints. Storefront endpoints are intentionally omitted." icon="i-lucide-layout-dashboard" />

    <div class="grid gap-4 md:grid-cols-4">
      <UCard v-for="group in groups" :key="group.key">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ group.label }}</p>
            <p class="text-3xl font-semibold">{{ resourcesByGroup(group.key).length }}</p>
          </div>
          <UAvatar :icon="group.key === 'catalog' ? 'i-lucide-package' : group.key === 'content' ? 'i-lucide-files' : group.key === 'commerce' ? 'i-lucide-shopping-cart' : 'i-lucide-settings'" />
        </div>
      </UCard>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <UCard v-for="group in groups" :key="group.key">
        <template #header>
          <div>
            <h3 class="font-semibold">{{ group.label }}</h3>
            <p class="text-sm text-gray-500">{{ group.description }}</p>
          </div>
        </template>
        <div class="grid gap-3 sm:grid-cols-2">
          <NuxtLink v-for="resource in resourcesByGroup(group.key)" :key="resource.key" :to="`/${resource.group}/${resource.key}`" class="rounded-lg border border-gray-200 p-4 transition hover:border-primary hover:bg-primary/5 dark:border-gray-800">
            <div class="flex items-center gap-3">
              <UAvatar :icon="resource.icon" size="sm" />
              <div>
                <p class="font-medium">{{ resource.pluralLabel }}</p>
                <p class="text-xs text-gray-500">{{ resource.listOperation }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header><h3 class="font-semibold">Implemented admin surface</h3></template>
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="resource in resourceDefinitions" :key="resource.key" color="neutral" variant="subtle">{{ resource.pluralLabel }}</UBadge>
      </div>
    </UCard>
  </div>
</template>
