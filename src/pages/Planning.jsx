import React, { useState, useEffect } from "react";
import {
    Tabs,
    Tab,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function Planning() {
    const [day, setDay] = useState("monday");
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://api.jikan.moe/v4/schedules?filter=${day}`)
            .then((response) => {
                setAnimeList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des animes :", error);
                setLoading(false);
            });
    }, [day]);

    return (
        <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
            <Tabs
                value={day}
                onChange={(event, newValue) => setDay(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    background: "#FBF6E2",
                    borderRadius: "10px",
                }}
            >
                {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                ].map((dayName) => (
                    <Tab
                        key={dayName}
                        label={dayName.toUpperCase()}
                        value={dayName}
                    />
                ))}
            </Tabs>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: 2,
                        mt: 3,
                        mb: 3,
                    }}
                >
                    {animeList.map((anime) => (
                        <Card
                            key={anime.mal_id}
                            sx={{ maxWidth: 250, mx: "auto" }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={anime.images.jpg.image_url}
                                alt={anime.title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" noWrap>
                                    {anime.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {anime.broadcast.time} (
                                    {anime.broadcast.timezone})
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}
