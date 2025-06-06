import { Link } from 'react-router-dom';
import Titulo from "../components/Titulo"
import Button from "../components/Button";
import ButtonDelete from "../components/ButtonDelete";
import useFetchBooks from "../hooks/books/useFetchBook";
import { optionSelect } from "../utils/apiURL";
import useBookActions from "../hooks/books/useBookActions";


const Home = () => {

  const { books, getBooks } = useFetchBooks();
  const { deleteBook, handleUpdateBook } = useBookActions(getBooks);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/books"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar Libro
      </Link>

      <Titulo titulo="Book Information" />

      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de Libros registrados.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
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
                  <Button text="Editar" 
                  onClick={() => handleUpdateBook(book.id)}
                  />
                  <ButtonDelete text="Eliminar" 
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
