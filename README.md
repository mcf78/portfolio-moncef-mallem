# Portfolio BTS SIO — Moncef MALLEM

Portfolio de présentation du BTS SIO option SLAM : épreuve E5 (réalisations et tableau de
synthèse) et épreuve E6 (situations professionnelles et réalisations).

## Développement

```bash
npm install
npm run dev
```

Le site est accessible sur http://localhost:5173 (ou le port affiché par Vite).

## Production

```bash
npm run build
npm run preview
```

Le build est généré dans `dist/`.

## Documents officiels

- **Tableau de synthèse E5** : `public/e5/tableau-synthese-e5.pdf`
  - source modifiable : `scripts/e5-docs/tableau-synthese-e5-mallem-moncef.xlsx`
- **Fiches E6** (SP1, SP2 et réalisations) : `public/e6/*.pdf`
  - générées par `node scripts/e6-docs/generate.mjs` (nécessite Google Chrome)

## Déploiement GitHub Pages

Le dépôt est déjà configuré :

- workflow : `.github/workflows/deploy.yml` (build + publication à chaque push sur `main`) ;
- configuration Vite : `base: './'` pour fonctionner quel que soit le nom du dépôt ;
- URL : **https://mcf78.github.io/portfolio-moncef-mallem/**

### Mettre à jour le site

```bash
git add -A
git commit -m "Mise à jour du portfolio"
git push origin main
```

GitHub Actions construit et publie automatiquement le site. Le résultat est visible dans
l'onglet **Actions** du dépôt, puis sur l'URL GitHub Pages.

### Première configuration (si nécessaire)

Dans **Settings → Pages**, choisir **Source : GitHub Actions**. Le workflow s'occupe du reste.
