const BookCard = ({ book }) => {
  return (
    <div className="card h-100">
      <img
        src={book.image}
        className="card-img-top"
        alt={book.title}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text fw-bold">
          {book.price.toLocaleString()}đ
        </p>
      </div>
    </div>
  );
};

export default BookCard;
