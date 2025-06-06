import { useState, useEffect } from "react";
import { url } from "../../utils/apiURL";
import { toast } from "react-hot-toast";
import useBookActions from "./useBookActions";

const useFetchBook = () => {

  const [books, setBooks] = useState([]);
  const {deleteBook, handleUpdateBook} = useBookActions();

  const getBooks = async () => {

    try {

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching books")
      }
      const data = await response.json();
      setBooks(data);

    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Error fetching books");
    }
    
  };

  const getBookById = async (id) => {

    try {

      const response = await fetch(`${url}/${id}`);

      if (!response.ok) {
        console.log("Failed to fetch book");
        throw new Error("Failed to fetch book");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error fetching book:", error);
      console.log("Failed to fetch book");
      return null;
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return { 

    books, 
    getBooks, 
    getBookById 
  
  }

};

export default useFetchBook;
