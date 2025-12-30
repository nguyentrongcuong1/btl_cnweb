import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, saveOrders } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // 1. Lấy dữ liệu giỏ hàng (giả sử bạn lưu trong localStorage 'cart')
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    
    // Tính tổng tiền
    const totalAmount = savedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  }, []);

  const handlePayment = () => {
    if (cartItems.length === 0) return alert("Giỏ hàng trống!");

    // 2. Tạo đối tượng đơn hàng mới
    const newOrder = {
      id: "ORD" + Date.now(), // Tạo mã đơn hàng duy nhất bằng timestamp
      date: new Date().toLocaleString(),
      items: cartItems,
      total: total,
      status: "PENDING"
    };

    // 3. Lấy danh sách cũ, thêm đơn mới và lưu lại
    const currentOrders = getOrders();
    saveOrders([...currentOrders, newOrder]);

    // 4. Xóa giỏ hàng sau khi thanh toán thành công
    localStorage.removeItem("cart");

    alert("Thanh toán thành công!");
    navigate("/cart"); // Chuyển hướng về trang đơn hàng
  };

  return (
    <div className="container my-5">
      <h2>💳 Xác nhận thanh toán</h2>
      <div className="card p-4">
        <h4>Tóm tắt đơn hàng</h4>
        {cartItems.map(item => (
          <p key={item.id}>{item.title} x {item.quantity}: {(item.price * item.quantity).toLocaleString()}₫</p>
        ))}
        <hr />
        <h5>Tổng cộng: {total.toLocaleString()}₫</h5>
        <button className="btn btn-primary mt-3" onClick={handlePayment}>
          Xác nhận đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Checkout;