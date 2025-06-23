# media_challenge / hors-zone

Projet réalisé avec [Next.js](https://nextjs.org) et initialisé via [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Démarrage rapide

Installe les dépendances :
```bash
npm install
```

Lance le serveur de développement :
```bash
npm run dev
```
Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Structure .env

- env.local

```js

NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
NEXT_PUBLIC_LOCATION_API_KEY=""
NEXT_PUBLIC_GOOGLE_MAP_LOCATION_API_KEY=""
NEXT_PUBLIC_WEBSOCKET_LINK=""

```

## Structure du projet

- `app/` : Pages et composants Next.js
- `__tests__/` : Tests unitaires (Jest)
- `public/` : Fichiers statiques
- `README.md` : Ce fichier

## Lancer les tests

Pour exécuter tous les tests unitaires :
```bash
npm test
```
ou
```bash
npx jest
```

## Technologies utilisées


### Supabase (supabase pour next js)

```bash
npx create-next-app@latest with-supabase
```

doc : https://supabase.com/docs/guides/getting-started/quickstarts/nextjs



### test avec jest

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

doc : https://nextjs.org/docs/app/guides/testing/jest

### loader

```bash 
npm install react-loader-spinner
```

components : https://mhnpd.github.io/react-loader-spinner/docs/category/components/

doc next : https://nextjs.org/docs/app/api-reference/file-conventions/loading


### message erreurs 

```bash 
npm install --save react-toastify
```

doc : https://www.npmjs.com/package/react-toastify

### clsx 

```bash 
npm install clsx

```

doc : https://www.npmjs.com/package/clsx



### geo localisation
localisation convertir une addresse en coordonnées gps


docs : https://opencagedata.com/api#bestpractices


### google map 
carte google map 
```bash
npm i @react-google-maps/api
```

doc : https://www.npmjs.com/package/@react-google-maps/api

### websocket ws

```bash
npm i next-ws
```
doc : https://www.npmjs.com/package/next-ws

### react icons 
```bash
npm install react-icons --save
```

doc : https://www.npmjs.com/package/react-icons


## Scripts utiles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Build l’application pour la production
- `npm start` : Lance l’application en mode production
- `npm test` : Lance les tests unitaires

## Déploiement

Le déploiement sur [Vercel](https://hors-zone.vercel.app).

## Nomenclature commit et branch

1. branche (`git checkout -b nom-feature`)
3. Commit ajout (`git commit -am 'feat : add Ajoute nom-feature'`)
3. Commit correction de bug(`git commit -am 'fix : add Ajoute nom-feature'`)
4. merge (`merge : ma-feature`)


---

© 2025 - Projet media_challenge / hors-zone






<!-- 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# media_challenge
# hors-zone
# hors-zone -->
