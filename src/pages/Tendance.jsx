import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Modal,
    Box,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function TrendingAnimes() {
    const [animes, setAnimes] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null);

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/top/anime")
            .then((response) => response.json())
            .then((data) => setAnimes(data.data))
            .catch((error) =>
                console.error(
                    "Erreur lors de la récupération des animes",
                    error
                )
            );
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
                padding: 2,
            }}
        >
            {animes.map((anime) => (
                <Card
                    key={anime.mal_id}
                    sx={{ width: 250, cursor: "pointer" }}
                    onClick={() => setSelectedAnime(anime)}
                >
                    <CardMedia
                        component="img"
                        height="350"
                        image={anime.images.jpg.image_url}
                        alt={anime.title}
                    />
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {anime.title}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            <Modal
                open={!!selectedAnime}
                onClose={() => setSelectedAnime(null)}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                        width: 400,
                    }}
                >
                    {selectedAnime && (
                        <>
                            <IconButton
                                sx={{ position: "absolute", top: 8, right: 8 }}
                                onClick={() => setSelectedAnime(null)}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold", mb: 1 }}
                            >
                                {selectedAnime.title}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedAnime.synopsis}
                            </Typography>
                            <Typography variant="subtitle2">
                                Auteur(s):{" "}
                                {selectedAnime.studios
                                    .map((studio) => studio.name)
                                    .join(", ") || "Non disponible"}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
