// hooks/useFetchLibros.js
import { useState, useEffect } from "react";
import { url } from "../../utils/apiURL";

const useFetchBook = () => {
  const [libros, setLibros] = useState([]);

  const getLibros = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      console.error("Error fetching libros:", error);
    }
  };

  const getLibroById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching libro by ID:", error);
    }
  };

  useEffect(() => {
    getLibros();
  }, []);

  return { libros, getLibros, getLibroById };
};

export default useFetchBook;
