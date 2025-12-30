import { useState } from "react";
import { Paper, Typography, TextField, Button, CircularProgress, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../assets/css/AuthForm.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    setTimeout(() => {
      setLoading(false);

      if (!user) {
        setError("Sai tài khoản hoặc mật khẩu");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(user));

      navigate("/");
    }, 800);
  };

  return (
    <div className="auth-bg">
      <Paper className="auth-paper" elevation={3}>
        <Typography
          variant="h5"
          className="auth-title"
          align="center"
          mb={2}
        >
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Đăng nhập"}
          </Button>
        </form>

        <Typography mt={2} textAlign="center">
          Chưa có tài khoản?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </span>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;
