import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <Box
            sx={{
                margin: "20px 5px",
                display: "flex",
                alignItems: "center",
                width: "40%",
                boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                background: "#FBF6E2",
                borderRadius: "5px",
                padding: "5px",
            }}
        >
            <TextField
                label="Search"
                variant="filled"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon
                                sx={{ color: "black", fontSize: "20px" }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiInputBase-root": {
                        background: "#FBF6E2",
                        borderRadius: "5px",
                        height: "50px",
                    },
                }}
            />
        </Box>
    );
}
