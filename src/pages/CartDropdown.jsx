import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrders, saveOrders } from "../../services/orderService";

const CartDropdown = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Hàm load dữ liệu từ localStorage
  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  };

  useEffect(() => {
    loadCart();
    // Lắng nghe sự kiện storage để đồng bộ khi thêm sản phẩm từ trang khác
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  // 1. Hàm cập nhật số lượng
  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 2. Hàm xóa sản phẩm khỏi giỏ
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 3. Tính tổng tiền
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // 4. Hàm Thanh toán nhanh
  const handleQuickCheckout = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: "ORD-" + Date.now(),
      total: totalAmount,
      status: "PENDING",
      items: cartItems,
      date: new Date().toLocaleString(),
    };

    const allOrders = getOrders();
    saveOrders([...allOrders, newOrder]);
    localStorage.removeItem("cart");
    setCartItems([]);
    
    alert("Thanh toán thành công!");
    navigate("/orders");
  };

  return (
    <div className="card shadow" style={{ width: "350px", position: "absolute", right: 0, zIndex: 1000 }}>
      <div className="card-body p-3">
        <h5 className="card-title border-bottom pb-2">Giỏ hàng mẫu</h5>
        
        {cartItems.length === 0 ? (
          <p className="text-center py-3">Giỏ hàng trống</p>
        ) : (
          <>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 pb-2 border-bottom">
                  <img src={item.image} alt="" style={{ width: "50px", height: "70px", objectFit: "cover" }} className="me-2" />
                  <div className="flex-grow-1">
                    <h6 className="mb-0" style={{ fontSize: "14px" }}>{item.title}</h6>
                    <small className="text-muted">{item.price.toLocaleString()}₫</small>
                    <div className="d-flex align-items-center mt-1">
                      <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-sm btn-outline-secondary py-0 px-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="btn btn-sm text-danger" onClick={() => removeFromCart(item.id)}>
                    <i className="bi bi-trash"></i> X
                  </button>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between fw-bold mt-3 fs-5">
              <span>Tổng:</span>
              <span className="text-primary">{totalAmount.toLocaleString()}₫</span>
            </div>

            <div className="d-grid gap-2 mt-3">
              <Link to="/cart" className="btn btn-primary btn-sm">Xem giỏ hàng</Link>
              <button className="btn btn-success btn-sm" onClick={handleQuickCheckout}>Thanh toán</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;