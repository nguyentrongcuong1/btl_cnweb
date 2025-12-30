import { useCart } from "../../context/CartContext";

const BookCard = ({ book }) => {
  const { dispatch } = useCart();

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={book.image}
        className="card-img-top"
        alt={book.title}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h6 className="card-title">{book.title}</h6>
        <p className="fw-bold text-primary">{book.price.toLocaleString()}đ</p>

        <div className="d-grid gap-2">
          <button className="btn btn-outline-primary btn-sm">
            Xem chi tiết
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: book,
              })
            }
          >
            <i className="bi bi-cart-plus"></i> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
