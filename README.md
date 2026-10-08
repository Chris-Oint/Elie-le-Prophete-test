# WMB Bible d’étude — version « Bible seule »

Version de test de l’application dont **toutes les brochures (prédications) ont été retirées**.

- **Application en ligne :** cette version déployée sur GitHub Pages
- **Installation :** ouvrir le lien, puis « Ajouter à l’écran d’accueil » / « Installer l’application »
- **Hors connexion :** bouton **Télécharger la Bible (hors connexion)** ; le service worker met tout en cache

## Ce qui a été retiré

| Élément | État |
|---|---|
| Corpus des brochures (`data/brochures_z1..z5.json.gz`, ≈ 50 Mo) | supprimé |
| Index des brochures dans les données de l’application (`meta`, `links`, `zoff`, `codes`) | vidé |
| Onglet **MSG • brochures** et toute la vue brochure | retiré |
| Recherche : onglets **Brochures** et **Globale** | retirés (il reste **Bible**) |
| Panneau latéral **Brochures W. M. Branham** (photo du prédicateur) | retiré |
| Sélecteur de brochure, liste des 1 212 prédications | retiré |
| Correspondances verset ↔ brochure, pastilles « MSG liés », légende Exact/Partiel/Contextuel | retirées |
| Filtres d’historique VGR / Shekinah | retirés |
| Bouton flottant Bible ⇄ Brochure | retiré (la bulle ouvre le choix du chapitre) |

## Ce qui reste identique

- Bible complète, 66 livres, 1 189 chapitres
- Lecture, recherche biblique (Ancien / Nouveau Testament, mot exact, variantes)
- Notes personnelles, marquages (surlignage, soulignage), historique
- Thèmes, polices, installation PWA et fonctionnement hors connexion

## Fichiers

- `index.html` — application (un seul écran, chargement des `js/part-0xx.js`)
- `js/part-004.js` — données bibliques + moteur de recherche
- `js/part-024.js` — patch « Bible seule » (masque et neutralise tout le code brochure)
- `sw.js` — service worker (`wmb-app-v3`) pour le hors connexion
- `manifest.webmanifest` — métadonnées PWA

La version d’origine (avec les brochures) reste disponible :
https://chris-oint.github.io/Elie-le-Prophete/
