import { url } from "../../utils/apiURL";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useBookActions = (getBooks) => {
  const navigate = useNavigate();

  const deleteBook = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete book");
      toast.success("Book deleted successfully");
      getBooks();
    } catch (error) {
      toast.error(error.message || "Error deleting book");
    }
  };

  const handleUpdateBook = (id) => {
    navigate(`/books/${id}`);
  };

  return { deleteBook, handleUpdateBook };
};

export default useBookActions;
