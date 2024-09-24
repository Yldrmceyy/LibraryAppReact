import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/book.jpg";

function HomePage() {
  return (
    <Box
      sx={{
        textAlign: "center",
        height: "calc(100vh - 64px)",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#fff",
        marginTop: -6,
        padding: 0,
        width: "100%",
        position: "relative",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
      
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        
        >
          Library Management System
        </Typography>
        <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
          <Grid item>
            <Link to="/books" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  padding: "12px 24px",
                  width: "100%",
                  maxWidth: "300px",
                  fontSize: "1.2rem",
                  backgroundColor: "#303f9f", // Indigo ana arka plan rengi
                  color: "#fff", // Beyaz metin rengi
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
                  transition: "background-color 0.3s ease", // Hover animasyonu için geçiş efekti
                }}
              >
                Browse Books
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
