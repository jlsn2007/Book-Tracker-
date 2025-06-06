import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../utils/apiURL";

const useDataBook = (methods) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const saveBook = async (data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo guardar");
      toast.success("Libro guardado correctamente");
      navigate("/home");
    } catch (err) {
      toast.error("Error al guardar el libro");
      console.error(err);
    } finally {
      reset();
    }
  };

  const editBook = async (data) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo editar");
      toast.success("Libro editado correctamente");
      navigate("/home");
    } catch (err) {
      toast.error("Error al editar el libro");
      console.error(err);
    } finally {
      reset();
    }
  };

  const loadBook = async () => {
    if (id) {
      const res = await fetch(`${url}/${id}`);
      const data = await res.json();
      reset(data);
    }
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  const handleBookAction = (data) => {
    if (id) {
      editBook(data);
    } else {
      saveBook(data);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(handleBookAction),
    errors,
  };
};

export default useDataBook;
