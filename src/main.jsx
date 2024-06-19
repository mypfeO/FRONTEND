import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './Components/CreationFormulaire/Formulaire';
import FormDataFetcher from './Components/SubmitionForm/FormDataFetcher';
import PageList from './Components/allPagesWeb/PageList';
import FormList from './Components/FormsByWebPage/FormList';
import Login from './Components/login/Login';

import PreviewForm from './Components/PreviewForm/PreviewForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactGA from 'react-ga4'; // Use react-ga4

const theme = createTheme({});
ReactGA.initialize('G-65V80KRD1C');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/formulaire" element={<App />} />
          <Route path="/forms/:siteWebId/:formId" element={<FormDataFetcher />} />
          <Route path="/pages" element={<PageList />} />
          <Route path="/forms/:siteWebId" element={<FormList />} />
          <Route path="/preview-form/:siteWebId/:formId" element={<PreviewForm />} />

        </Routes>
      </DndProvider>
    </Router>
  </ThemeProvider>
);
