import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/globalStyles';
import Routes from './routes';

// Components
import Header from './components/Header';

// Pages

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
