import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Rating from "@mui/material/Rating";
import "../styles/contact.css";

import axios from "axios"; // Ajout de l'importation d'axios

export default function Contact() {
    const [loading, setLoading] = useState(false); // État de chargement
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/visiter",
                data
            );
            toast.success("Utilisateur enregistré avec succès !");
        } catch (error) {
            // Vérification si l'erreur est liée à un email déjà utilisé
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error); // Afficher le message d'erreur spécifique
            } else {
                toast.error("Erreur lors de l'envoi des données.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack
            className="content"
            component="section"
            sx={{
                minHeight: "110vh",
                padding: "40px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            spacing={4}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    color: "#E68369",
                    textAlign: "center",
                }}
            >
                Share your thoughts with us!
            </Typography>

            <Stack
                sx={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: 4,
                }}
            >
                {/* Vidéo avec texte */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "500px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <video
                        autoPlay
                        muted
                        loop
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 0,
                        }}
                    >
                        <source src="/videos/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <Stack
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            textAlign: "center",
                            color: "#FFF",
                            padding: "50px 20px",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(5px)",
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            Access knowledge in just one click.
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Explore our vast collection of books and enrich your
                            mind through reading.
                        </Typography>

                        <Button
                            component={Link}
                            to="/librairie"
                            sx={{
                                mt: 3,
                                backgroundColor: "#FFF",
                                color: "#E68369",
                                px: 3,
                                py: 1,
                                fontWeight: "bold",
                                borderRadius: "10px",
                                transition: "0.3s ease",
                                "&:hover": {
                                    backgroundColor: "hsl(93, 75%, 76%)",
                                    color: "hsl(0, 0%, 18%)",
                                },
                            }}
                        >
                            Discover the bookstore.
                        </Button>
                    </Stack>
                </Box>

                {/* Formulaire */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "90vh",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h3"
                        color="#E68369"
                        sx={{ textAlign: "center", marginBottom: "15%" }}
                    >
                        Form
                    </Typography>
                    <Stack spacing={3}>
                        {/* Champ Nom */}
                        <Box>
                            <TextField
                                label="Nom"
                                variant="outlined"
                                fullWidth
                                {...register("nameUser", {
                                    required: "Please enter your name.",
                                    minLength: {
                                        value: 2,
                                        message: "Name too short.",
                                    },
                                })}
                            />
                            {errors.nameUser && (
                                <Typography variant="body2" color="error">
                                    {errors.nameUser.message}
                                </Typography>
                            )}
                        </Box>

                        {/* Champ Email */}
                        <Box>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                {...register("mailUser", {
                                    required:
                                        "Please enter your email address.",
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Invalid email address.",
                                    },
                                })}
                            />
                            {errors.mailUser && (
                                <Typography variant="body2" color="error">
                                    {errors.mailUser.message}
                                </Typography>
                            )}
                        </Box>

                        {/* Champ Message */}
                        <Box>
                            <TextField
                                label="Message"
                                variant="outlined"
                                fullWidth
                                multiline
                                placeholder="What do you think of our library?"
                                rows={4}
                                {...register("messageUser", {
                                    required: "Please enter a message.",
                                    minLength: {
                                        value: 3,
                                        message: "Message too short.",
                                    },
                                })}
                            />
                            {errors.messageUser && (
                                <Typography variant="body2" color="error">
                                    {errors.messageUser.message}
                                </Typography>
                            )}
                        </Box>

                        {/* Champ Note avec étoiles ⭐ */}
                        <Box sx={{ textAlign: "center" }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ mb: 1 }}
                            >
                                Give us a rating:
                            </Typography>
                            <Controller
                                name="rating"
                                control={control}
                                rules={{
                                    required: "Please give a rating.",
                                }}
                                render={({ field }) => (
                                    <Rating
                                        {...field}
                                        value={Number(field.value) || 0}
                                        precision={0.5}
                                        size="large"
                                        onChange={(_, newValue) =>
                                            field.onChange(newValue)
                                        }
                                    />
                                )}
                            />
                            {errors.rating && (
                                <Typography variant="body2" color="error">
                                    {errors.rating.message}
                                </Typography>
                            )}
                        </Box>

                        {/* Bouton de soumission */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#E68369",
                                color: "#FFF",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#c65b49",
                                },
                            }}
                            disabled={loading} // Désactiver le bouton pendant le chargement
                        >
                            {loading ? "Sending..." : "Send"}
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
}
