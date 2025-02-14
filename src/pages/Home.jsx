import {
    Box,
    Stack,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import SplitText from "../components/splitText/SplitText";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBar from "../components/searchbar/SearchBar";
import Card from "../components/card/Card";

export default function Home() {
    const [data, setData] = useState([]);
    const [activeAnime, setActiveAnime] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [background, setBackground] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}`
                );
                setData(response.data.data);
                setTotalPages(response.data.pagination.last_visible_page);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données :",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const filteredAnimes = data.filter((anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box
            className="content"
            sx={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    WebkitBackdropFilter: "blur(5px)",
                    backdropFilter: "blur(5px)",
                    gap: "20px",
                }}
            >
                <Stack component="section" className="home">
                    <Stack
                        className="welcome"
                        sx={{
                            minHeight: "50vh",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <SplitText
                            taille="h1"
                            text="Welcome to Anime World"
                            className="text-2xl font-semibold text-center"
                            delay={150}
                            animationFrom={{
                                opacity: 0,
                                transform: "translate3d(0,50px,0)",
                            }}
                            animationTo={{
                                opacity: 1,
                                transform: "translate3d(0,0,0)",
                            }}
                            easing="easeOutCubic"
                            threshold={0.2}
                            rootMargin="-50px"
                        />
                    </Stack>
                </Stack>

                {/* Barre de recherche */}
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <Stack
                    component="section"
                    className="card-container"
                    sx={{
                        width: "100%",
                        padding: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            margin: "20px",
                            padding: "10px",
                        }}
                    >
                        Anime List
                    </Typography>

                    {/* Affichage des résultats */}
                    {isLoading ? (
                        <CircularProgress sx={{ marginTop: "20px" }} />
                    ) : (
                        <Stack
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div className="wrapper">
                                {filteredAnimes.length > 0 ? (
                                    filteredAnimes.map((anime) => (
                                        <Card
                                            key={anime.mal_id}
                                            anime={anime}
                                            activeAnime={activeAnime}
                                            setActiveAnime={setActiveAnime}
                                            setBackground={setBackground}
                                        />
                                    ))
                                ) : (
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "white",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Aucun anime trouvé 😢
                                    </Typography>
                                )}
                            </div>
                        </Stack>
                    )}

                    {/* Pagination */}
                    <Stack
                        className="pagination"
                        display="block"
                        sx={{ padding: "30px" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            sx={{ margin: "10px", padding: "5px" }}
                        >
                            Précédent
                        </Button>

                        <span style={{ color: "white" }}>
                            Page {page} / {totalPages}
                        </span>

                        <Button
                            variant="outlined"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages}
                            sx={{ margin: "10px", padding: "5px" }}
                        >
                            Suivant
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
