import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.css";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function Header() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const iconStyle = {
        width: "100%",
        height: "100%",
        color: "#fbf6e2",
    };

    return (
        <header>
            <Stack
                className="logoText"
                sx={{
                    width: {
                        xs: "70px !important",
                        sm: "120px !important",
                        md: "160px !important",
                    },
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                    }}
                >
                    <img
                        src="/svg/vecteezy_vector-manga-anime-pirate-japan-character-cute-cartoon_24104955.svg"
                        width="30%"
                        height="30%"
                        alt=""
                    />
                    <Typography variant="h5">Anime World</Typography>
                </Link>
            </Stack>

            <Stack className="nav">
                {/* Icône Menu Burger */}
                <Box className="menu" onClick={toggleMenu}>
                    {open ? (
                        <IoMdClose style={iconStyle} />
                    ) : (
                        <IoMenu style={iconStyle} />
                    )}
                </Box>

                {/* Liste des liens avec effet de slide */}
                <ul className={open ? "isActive" : ""}>
                    <li>
                        <Link to="/" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={toggleMenu}>
                            Contact
                        </Link>
                    </li>

                    <li>
                        <Link to="/planning" onClick={toggleMenu}>
                            Planning
                        </Link>
                    </li>
                    <li>
                        <Link to="/tendance" onClick={toggleMenu}>
                            Tendance
                        </Link>
                    </li>
                </ul>
            </Stack>
        </header>
    );
}
