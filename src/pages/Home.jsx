import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Banner from "../components/layout/Banner";
import BookList from "../components/books/BookList";
import Footer from "../components/layout/Footer";
import { getBooks } from "../services/bookService";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <BookList books={books} />
      <Footer />
    </>
  );
};

export default Home;
