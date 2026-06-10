import type { FieldDefinition, ResourceDefinition } from './types'

const commonContentFields: FieldDefinition[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'slug', label: 'Slug', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' }
]

export const resourceDefinitions: ResourceDefinition[] = [
  {
    key: 'projects', label: 'Project', pluralLabel: 'Projects', icon: 'i-lucide-building-2', group: 'settings',
    description: 'Manage project settings, domains, locales, and Logto organization mapping.',
    basePath: '/api/admin/projects', detailPath: '/api/admin/projects/{id}', listOperation: 'list_projects', createOperation: 'create_project', updateOperation: 'update_project', methodForUpdate: 'PATCH',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'custom_domain', label: 'Custom domain', type: 'text' },
      { key: 'logto_org_id', label: 'Logto organization ID', type: 'text' },
      { key: 'default_locale', label: 'Default locale', type: 'text', placeholder: 'en' },
      { key: 'enabled', label: 'Enabled', type: 'boolean' }
    ],
    tableColumns: ['name', 'slug', 'custom_domain', 'logto_org_id', 'updated_at']
  },
  {
    key: 'products', label: 'Product', pluralLabel: 'Products', icon: 'i-lucide-package', group: 'catalog',
    description: 'Create and curate catalog products exposed through storefront views.',
    basePath: '/api/admin/products', detailPath: '/api/admin/products/{id}', listOperation: 'list_products', createOperation: 'create_product', updateOperation: 'update_product', deleteOperation: 'delete_product', methodForUpdate: 'PUT',
    fields: [
      ...commonContentFields,
      { key: 'sku', label: 'SKU', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Draft', value: 'draft' }, { label: 'Active', value: 'active' }, { label: 'Archived', value: 'archived' }] },
      { key: 'featured', label: 'Featured', type: 'boolean' },
      { key: 'metadata', label: 'Metadata', type: 'json', helper: 'Optional JSON object sent as-is to the API.' }
    ],
    tableColumns: ['name', 'slug', 'sku', 'status', 'featured', 'updated_at']
  },
  {
    key: 'product-variants', label: 'Product Variant', pluralLabel: 'Product Variants', icon: 'i-lucide-boxes', group: 'catalog',
    description: 'Manage variants, inventory-facing SKUs, prices, and sellability for a product.',
    basePath: '/api/admin/products/{product_id}/variants', detailPath: '/api/admin/products/{product_id}/variants/{id}', listOperation: 'list_product_variants', createOperation: 'create_product_variant', updateOperation: 'update_product_variant', deleteOperation: 'delete_product_variant', methodForUpdate: 'PUT',
    parentParams: [{ key: 'product_id', label: 'Product ID', type: 'text', required: true }],
    fields: [
      { key: 'sku', label: 'SKU', type: 'text', required: true },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'price', label: 'Price (minor units)', type: 'number' },
      { key: 'currency', label: 'Currency', type: 'text', placeholder: 'USD' },
      { key: 'stock_quantity', label: 'Stock quantity', type: 'number' },
      { key: 'is_default', label: 'Default variant', type: 'boolean' },
      { key: 'sellable', label: 'Sellable', type: 'boolean' },
      { key: 'options', label: 'Options', type: 'json' }
    ],
    tableColumns: ['sku', 'name', 'price', 'currency', 'stock_quantity', 'is_default']
  },
  {
    key: 'collections', label: 'Collection', pluralLabel: 'Collections', icon: 'i-lucide-panels-top-left', group: 'content',
    description: 'Merchandising collections and product groupings managed for the CMS.',
    basePath: '/api/admin/collections', detailPath: '/api/admin/collections/{id}', listOperation: 'list_collections', createOperation: 'create_collection', updateOperation: 'update_collection', deleteOperation: 'delete_collection', methodForUpdate: 'PUT',
    fields: [
      ...commonContentFields,
      { key: 'active', label: 'Active', type: 'boolean' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'metadata', label: 'Metadata', type: 'json' }
    ],
    tableColumns: ['name', 'slug', 'active', 'sort_order', 'updated_at']
  },
  {
    key: 'taxonomies', label: 'Taxonomy', pluralLabel: 'Taxonomies', icon: 'i-lucide-tags', group: 'content',
    description: 'Define categorization systems for products and content.',
    basePath: '/api/admin/taxonomies', detailPath: '/api/admin/taxonomies/{id}', listOperation: 'list_taxonomies', createOperation: 'create_taxonomy', updateOperation: 'update_taxonomy', deleteOperation: 'delete_taxonomy', methodForUpdate: 'PUT',
    fields: [...commonContentFields, { key: 'is_hierarchical', label: 'Hierarchical', type: 'boolean' }, { key: 'metadata', label: 'Metadata', type: 'json' }],
    tableColumns: ['name', 'slug', 'is_hierarchical', 'updated_at']
  },
  {
    key: 'taxonomy-terms', label: 'Taxonomy Term', pluralLabel: 'Taxonomy Terms', icon: 'i-lucide-list-tree', group: 'content',
    description: 'Create terms within a taxonomy and organize parent/child trees.',
    basePath: '/api/admin/taxonomies/{taxonomy_id}/terms', detailPath: '/api/admin/taxonomies/{taxonomy_id}/terms/{id}', listOperation: 'list_taxonomy_terms', createOperation: 'create_taxonomy_term', updateOperation: 'update_taxonomy_term', deleteOperation: 'delete_taxonomy_term', methodForUpdate: 'PUT',
    parentParams: [{ key: 'taxonomy_id', label: 'Taxonomy ID', type: 'text', required: true }],
    fields: [...commonContentFields, { key: 'parent_id', label: 'Parent term ID', type: 'text' }, { key: 'sort_order', label: 'Sort order', type: 'number' }, { key: 'metadata', label: 'Metadata', type: 'json' }],
    tableColumns: ['name', 'slug', 'parent_id', 'sort_order', 'updated_at']
  },
  {
    key: 'assets', label: 'Asset', pluralLabel: 'Assets', icon: 'i-lucide-image', group: 'content',
    description: 'Media assets and CMS files used by products, taxonomies, and terms.',
    basePath: '/api/admin/assets', detailPath: '/api/admin/assets/{id}', listOperation: 'list_assets', createOperation: 'create_asset', updateOperation: 'update_asset', deleteOperation: 'delete_asset', methodForUpdate: 'PUT',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'alt_text', label: 'Alt text', type: 'text' },
      { key: 'url', label: 'URL', type: 'text' },
      { key: 'mime_type', label: 'MIME type', type: 'text' },
      { key: 'metadata', label: 'Metadata', type: 'json' }
    ],
    tableColumns: ['name', 'url', 'mime_type', 'updated_at']
  },

  {
    key: 'taxonomy-assets', label: 'Taxonomy Asset', pluralLabel: 'Taxonomy Assets', icon: 'i-lucide-paperclip', group: 'content',
    description: 'Attach and order media assets on a taxonomy.',
    basePath: '/api/admin/taxonomies/{taxonomy_id}/assets', detailPath: '/api/admin/taxonomies/{taxonomy_id}/assets/{asset_id}', listOperation: 'list_taxonomy_assets', createOperation: 'attach_taxonomy_asset', updateOperation: 'update_taxonomy_asset', deleteOperation: 'detach_taxonomy_asset', methodForUpdate: 'PUT', idParam: 'asset_id',
    parentParams: [{ key: 'taxonomy_id', label: 'Taxonomy ID', type: 'text', required: true }],
    fields: [{ key: 'asset_id', label: 'Asset ID', type: 'text', required: true }, { key: 'role', label: 'Role', type: 'text' }, { key: 'sort_order', label: 'Sort order', type: 'number' }, { key: 'metadata', label: 'Metadata', type: 'json' }],
    tableColumns: ['asset_id', 'role', 'sort_order', 'updated_at']
  },
  {
    key: 'term-assets', label: 'Term Asset', pluralLabel: 'Term Assets', icon: 'i-lucide-image-plus', group: 'content',
    description: 'Attach and order media assets on taxonomy terms.',
    basePath: '/api/admin/taxonomies/{taxonomy_id}/terms/{term_id}/assets', detailPath: '/api/admin/taxonomies/{taxonomy_id}/terms/{term_id}/assets/{asset_id}', listOperation: 'list_term_assets', createOperation: 'attach_term_asset', updateOperation: 'update_term_asset', deleteOperation: 'detach_term_asset', methodForUpdate: 'PUT', idParam: 'asset_id',
    parentParams: [{ key: 'taxonomy_id', label: 'Taxonomy ID', type: 'text', required: true }, { key: 'term_id', label: 'Term ID', type: 'text', required: true }],
    fields: [{ key: 'asset_id', label: 'Asset ID', type: 'text', required: true }, { key: 'role', label: 'Role', type: 'text' }, { key: 'sort_order', label: 'Sort order', type: 'number' }, { key: 'metadata', label: 'Metadata', type: 'json' }],
    tableColumns: ['asset_id', 'role', 'sort_order', 'updated_at']
  },
  {
    key: 'term-products', label: 'Term Product', pluralLabel: 'Products By Term', icon: 'i-lucide-tag', group: 'catalog',
    description: 'Read products linked to a taxonomy term through the admin API.',
    basePath: '/api/admin/taxonomy-terms/{term_id}/products', listOperation: 'list_products_by_term', readOnly: true,
    parentParams: [{ key: 'term_id', label: 'Taxonomy Term ID', type: 'text', required: true }],
    fields: [],
    tableColumns: ['name', 'slug', 'sku', 'status', 'updated_at']
  },
  {
    key: 'orders', label: 'Order', pluralLabel: 'Orders', icon: 'i-lucide-receipt-text', group: 'commerce',
    description: 'Review orders created by checkout and update fulfillment state.',
    basePath: '/api/admin/orders', detailPath: '/api/admin/orders/{id}', listOperation: 'list_orders', updateOperation: 'update_order', methodForUpdate: 'PATCH',
    fields: [
      { key: 'status', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'pending' }, { label: 'Paid', value: 'paid' }, { label: 'Fulfilled', value: 'fulfilled' }, { label: 'Cancelled', value: 'cancelled' }] },
      { key: 'fulfillment_status', label: 'Fulfillment status', type: 'text' },
      { key: 'notes', label: 'Notes', type: 'textarea' }
    ],
    tableColumns: ['id', 'status', 'total', 'currency', 'customer_email', 'created_at'], readOnly: false
  },
  {
    key: 'storefront-origins', label: 'Storefront Origin', pluralLabel: 'Storefront Origins', icon: 'i-lucide-globe-lock', group: 'settings',
    description: 'Configure trusted storefront origins for browser access and project isolation.',
    basePath: '/api/admin/storefront-origins', detailPath: '/api/admin/storefront-origins/{origin_id}', listOperation: 'list_storefront_origins', createOperation: 'create_storefront_origin', updateOperation: 'update_storefront_origin', deleteOperation: 'delete_storefront_origin', methodForUpdate: 'PATCH', idParam: 'origin_id',
    fields: [{ key: 'origin', label: 'Origin', type: 'text', required: true, placeholder: 'https://shop.example.com' }, { key: 'enabled', label: 'Enabled', type: 'boolean' }],
    tableColumns: ['origin', 'enabled', 'created_at']
  }
]

export const getResourceDefinition = (key: string) => resourceDefinitions.find(resource => resource.key === key)
export const resourcesByGroup = (group: ResourceDefinition['group']) => resourceDefinitions.filter(resource => resource.group === group)
