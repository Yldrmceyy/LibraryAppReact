import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" gutterBottom>
        Kütüphaneye Hoş Geldiniz
      </Typography>
      <Typography variant="h5" gutterBottom>
        En sevdiğiniz kitapları keşfedin ve ödünç alın!
      </Typography>
      <Link to="/books" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" size="large">
          Kitaplara Göz At
        </Button>
      </Link>
    </Container>
  );
}

export default HomePage;
