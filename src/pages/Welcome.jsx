import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SubTitulo from "../components/SubTitulo";
import './styles.css';

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const handleAccept = () => {
    setShowWelcome(false);
    navigate("/home");
  };

  if (!showWelcome) return null;

  return (
    <div className="page-center">
      <div className="card">
        <SubTitulo titulo="Bienvenid@ a BookTracker 📚" />
        <p className="mb-6 text-gray-700">
        Esta aplicación te permitirá guardar el título, autor, género,
        año de publicación y el estado de lectura (Leído, Leyendo, Pendiente) de cada
        libro que has pensado o empezado a leer. Además, podrás ver tu progreso, marcar libros terminados o
        agregar nuevas lecturas con facilidad. ¡Disfruta está experiencia y lleva tu pasión por la lectura al siguiente nivel!
        </p>

        <Button type="button" onClick={handleAccept} text="¡Vamos a ello!" className="btn" />
      </div>
    </div>
  );
};

export default Welcome;
