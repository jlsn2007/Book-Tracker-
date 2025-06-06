import { useEffect } from "react";
import { url } from "../../utils/apiURL";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchBook from "./useFetchBook"

const useDataBook = (methods) => {
  const { getBookById, getBooks } = useFetchBook();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const saveBookform = async (dataForm) => {

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to add book");
        throw new Error("No se pudo guardar el libro");
      }
      toast.success("Libro guardado correctamente");
      navigate("/home");
    } catch (error) {
      console.error("Error al guardar el libro", error);
    } finally {
      reset();
      getBooks();
    }
  };

  const editBook = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to update book");
        throw new Error("No se pudo editar el libro");
      }
      toast.success("Libro editado correctamente");
      navigate("/home");
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book");
    } finally {
      reset();
      getBooks();
    }
  };

  const loadBook = async () => {
    if (id) {
      const book = await getBookById(id);
      if (book) {
        reset({
          autor: book?.autor,
          titulo: book?.titulo,
          genero: book?.genero,
          estado: book?.estado,
        });
      }
    }
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  const handleBookAction = (dataForm) => {
    if (id) {
      editBook(dataForm);
    } else {
      saveBookform(dataForm);
    }
  };

  const handleUpdateBook = (id) => {
    navigate(`/users/${id}`);
  };

  return {
    register,
    handleSubmit: handleSubmit(handleBookAction),
    errors,
    getBookById,
    handleUpdateBook,
    loadBook,
  };
};

export default useDataBook;
