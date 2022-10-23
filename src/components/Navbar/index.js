import React from 'react';
import { Nav } from './styled';

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/converter">Conversor</Link>
      <Link to="/calculator">Calculadora</Link>
      <Link to="/game-of-life">Jogo da Vida</Link>
    </Nav>
  );
}
