## Purpose

Ce fichier guide un agent IA (Copilot / assistant) pour être immédiatement productif sur ce dépôt "Smart-Pot-Plant" — un site statique simple composé de pages HTML/CSS/JS. Il décrit l'architecture, les conventions et les workflows pratiqués ici.

## Big Picture

- **Type de projet** : site statique (HTML/CSS/JS). Pas d'API backend ni de framework serveur détecté.
- **Deux emplacements pour le site** : `website/` et `docs/`.
  - `docs/` est la copie déployée pour GitHub Pages (serveur statique).
  - `website/` contient une copie parallèle; le dépôt contient des fichiers dupliqués (`index.html`, `product.html`, `cart.html`, `script.js`, `style.css`).

## Key Files & Patterns (exemples)

- Pages principales : `docs/index.html`, `docs/product.html`, `docs/checkout.html`, `docs/cart.html`.
- Assets : `docs/assets/` (images, icônes).
- Frontend logic & styles : `docs/script.js`, `docs/style.css` (les mêmes fichiers existent aussi sous `website/`).
- Source README minimal : `README.md`.

## Conventions & recommended workflow

- Source-of-truth : Aucune convention explicite trouvée. Avant d'éditer, vérifier s'il existe une préférence en ouvrant une PR ou en demandant au mainteneur. En pratique les modifications sont faites soit directement dans `docs/` (prêt pour publication) soit dans `website/` puis copiées vers `docs/`.
- Publishing to GitHub Pages : Le dépôt sert les fichiers statiques depuis `docs/` sur la branche `main`. Pour publier une mise à jour, mettez à jour `docs/` et `git commit && git push`.
- Synchronisation rapide (si vous modifiez `website/`) :
  - Exemple : `cp -r website/* docs/` puis vérifier `docs/` et commit.

## Local preview

- Ouvrir simplement `docs/*.html` dans un navigateur ou lancer un serveur statique depuis la racine du dépôt :

```
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/docs/index.html
```

## When editing pages

- Préférer modifier les fichiers HTML/CSS/JS cohérents entre `website/` et `docs/`.
- Si vous changez la structure des fichiers (ajout d'images, répertoires), mettez à jour `docs/assets/` et conservez les chemins relatifs utilisés par les pages.
- Exemples concrets :
  - Mettre à jour le comportement du panier : modifiez `docs/script.js` (ou `website/script.js`) et vérifiez `docs/cart.html`.
  - Ajouter un produit : modifier `docs/product.html` et l'image associée dans `docs/assets/`.

## Commits & messages

- Style observé : messages concis en anglais/français; ex. `Publish site: add docs/ for GitHub Pages and placeholder image`.
- Recommander : `feat(site): <brève description>` ou `fix(site): <brève description>` pour clarifier l'intention.

## Tests / CI / Debug

- Aucun test automatisé détecté. Pas de configuration CI/ESLint/Prettier détectée.
- Pour diagnostiquer : lancer un serveur local (voir ci‑dessus) et utiliser les outils de développement du navigateur pour JavaScript/CSS.

## Integration points & external deps

- Aucun service externe ni dépendance côté serveur détectée dans le dépôt. Le site est autonome (fichiers statiques).
- Si vous introduisez des intégrations (ex. paiement externe), documentez les clés/URL et variables d'environnement dans le README ou un fichier `.env.example`.

## What the agent should not change

- Ne pas supprimer `docs/` sans accord — il sert de répertoire de publication pour GitHub Pages.
- Éviter de renommer massivement des fichiers sans mise à jour des références relatives dans les HTML.

## Quick checklist pour PRs

- Vérifier qu'après changement, `docs/` contient la version prête à déployer.
- Tester localement via `python3 -m http.server` et ouvrir la ou les pages modifiées.
- Utiliser des messages de commit clairs (ex. `feat(site): update product page images`).

---

Si vous voulez, j'applique ce fichier au dépôt. Indiquez si je dois :
- privilégier `website/` comme source principale et automatiser copie vers `docs/`, ou
- documenter une autre stratégie (modifier `docs/` directement).

Merci — dites-moi si vous voulez plus d'exemples spécifiques (liens de fichiers modifiés, snippets à copier, ou scripts de synchronisation). 
