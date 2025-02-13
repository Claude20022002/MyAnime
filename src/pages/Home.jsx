import { Box, Stack, Typography, Button } from "@mui/material";
import SplitText from "../components/splitText/SplitText";
import { useState } from "react";
import SearchBar from "../components/searchbar/SearchBar";
import { useEffect, useRef } from "react";
import axios from "axios";
import Card from "../components/card/Card";

export default function Home() {
    const handleAnimationComplete = () => {
        console.log("All letters have animated!");
    };
    const [data, setData] = useState([]);
    const [activeAnime, setActiveAnime] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [background, setBackground] = useState("");
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}`
                );
                console.log(response.data);
                setData(response.data.data);
                setTotalPages(response.data.pagination.last_visible_page);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [page]);

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
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </Stack>
                </Stack>
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
                    <SearchBar />
                    <Stack
                        sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: "center",
                                margin: "20px",
                                padding: "10px",
                                width: "100%",
                            }}
                        >
                            Welcome to Anime World
                        </Typography>
                        <Stack
                            id="card-container"
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div className="wrapper">
                                {data.map((anime) => (
                                    <Card
                                        key={anime.mal_id}
                                        anime={anime}
                                        activeAnime={activeAnime}
                                        setActiveAnime={setActiveAnime}
                                        setBackground={setBackground}
                                    />
                                ))}
                            </div>
                        </Stack>
                    </Stack>
                    <Stack
                        className="pagination"
                        display={"block"}
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
