import { getOrders, cancelOrder } from "../services/orderService";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Hàm này dùng để lấy dữ liệu mới nhất từ Service
  const fetchOrders = () => {
    const data = getOrders(); // Lấy mảng từ localStorage
    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders(); // Chạy 1 lần duy nhất khi mở trang
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      cancelOrder(id); // Gọi service để đổi trạng thái đơn
      fetchOrders(); // Cập nhật lại giao diện ngay
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">📦 Lịch sử đơn hàng</h2>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Bạn chưa có đơn hàng nào.</p>
          <a href="/" className="btn btn-primary">
            Mua sắm ngay
          </a>
        </div>
      ) : (
        // Hiển thị từ đơn mới nhất đến cũ nhất
        [...orders].reverse().map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <span>
                Mã đơn: <strong>{order.id}</strong>
              </span>
              <span
                className={`badge ${
                  order.status === "PENDING" ? "bg-warning" : "bg-secondary"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="card-body">
              <p className="text-muted small mb-2">Ngày đặt: {order.date}</p>

              {/* Hiển thị danh sách sách trong mỗi đơn hàng */}
              <ul className="list-unstyled">
                {order.items?.map((item, index) => (
                  <li key={index} className="small border-bottom py-1">
                    {item.title} x {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <h5 className="text-danger mb-0">
                  Tổng: {order.total?.toLocaleString("vi-VN")}₫
                </h5>

                {order.status === "PENDING" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(order.id)}
                  >
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
