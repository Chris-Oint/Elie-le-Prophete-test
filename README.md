# WMB Bible d’étude

Bible d’étude hors connexion (PWA installable) — textes officiels **Shekinah** (branham.fr) et **VGR / The Table officiel** (table.branham.org), avec référence croisée verset ↔ paragraphe.

- **Application en ligne :** https://chris-oint.github.io/Elie-le-Prophete/
- **Installation :** ouvrir le lien, puis « Ajouter à l’écran d’accueil » / « Installer l’application ».
- **Hors connexion :** bouton **Télécharger tous les textes** (≈ 50 Mo une seule fois) ; le service worker met ensuite tout le contenu en cache.

## Contenu de la révision

| Élément | Valeur |
|---|---|
| Documents | 1 596 (Shekinah 1 210 · VGR 386) |
| Codes de message | 1 213 |
| Paragraphes | 250 485 |
| Références croisées | 200 261 |
| Paragraphes au découpage réparé | 8 615 (dans 526 documents) |

Corpus reconstruit à partir des sources officielles : Little Storehouse / branham.fr (Shekinah) et l’application officielle The Table (VGR).

## Fichiers

- `index.html` — application (un seul écran, chargement des `js/part-0xx.js`)
- `js/part-004.js` — données (index des documents, liens, patchs recherche)
- `data/brochures_z1..z5.json.gz` — corpus compressé par zone
- `sw.js` — service worker (`wmb-app-v1`) pour le hors connexion
- `manifest.webmanifest` — métadonnées PWA (installation, icônes)
