<script setup lang="ts">
import type { CmsEntity, ResourceDefinition } from '~/core/domain/types'

const props = defineProps<{ resource: ResourceDefinition }>()
const toast = useToast()
const gateway = useResourceGateway()

const parentParams = reactive<Record<string, string>>({})
const query = reactive({ q: '', page: 1, per_page: 25 })
const rows = ref<CmsEntity[]>([])
const selected = ref<CmsEntity | null>(null)
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref<string | null>(null)
const showCreate = ref(false)

const parentReady = computed(() => (props.resource.parentParams || []).every(param => parentParams[param.key]))
const idKey = computed(() => props.resource.idParam || 'id')
const isAuthConfigured = computed(() => Boolean(useRuntimeConfig().public.logtoEndpoint))
const columns = computed(() => [
  ...props.resource.tableColumns.map(key => ({ accessorKey: key, header: key.replaceAll('_', ' ') })),
  { id: 'actions' }
])

const context = computed(() => ({ params: { ...parentParams }, query: { q: query.q, page: query.page, per_page: query.per_page } }))

const load = async () => {
  if (!parentReady.value) return
  isLoading.value = true
  error.value = null
  try {
    rows.value = await gateway.list(props.resource, context.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to load resource'
  } finally {
    isLoading.value = false
  }
}

const create = async (payload: Record<string, unknown>) => {
  isSaving.value = true
  try {
    await gateway.create(props.resource, payload, context.value)
    toast.add({ title: `${props.resource.label} created`, color: 'success' })
    showCreate.value = false
    await load()
  } catch (err) {
    toast.add({ title: 'Create failed', description: err instanceof Error ? err.message : String(err), color: 'error' })
  } finally { isSaving.value = false }
}

const update = async (payload: Record<string, unknown>) => {
  if (!selected.value?.[idKey.value]) return
  isSaving.value = true
  try {
    await gateway.update(props.resource, String(selected.value[idKey.value]), payload, context.value)
    toast.add({ title: `${props.resource.label} updated`, color: 'success' })
    selected.value = null
    await load()
  } catch (err) {
    toast.add({ title: 'Update failed', description: err instanceof Error ? err.message : String(err), color: 'error' })
  } finally { isSaving.value = false }
}

const remove = async (row: CmsEntity) => {
  const id = row[idKey.value]
  if (!id || !confirm(`Delete this ${props.resource.label.toLowerCase()}?`)) return
  try {
    await gateway.remove(props.resource, String(id), context.value)
    toast.add({ title: `${props.resource.label} deleted`, color: 'success' })
    await load()
  } catch (err) {
    toast.add({ title: 'Delete failed', description: err instanceof Error ? err.message : String(err), color: 'error' })
  }
}

watch(() => props.resource.key, () => {
  rows.value = []
  selected.value = null
  showCreate.value = false
  Object.keys(parentParams).forEach(key => delete parentParams[key])
  load()
}, { immediate: true })
</script>

<template>
  <div class="space-y-6">
    <AdminPageHeader :title="resource.pluralLabel" :description="resource.description" :icon="resource.icon">
      <template #actions>
        <div class="flex gap-2">
          <UButton icon="i-lucide-refresh-cw" color="neutral" variant="outline" :loading="isLoading" @click="load">Refresh</UButton>
          <UButton v-if="resource.createOperation && !resource.readOnly" icon="i-lucide-plus" :disabled="!parentReady" @click="showCreate = true">New {{ resource.label }}</UButton>
        </div>
      </template>
    </AdminPageHeader>

    <UAlert v-if="!isAuthConfigured" icon="i-lucide-info" color="warning" variant="subtle" title="Logto is not configured" description="Set NUXT_PUBLIC_LOGTO_ENDPOINT and NUXT_PUBLIC_LOGTO_APP_ID before connecting to protected API endpoints." />

    <UCard v-if="resource.parentParams?.length">
      <template #header><h3 class="font-semibold">Parent context</h3></template>
      <div class="grid gap-4 md:grid-cols-2">
        <UFormField v-for="field in resource.parentParams" :key="field.key" :label="field.label" :required="field.required">
          <UInput v-model="parentParams[field.key]" :placeholder="field.placeholder || field.label" class="w-full" />
        </UFormField>
      </div>
      <template #footer>
        <UButton icon="i-lucide-search" :disabled="!parentReady" @click="load">Load {{ resource.pluralLabel }}</UButton>
      </template>
    </UCard>

    <UCard>
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UInput v-model="query.q" icon="i-lucide-search" placeholder="Search API results" class="sm:max-w-xs" @keyup.enter="load" />
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>{{ rows.length }} records</span>
          <USelect v-model="query.per_page" :items="[10, 25, 50, 100]" class="w-24" @change="load" />
        </div>
      </div>

      <UAlert v-if="error" color="error" icon="i-lucide-triangle-alert" title="Request failed" :description="error" class="mb-4" />
      <UTable :data="rows" :columns="columns" :loading="isLoading" class="w-full">
        <template v-for="column in resource.tableColumns" :key="column" #[`${column}-cell`]="{ row }">
          <span class="line-clamp-2 max-w-xs text-sm">{{ row.original[column] ?? '—' }}</span>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-1">
            <UButton icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" @click="selected = row.original" />
            <UButton v-if="resource.deleteOperation" icon="i-lucide-trash-2" size="xs" color="error" variant="ghost" @click="remove(row.original)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <UModal v-model:open="showCreate" :title="`New ${resource.label}`">
      <template #body>
        <ResourceForm :fields="resource.fields" :loading="isSaving" @submit="create" />
      </template>
    </UModal>

    <UModal :open="Boolean(selected)" :title="selected ? `${resource.label}: ${selected.name || selected.slug || selected.id}` : resource.label" @update:open="value => { if (!value) selected = null }">
      <template #body>
        <UTabs :items="[{ label: 'Edit', slot: 'edit' }, { label: 'JSON', slot: 'json' }]" class="w-full">
          <template #edit>
            <ResourceForm v-if="selected" :fields="resource.fields" :initial-value="selected" :loading="isSaving" @submit="update" />
          </template>
          <template #json>
            <ResourceJsonPreview :value="selected" />
          </template>
        </UTabs>
      </template>
    </UModal>
  </div>
</template>
