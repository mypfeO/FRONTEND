import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route instead of BrowserRouter and Route
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './Components/CreationFormulaire/Formulaire.jsx';
import Login from './Components/login/Login.jsx';

ReactDOM.render(
  <Router>
    <DndProvider backend={HTML5Backend}>
      <Routes> {/* Wrap Routes around Route components */}
        <Route path="/" element={<Login />} /> {/* Use "element" prop instead of "component" */}
        <Route path="/formulaire" element={<App />} />
      </Routes>
    </DndProvider>
  </Router>,
  document.getElementById('root')
);
