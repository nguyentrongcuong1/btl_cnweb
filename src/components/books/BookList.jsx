import BookCard from "./BookCard";

const addToCart = (book) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Logic thêm sách vào mảng cart...
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
const BookList = ({ books }) => {
  return (
    <div className="container my-5">
      <h3 className="mb-4">Sách Bán Chạy</h3>
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

export default BookList;
