<script setup lang="ts">
import type { CmsEntity, FieldDefinition } from '~/core/domain/types'

const props = defineProps<{ fields: FieldDefinition[], initialValue?: CmsEntity, loading?: boolean }>()
const emit = defineEmits<{ submit: [Record<string, unknown>] }>()

const state = reactive<Record<string, unknown>>({})

watchEffect(() => {
  props.fields.forEach((field) => {
    const value = props.initialValue?.[field.key]
    if (field.type === 'json') state[field.key] = value ? JSON.stringify(value, null, 2) : ''
    else if (state[field.key] === undefined) state[field.key] = value ?? (field.type === 'boolean' ? false : '')
  })
})

const submit = () => {
  const payload: Record<string, unknown> = {}
  props.fields.forEach((field) => {
    const value = state[field.key]
    if (value === '' || value === undefined) return
    if (field.type === 'number') payload[field.key] = Number(value)
    else if (field.type === 'json') payload[field.key] = typeof value === 'string' ? JSON.parse(value || '{}') : value
    else payload[field.key] = value
  })
  emit('submit', payload)
}
</script>

<template>
  <UForm :state="state" class="space-y-4" @submit="submit">
    <UFormField v-for="field in fields" :key="field.key" :label="field.label" :name="field.key" :required="field.required" :help="field.helper">
      <UTextarea v-if="field.type === 'textarea' || field.type === 'json'" v-model="state[field.key]" :placeholder="field.placeholder" :rows="field.type === 'json' ? 8 : 4" class="w-full" />
      <UCheckbox v-else-if="field.type === 'boolean'" v-model="state[field.key]" :label="field.label" />
      <USelect v-else-if="field.type === 'select'" v-model="state[field.key]" :items="field.options || []" class="w-full" />
      <UInput v-else v-model="state[field.key]" :type="field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'" :placeholder="field.placeholder" class="w-full" />
    </UFormField>
    <div class="flex justify-end gap-2">
      <slot name="secondary" />
      <UButton type="submit" :loading="loading" icon="i-lucide-save">Save</UButton>
    </div>
  </UForm>
</template>
