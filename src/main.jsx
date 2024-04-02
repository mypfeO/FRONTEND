import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './Components/CreationFormulaire/Formulaire';
import Login from './Components/login/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<Login />} />
        <Route path="/formulaire" element={<App />} />
        </Routes>
      </DndProvider>
    </Router>
  </ThemeProvider>
);
