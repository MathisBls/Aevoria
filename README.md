# Aevoria

Monorepo pour le projet Aevoria - Plateforme de jeux vidéo.

## 📁 Structure

```
aevoria/
├── apps/
│   ├── aevoria-app/      # Application principale (React + TypeScript + Vite)
│   └── aevoria-admin/    # Panneau d'administration (React + TypeScript + Vite + Tailwind)
├── packages/
│   └── aev-ui/           # Bibliothèque de composants UI partagée (React + TypeScript + SCSS)
└── back/                 # Backend API (TypeScript + Node.js)
```

## 🚀 Installation

```bash
npm install
```

## 📜 Scripts disponibles

### Développement

- `npm run dev:app` - Lancer l'application principale (http://localhost:5173)
- `npm run dev:admin` - Lancer le panneau d'administration (http://localhost:5174)
- `npm run dev:back` - Lancer le backend en mode développement
- `npm run dev:ui` - Builder la librairie UI en mode watch (pour le développement)

### Build

- `npm run build` - Builder le package UI (`@aevoria/ui`)
- `npm run build:app` - Builder l'application principale
- `npm run build:admin` - Builder le panneau d'administration
- `npm run build:back` - Builder le backend

**Note** : Le script `build` à la racine build uniquement le package UI. Pour builder les apps, utilisez les scripts individuels.

### Lint

- `npm run lint` - Linter tous les projets (TypeScript/ESLint)
- `npm run lint:app` - Linter l'app avec auto-fix
- `npm run lint:admin` - Linter l'admin avec auto-fix
- `npm run lint:back` - Linter le backend
- `npm run lint:scss:app` - Linter les fichiers SCSS de l'app
- `npm run lint:scss:admin` - Linter les fichiers SCSS de l'admin
- `npm run lint:scss:all` - Linter tous les fichiers SCSS

## 🎨 Utilisation de @aevoria/ui

### ⚠️ IMPORTANT : Build obligatoire

**Avant de lancer les apps**, vous devez **OBLIGATOIREMENT** builder le package UI, sinon vous aurez des erreurs :

```bash
npm run build
```

Cette commande est **requise** avant chaque utilisation des apps qui importent `@aevoria/ui`.

### Import des composants

Dans vos apps (`aevoria-app` ou `aevoria-admin`), vous pouvez importer les composants comme ceci :

```tsx
import { AEVButton } from '@aevoria/ui'

function MyComponent() {
  return (
    <AEVButton variant="primary" size="md">
      Cliquez-moi
    </AEVButton>
  )
}
```

### Workflow de développement

1. **Première fois ou après modification du package UI** :
   ```bash
   npm run build
   ```

2. **En développement continu** (recompile automatiquement) :
   ```bash
   npm run dev:ui
   ```

3. **Puis lancer l'app** :
   ```bash
   npm run dev:app
   # ou
   npm run dev:admin
   ```

### Structure des composants

Les composants sont organisés dans `packages/aev-ui/src/AEV/` :

```
AEV/
└── AEV.Button/
    ├── Button.tsx      # Composant React
    └── Button.scss     # Styles SCSS
```

Tous les composants sont exportés depuis `packages/aev-ui/src/index.ts`.

## 🎨 Styles et Design System

### Variables SCSS

Le projet utilise des variables SCSS (pas de variables CSS `:root`). Les variables sont définies dans :

- `packages/aev-ui/src/global.scss` - Variables pour la librairie UI
- `apps/aevoria-app/src/global.scss` - Variables pour l'app principale
- `apps/aevoria-admin/src/global.scss` - Variables pour l'admin

### Couleurs

- **Bleu principal** : `$blue: #0D6EFD`
- **Bleu hover** : `$blue-hover: #0b5ed7`
- **Fond dark** : `$background: #0f0f1a`
- **Fond light** : `$background-light: #1a1a2e`
- **Couleurs de statut** : `$success`, `$warning`, `$error`, `$info`

### Polices

- **Par défaut** : Montserrat
- **Alternative** : Instrument Sans (classe `.instrument-sans`)

### Fonction rem-calc()

Utilisez `rem-calc()` pour convertir les pixels en rem :

```scss
.my-element {
  padding: rem-calc(20);
  font-size: rem-calc(16);
}
```

## 🔧 Configuration

### ESLint

- **Apps** : Configuration stricte TypeScript avec règles personnalisées
- **Back** : Configuration ESLint avec règles TypeScript
- **Package UI** : Configuration React + TypeScript

### Stylelint

- Règles custom pour forcer l'utilisation de `rem-calc()` au lieu de `px`
- Détection des couleurs hexadécimales (doivent utiliser des variables)
- Détection des font-family hardcodées

### TypeScript

- Mode strict activé
- Pas de `any` autorisé
- Types explicites requis pour les fonctions

## 📦 Workspaces

Le projet utilise npm workspaces pour gérer les dépendances :

- `apps/*` - Applications
- `packages/*` - Packages partagés
- `back` - Backend

## 🛠️ Technologies

- **Frontend** : React 19, TypeScript, Vite
- **Styling** : SCSS avec variables
- **UI Library** : Composants React réutilisables
- **Backend** : TypeScript, Node.js
- **Linting** : ESLint, Stylelint
- **Build** : Vite (frontend), TypeScript Compiler (backend)

## 📝 Notes importantes

- ⚠️ **OBLIGATOIRE** : Exécutez `npm run build` avant de lancer les apps, sinon vous aurez des erreurs d'import
- Les fichiers `node_modules` et `dist` sont ignorés par Git
- Le package UI doit être buildé avant d'être utilisé dans les apps
- En développement, utilisez `dev:ui` pour avoir le watch automatique
- Les styles utilisent uniquement des variables SCSS, pas de CSS variables
- L'ordre recommandé : `npm run build` → `npm run dev:app` (ou `dev:admin`)
