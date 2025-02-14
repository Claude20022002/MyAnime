# Projet : Anime World

## Fonctionnalités principales :

-   Affichage d'une liste d'animes via l'API Jikan (MyAnimeList)
-   Système de pagination
-   Barre de recherche pour filtrer les animes
-   Animation de texte avec le composant SplitText
-   Affichage dynamique des cartes d'anime
-   Changement de fond d'écran dynamique

## Structure technique :

-   Framework : React
-   UI Library : Material-UI (MUI)
-   Gestion des requêtes HTTP : Axios
-   API : Jikan v4

## Composants principaux :

-   Home.jsx : Page principale
-   SearchBar : Composant de recherche
-   Card : Composant pour afficher les informations d'un anime
-   SplitText : Composant d'animation de texte

## États gérés :

-   searchQuery : pour la barre de recherche
-   currentPage : pour la pagination
-   animes : pour stocker les données des animes
-   isLoading : pour le chargement des données
-   error : pour les erreurs de chargement des données

```
- data : Liste des animes
- activeAnime : Anime actuellement sélectionné
- page : Page courante
- totalPages : Nombre total de pages
- background : Image de fond
- searchQuery : Terme de recherche
```

## Fonctionnalités principales :

-   Affichage d'une liste d'animes via l'API Jikan (MyAnimeList)
-   Système de pagination
-   Barre de recherche pour filtrer les animes
-   Animation de texte avec le composant SplitText
-   Affichage dynamique des cartes d'anime
-   Changement de fond d'écran dynamique

## Fonctionnalités de navigation :

-   Pagination avec boutons "Précédent" et "Suivant"
-   Affichage du numéro de page actuel
-   Limite de pagination basée sur l'API

## Style et UI :

-   Design responsive
-   Effets de flou (backdrop-filter)
-   Fond dynamique avec overlay semi-transparent
-   Animations de texte
-   Layout en grille pour les cartes d'anime

## Gestion des données :

-   Requêtes API asynchrones avec axios
-   Filtrage des résultats basé sur la recherche
-   Mise à jour automatique lors du changement de page
