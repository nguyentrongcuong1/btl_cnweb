import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderService";

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const totalAmount = Array.isArray(state.items)
    ? state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : 0;

  const handleCheckout = () => {
    if (state.items.length === 0) return alert("Giỏ hàng trống!");

    const newOrder = {
      id: "ORD-" + Date.now(),
      items: state.items,
      total: totalAmount,
      status: "PENDING",
      date: new Date().toLocaleString(),
    };

    addOrder(newOrder);
    dispatch({ type: "CLEAR_CART" });

    alert("Đặt hàng thành công!");
    navigate("/orders");
  };

  return (
    <div className="container my-5">
      <h2>🛒 Giỏ hàng của tôi</h2>
      {state.items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div>
          {state.items.map((item) => (
            <div key={item.id}>
              {item.title} x {item.quantity} -{" "}
              {(item.price * item.quantity).toLocaleString()}₫
            </div>
          ))}
          <h4>Tổng: {totalAmount.toLocaleString()}₫</h4>
          <button className="btn btn-success mt-3" onClick={handleCheckout}>
            Xác nhận Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
