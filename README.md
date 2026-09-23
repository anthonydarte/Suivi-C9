# Suivi C9 — application web installable (PWA)

Suivi du programme C9 (J1 à J9), du bilan J10, de la transition (J11 à J24) et de l'entretien.
Aucun serveur : tout fonctionne dans le navigateur, et les données restent sur l'appareil.

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | l'application complète (HTML, CSS, JS) |
| `manifest.webmanifest` | nom, couleurs et icônes pour l'installation |
| `sw.js` | service worker : fonctionnement hors ligne et mises à jour |
| `icons/` | icônes 32, 180 (iOS), 192, 512 et 512 « maskable » (Android) |
| `.nojekyll` | évite le traitement Jekyll de GitHub Pages |

## Mise en ligne sur GitHub Pages

1. Crée un dépôt, par exemple `suivi-c9`. Avec un compte gratuit, GitHub Pages impose un dépôt **public**.
2. Envoie les fichiers à la racine du dépôt :
   ```bash
   git init && git add . && git commit -m "Suivi C9 v3"
   git branch -M main
   git remote add origin git@github.com:<ton-compte>/suivi-c9.git
   git push -u origin main
   ```
3. Dans le dépôt : **Settings → Pages → Build and deployment**, source **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Après une à deux minutes, l'app est disponible sur `https://<ton-compte>.github.io/suivi-c9/`.

Tous les chemins sont relatifs : l'app fonctionne aussi bien dans un sous-dossier de projet qu'avec un domaine personnalisé.

## Installation sur le téléphone

- **iPhone (Safari)** : ouvre l'adresse, puis Partager → **Sur l'écran d'accueil**.
- **Android (Chrome)** : menu ⋮ → **Installer l'application**.

L'app s'ouvre alors en plein écran et fonctionne hors ligne après la première ouverture.

## Données

- Tout est stocké dans le navigateur de l'appareil (`localStorage`, clé `suivi-c9-pwa`). Rien n'est envoyé sur Internet.
- Chaque appareil a ses propres données. Pour passer de l'un à l'autre : **Repères → Mes données → Sauvegarder**, puis **Restaurer** sur l'autre appareil.
- Sur iPhone, les données d'une app installée sont séparées de celles de Safari. Si l'app a été ajoutée à l'écran d'accueil, c'est là qu'il faut restaurer.
- Fais une sauvegarde régulière : effacer les données du navigateur efface le suivi.
- Ne dépose jamais de fichier de sauvegarde dans le dépôt : il deviendrait public.

## Publier une mise à jour

1. Modifie `index.html`.
2. Dans `sw.js`, incrémente `CACHE` (par exemple `suivi-c9-v3.0.1`).
3. Commit et push. À la prochaine ouverture, l'app affiche « Nouvelle version disponible · Recharger ».

## Limites connues

- Pas de synchronisation automatique entre appareils (il faudrait un serveur).
- Pas de notifications : sur iPhone, les notifications web exigent un serveur d'envoi. Les rappels restent dans l'app Rappels.
- Le bilan coach passe par le partage ou le copier-coller : aucune donnée n'est collectée par l'app.

## Contenu

Le programme, les produits et les recettes proviennent du livret Forever C9. Vérifie que leur diffusion publique te convient vis-à-vis de Forever avant de partager l'adresse.
