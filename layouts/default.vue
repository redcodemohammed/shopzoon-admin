<script setup lang="ts">
import { resourcesByGroup } from '~/core/domain/resources'

const navigation = [
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/' },
  { label: 'Catalog', icon: 'i-lucide-package', children: resourcesByGroup('catalog').map(r => ({ label: r.pluralLabel, icon: r.icon, to: `/${r.group}/${r.key}` })) },
  { label: 'Content', icon: 'i-lucide-files', children: resourcesByGroup('content').map(r => ({ label: r.pluralLabel, icon: r.icon, to: `/${r.group}/${r.key}` })) },
  { label: 'Commerce', icon: 'i-lucide-shopping-cart', children: resourcesByGroup('commerce').map(r => ({ label: r.pluralLabel, icon: r.icon, to: `/${r.group}/${r.key}` })) },
  { label: 'Settings', icon: 'i-lucide-settings', children: resourcesByGroup('settings').map(r => ({ label: r.pluralLabel, icon: r.icon, to: `/${r.group}/${r.key}` })) }
]

const auth = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="flex min-h-screen">
      <aside class="hidden w-72 shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:block">
        <NuxtLink to="/" class="mb-6 flex items-center gap-3 px-2">
          <UAvatar icon="i-lucide-store" size="md" />
          <div>
            <p class="font-semibold">Shopzoon Admin</p>
            <p class="text-xs text-gray-500">AstraIQ CMS</p>
          </div>
        </NuxtLink>
        <UNavigationMenu orientation="vertical" :items="navigation" class="w-full" />
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <header class="sticky top-0 z-10 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
          <div class="flex items-center justify-between gap-4">
            <div class="lg:hidden">
              <UDropdownMenu :items="navigation">
                <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
              </UDropdownMenu>
            </div>
            <div class="min-w-0">
              <p class="text-sm text-gray-500">Admin console</p>
              <h1 class="truncate text-lg font-semibold">Operational CMS dashboard</h1>
            </div>
            <div class="flex items-center gap-2">
              <UColorModeButton />
              <UButton v-if="auth.isConfigured.value && auth.isAuthenticated.value" icon="i-lucide-log-out" variant="ghost" color="neutral" @click="auth.signOut">Sign out</UButton>
              <UButton v-else-if="auth.isConfigured.value" icon="i-lucide-log-in" to="/login">Sign in</UButton>
              <UBadge v-else color="warning" variant="subtle">Auth not configured</UBadge>
            </div>
          </div>
        </header>
        <main class="flex-1 p-4 sm:p-6 lg:p-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
