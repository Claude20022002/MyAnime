# Projet : Anime World

## Description détaillée

Application web permettant d'explorer et de découvrir des animes en utilisant l'API Jikan. L'interface intuitive permet aux utilisateurs de parcourir, rechercher et obtenir des informations détaillées sur différents animes.

## Fonctionnalités principales :

### Interface utilisateur

-   Affichage d'une liste d'animes via l'API Jikan (MyAnimeList)
-   Interface responsive et moderne avec Material-UI
-   Animation de bienvenue avec effet de split text
-   Changement dynamique du fond d'écran selon l'anime sélectionné
-   Effet de flou (blur) sur le fond pour améliorer la lisibilité

### Système de recherche

-   Barre de recherche en temps réel
-   Filtrage instantané des résultats
-   Recherche insensible à la casse
-   Conservation de l'état de recherche

### Navigation et pagination

-   Système de pagination avancé
-   Affichage du nombre total de pages
-   Boutons de navigation intuitifs
-   Limitation intelligente basée sur l'API
-   Indicateur de page courante

### Affichage des animes

-   Cartes interactives pour chaque anime
-   Informations détaillées au survol
-   Images haute qualité
-   Système de notation visible
-   Statut de diffusion
-   Nombre d'épisodes

## Structure technique détaillée :

### Frontend

-   React 18+
-   Material-UI v5
-   Styled-components pour le styling personnalisé
-   React Hooks pour la gestion d'état
-   Composants fonctionnels modernes

### Gestion des requêtes

-   Axios pour les appels API
-   Gestion des erreurs HTTP
-   Cache des requêtes
-   Rate limiting intelligent

### Performance

-   Lazy loading des images
-   Optimisation des re-renders
-   Mise en cache locale
-   Debouncing des recherches

## Architecture des composants :

### Home.jsx

```javascript
// Composant principal
- Gestion des états globaux
- Logique de pagination
- Intégration API
- Gestion du background
```

### SearchBar.jsx

```javascript
// Composant de recherche
- Input contrôlé
- Debouncing
- Filtrage temps réel
- Style Material-UI
```

### Card.jsx

```javascript
// Composant carte anime
- Affichage des informations
- Gestion des événements
- Animations au survol
- Loading states
```

### SplitText.jsx

```javascript
// Composant d'animation
- Animation lettre par lettre
- Timing personnalisable
- Effets de transition
- Callbacks d'animation
```

## Gestion avancée des états :

### États principaux

```javascript
const [data, setData] = useState([]); // Données des animes
const [activeAnime, setActiveAnime] = useState(null); // Anime sélectionné
const [page, setPage] = useState(1); // Page courante
const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
const [background, setBackground] = useState(""); // Image de fond
const [searchQuery, setSearchQuery] = useState(""); // Terme de recherche
const [isLoading, setIsLoading] = useState(false); // État de chargement
```

## Intégration API détaillée :

### Gestion des requêtes

```javascript
const fetchData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(
            `https://api.jikan.moe/v4/anime?page=${page}&limit=25&order_by=score&sort=desc`
        );
        setData(response.data.data);
        setTotalPages(response.data.pagination.last_visible_page);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setIsLoading(false);
    }
};
```

### Optimisations API

-   Mise en cache des résultats
-   Gestion du rate limiting
-   Retry automatique en cas d'erreur
-   Annulation des requêtes obsolètes

## Styles et thèmes :

### Thème Material-UI personnalisé

```javascript
const theme = {
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
};
```

### Styles globaux

-   Design system cohérent
-   Variables CSS personnalisées
-   Breakpoints responsives
-   Animations fluides

## Scripts disponibles :

```bash
# Installation
npm install

# Développement
npm run dev

# Production
npm run build
npm run start

# Tests
npm run test
```

## Bonnes pratiques et standards :

### Code

-   ESLint pour la qualité du code
-   Prettier pour le formatage
-   PropTypes pour le typage
-   Documentation JSDoc

### Performance

-   Code splitting
-   Optimisation des images
-   Minification du bundle
-   Gestion du cache

### Sécurité

-   Validation des entrées
-   Protection XSS
-   Gestion sécurisée des API
-   Variables d'environnement

## Prochaines évolutions prévues :

-   Système d'authentification
-   Liste de favoris
-   Filtres avancés
-   Mode hors ligne
-   Support multilingue
-   Tests unitaires
-   PWA
