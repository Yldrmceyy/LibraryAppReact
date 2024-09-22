import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/book.jpg";

function HomePage() {
  return (
    <Box
      sx={{
        textAlign: "center",
        height: "calc(100vh - 64px)", // Örnek: 64px navbar yüksekliği
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#fff",
        marginTop: -6, // Boşlukları sıfırla
        padding: 0, // İç boşlukları sıfırla
        width: "100%", // Tam genişlik
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Welcome to the Library
      </Typography>
      <Typography variant="h5" gutterBottom>
        Discover and borrow your favorite books!
      </Typography>
      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        <Grid item>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ padding: "10px", width: "100%", maxWidth: "300px" }}
            >
              Browse Books
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
