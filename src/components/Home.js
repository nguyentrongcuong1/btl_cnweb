import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Featured Books</h2>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-3 mb-4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
