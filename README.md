# Aevoria

Monorepo pour le projet Aevoria.

## Structure

```
aevoria/
├── apps/
│   ├── aevoria-app/      # Application principale
│   └── aevoria-admin/    # Panneau d'administration
├── packages/
│   └── aev-ui/           # Bibliothèque de composants UI
└── back/                 # Backend API
```

## Installation

```bash
npm install
```

## Scripts disponibles

### Développement

- `npm run dev:app` - Lancer l'application principale
- `npm run dev:admin` - Lancer le panneau d'administration
- `npm run dev:back` - Lancer le backend en mode développement
- `npm run dev:ui` - Builder la librairie UI en mode watch

### Build

- `npm run build:app` - Builder l'application principale
- `npm run build:admin` - Builder le panneau d'administration
- `npm run build:ui` - Builder la librairie UI
- `npm run build:back` - Builder le backend
- `npm run build` - Builder tous les projets

### Lint

- `npm run lint` - Linter tous les projets

## Utilisation de @aevoria/ui

Dans vos apps, vous pouvez importer les composants comme ceci :

```tsx
import { AEVButton } from '@aevoria/ui'

function MyComponent() {
  return <AEVButton variant="primary">Cliquez-moi</AEVButton>
}
```

**Important** : Avant d'utiliser `@aevoria/ui` dans les apps, vous devez d'abord builder le package :

```bash
npm run build:ui
```

Ou en mode watch pour le développement :

```bash
npm run dev:ui
```

