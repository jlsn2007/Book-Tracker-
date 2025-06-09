import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const PageNotFound = () => (
  <div className="page-center not-found">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">¡Vaya! Al parecer esta página del libro no la encontramos :c</h2>
    <p className="mb-6">La ruta que buscas no existe.</p>
    <Link to="/" className="link-button">
      Volver al inicio
    </Link>
  </div>
);

export default PageNotFound;