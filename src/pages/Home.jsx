import React from "react";
import Titulo from "../components/Titulo"
import useFetchBooks from "../hooks/books/useFetchBook";
import useBookActions from "../hooks/books/useBookActions";
import ButtonDelete from "../components/ButtonDelete";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { books, loading, getBooks } = useFetchBooks();
  const { deleteBook, handleUpdateBook } = useBookActions(getBooks);
  const navigate = useNavigate();

  if (loading) return <p>Cargando libros...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Libros</h1>
      <Button onClick={() => navigate("/books/new")} text="Agregar Libro" />
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Autor</th>
            <th className="border border-gray-300 p-2">Libro</th>
            <th className="border border-gray-300 p-2">Estado</th>
            <th className="border border-gray-300 p-2">Género</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book.id} className="text-center">
              <td className="border border-gray-300 p-2">{book.Autor}</td>
              <td className="border border-gray-300 p-2">{book.Libro}</td>
              <td className="border border-gray-300 p-2">{book.Estado}</td>
              <td className="border border-gray-300 p-2">{book.Genero}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <Button
                  onClick={() => handleUpdateBook(book.id)}
                  text="Editar"
                />
                <ButtonDelete
                  onClick={() => {
                    if (
                      window.confirm(
                        `¿Seguro que quieres eliminar "${book.Libro}"?`
                      )
                    ) {
                      deleteBook(book.id);
                    }
                  }}
                  text="Eliminar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
