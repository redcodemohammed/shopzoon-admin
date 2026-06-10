# Shopzoon Admin

Nuxt + Nuxt UI admin dashboard for the AstraIQ CMS API (`https://api.cms.astraiq.net/openapi.json`).

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

See `.env.example` for Logto and API configuration. Storefront API endpoints are intentionally excluded from the admin surface.

## Architecture

The application follows Clean Architecture boundaries:

- `core/domain`: entities, value objects, and resource metadata.
- `core/application`: use cases and repository ports.
- `core/infrastructure`: HTTP clients and concrete repositories.
- `components`, `pages`, `layouts`, `middleware`: Nuxt presentation layer.
