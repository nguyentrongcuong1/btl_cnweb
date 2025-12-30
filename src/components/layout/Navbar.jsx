import Logo from "../common/Logo";
import { IoSearchOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { IoTrashOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5"; // Import thêm icon

const Navbar = () => {
  // Lấy dispatch từ context để thực hiện hành động xóa/sửa
  const { state, dispatch } = useCart();

  const totalItems =
    state?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Hàm xử lý tăng/giảm số lượng
  const updateQty = (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQty } });
    }
  };

  // Hàm xử lý xóa sản phẩm
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Thanh Tìm Kiếm */}
        <form className="d-flex mx-auto mt-3 mt-lg-0" style={{ width: "45%" }}>
          <div className="input-group">
            <input
              className="form-control border-secondary-subtle"
              type="search"
              placeholder="Tìm tên sách, tác giả..."
            />
            <button className="btn btn-primary px-3" type="submit">
              <IoSearchOutline size={20} />
            </button>
          </div>
        </form>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Sách
              </Link>
            </li>

            {/* Giỏ hàng Dropdown */}
            <li className="nav-item dropdown ms-3">
              <button
                className="btn position-relative border-0"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <CiShoppingCart size={28} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>

              <div
                className="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0"
                style={{ width: "350px" }}
              >
                <h6 className="mb-3">Giỏ hàng của bạn</h6>
                {state.items.length === 0 ? (
                  <div className="text-center py-3">
                    <CiShoppingCart size={40} className="text-muted mb-2" />
                    <p className="text-muted mb-0">Giỏ hàng trống</p>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      {state.items.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex mb-3 align-items-center"
                        >
                          <img
                            src={item.image}
                            width="45"
                            height="65"
                            className="me-2 rounded shadow-sm"
                            style={{ objectFit: "cover" }}
                          />
                          <div className="flex-grow-1">
                            <p
                              className="mb-0 fw-bold text-truncate"
                              style={{ maxWidth: "150px" }}
                              title={item.title}
                            >
                              {item.title}
                            </p>
                            <div className="d-flex align-items-center mt-1">
                              {/* Nút Giảm */}
                              <button
                                className="btn btn-sm btn-outline-secondary p-0 px-1"
                                onClick={() =>
                                  updateQty(item.id, item.quantity, -1)
                                }
                              >
                                <IoRemoveOutline size={14} />
                              </button>
                              <span className="mx-2 small fw-bold">
                                {item.quantity}
                              </span>
                              {/* Nút Tăng */}
                              <button
                                className="btn btn-sm btn-outline-secondary p-0 px-1"
                                onClick={() =>
                                  updateQty(item.id, item.quantity, 1)
                                }
                              >
                                <IoAddOutline size={14} />
                              </button>
                            </div>
                            <small className="text-primary fw-bold mt-1 d-block">
                              {(item.price * item.quantity).toLocaleString()}đ
                            </small>
                          </div>
                          {/* Nút Xóa */}
                          <button
                            className="btn btn-sm text-danger ms-2 p-1"
                            onClick={() => removeItem(item.id)}
                          >
                            <IoTrashOutline size={18} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Tổng cộng:</span>
                      <span className="fw-bold fs-5 text-danger">
                        {totalPrice.toLocaleString()}đ
                      </span>
                    </div>

                    <div className="d-grid gap-2">
                      <Link to="/cart" className="btn btn-outline-primary">
                        Xem chi tiết giỏ hàng
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
