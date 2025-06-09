import { Link } from 'react-router-dom';
import Titulo from "../components/Titulo"
import Button from "../components/Button";
import ButtonDelete from "../components/ButtonDelete";
import useFetchBooks from "../hooks/books/useFetchBook";
import { optionSelect } from "../utils/apiURL";
import useBookActions from "../hooks/books/useBookActions";
import './styles.css';


const Home = () => {

  const { books, getBooks } = useFetchBooks();
  const { deleteBook, handleUpdateBook } = useBookActions(getBooks);

  return (
    <div className="container">
      <Link
        to="/books"
        className="link-button"
      >
        Agregar Libro
      </Link>

      <Titulo titulo="Información del Libro" />

      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de Libros registrados.
      </p>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Autor</th>
              <th className="border border-gray-300 p-2">Título</th>
              <th className="border border-gray-300 p-2">Género</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr
                key={book.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{book.autor}</td>
                <td className="px-4 py-2">{book.titulo}</td>
                <td className="px-4 py-2">{book.genero }</td>
                <td className="px-4 py-2">
                  {optionSelect.find((opt) => opt.value === book.estado)
                  ?.label || "Sin estado"}
                </td> 
                <td>
                  <Button text="Editar" className="btn"
                  onClick={() => handleUpdateBook(book.id)}
                  />
                  <ButtonDelete text="Eliminar" className="btn-delete"
                  onClick={() => deleteBook(book.id)}
                  />
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
