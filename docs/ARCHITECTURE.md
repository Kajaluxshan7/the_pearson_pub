# Public Web (Nuxt 3) Architecture

This document defines a maintainable feature-first structure for the Nuxt app and provides PowerShell steps to reorganize.

## Goals

- Feature slices (events, menu, stories, etc.) that encapsulate components/composables/services
- Clear separation of base UI, generic UI, and layout components
- Typed API layer and shared utilities in predictable places

## Target Folder Structure

```
.
  app.vue
  nuxt.config.ts
  components/
    base/              # stateless atoms: BaseButton, BaseModal
    ui/                # styled molecules: Card, Carousel
    layout/            # header/footer/nav
    feedback/          # toasts, spinners, loaders
  features/
    events/
      components/
      composables/
      pages/           # feature-specific view assemblies (optional)
      services/
      types/
    menu/
    stories/
    auth/              # if any
  pages/               # thin route shells that delegate to features
    index.vue
    events.vue         # imports components from features/events
  server/
    api/
    middleware/
  composables/         # cross-feature generic hooks (SEO, connectivity)
  lib/                 # pure helpers (e.g., timezone, formatting)
  services/
    http.ts
    api/
      events.api.ts
      menu.api.ts
  types/
    dto/
    view/
  plugins/
  assets/
    css/
    styles/
  public/
  tests/
    unit/
    e2e/
```

## Mapping (Current → Target)

- `components/ConnectivityIndicator.vue` → `components/feedback/ConnectivityIndicator.vue`
- `components/StaticFallback.vue` → `components/feedback/StaticFallback.vue`
- `components/StoryModal.vue` → `features/stories/components/StoryModal.vue`
- `components/WeeklyEntertainment.vue` → `features/events/components/WeeklyEntertainment.vue`
- `components/events/*` → `features/events/components/*`
- `components/home/*` → either `features/home/*` or split into `components/layout|ui`
- `components/ui/*` → `components/ui/*` (keep), move atoms to `components/base/` as needed
- `composables/useEvents.ts` → `features/events/composables/useEvents.ts`
- `composables/usePublicApi.ts` → `services/api` access through `services/http.ts` (or keep as generic composable)
- `utils/timezone.ts` → `lib/timezone.ts`
- `types/events*.ts` → `features/events/types/*` (DTOs can live under `types/dto` if shared)

Pages remain but should delegate to feature components to reduce page complexity.

## API Layer

Place a thin HTTP client in `services/http.ts` and per-feature API clients in `services/api/*.api.ts`. Keep types in `types/dto` and map to view models in `types/view`.

## Migration Steps (PowerShell)

Run from `the_pearson_pub/` project root.

```powershell
# 1) Create new directories
mkdir "components\base" -Force
mkdir "components\ui" -Force
mkdir "components\layout" -Force
mkdir "components\feedback" -Force
mkdir "features" -Force
mkdir "features\events\components" -Force
mkdir "features\events\composables" -Force
mkdir "features\stories\components" -Force
mkdir "lib" -Force
mkdir "services\api" -Force

# 2) Move selected components (adjust if files exist)
if (Test-Path "components\ConnectivityIndicator.vue") { Move-Item "components\ConnectivityIndicator.vue" "components\feedback\ConnectivityIndicator.vue" -Force }
if (Test-Path "components\StaticFallback.vue") { Move-Item "components\StaticFallback.vue" "components\feedback\StaticFallback.vue" -Force }
if (Test-Path "components\StoryModal.vue") { Move-Item "components\StoryModal.vue" "features\stories\components\StoryModal.vue" -Force }
if (Test-Path "components\WeeklyEntertainment.vue") { Move-Item "components\WeeklyEntertainment.vue" "features\events\components\WeeklyEntertainment.vue" -Force }
if (Test-Path "components\events") { Move-Item "components\events" "features\events\components" -Force }

# 3) Move composables & utils
if (Test-Path "composables\useEvents.ts") { Move-Item "composables\useEvents.ts" "features\events\composables\useEvents.ts" -Force }
if (Test-Path "utils\timezone.ts") { Move-Item "utils\timezone.ts" "lib\timezone.ts" -Force }
```

## After the Move

- Update imports in pages and components to new paths.
- Keep generic cross-feature composables in `composables/` (e.g., `useSEO`, `useConnectivity`).
- Consider extracting shared DTOs under `types/dto` if reused across features.

## Notes

Start by moving one feature (e.g., `events`), run the app, and update imports before proceeding with the rest.
