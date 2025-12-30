import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../assets/css/AuthForm.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    repassword: "",
    email: "",
    phone: "",
    displayName: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.repassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.username === form.username);

    if (exists) {
      setError("Tên đăng nhập đã tồn tại");
      return;
    }

    users.push({
      username: form.username,
      password: form.password,
      email: form.email,
      phone: form.phone,
      displayName: form.displayName
    });

    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="auth-bg">
      <Paper className="auth-paper">
        <Typography variant="h5" className="auth-title" align="center" mb={2}>
          Đăng ký
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField 
          label="Tên đăng nhập" 
          name="username" 
          fullWidth margin="normal" 
          onChange={handleChange} 
          required />
          <TextField 
          label="Tên hiển thị" 
          name="displayName" 
          fullWidth margin="normal" 
          onChange={handleChange} 
          required />
          <TextField 
          label="Email" 
          name="email" 
          fullWidth margin="normal" 
          onChange={handleChange} />
          <TextField 
          label="Số điện thoại" 
          name="phone" 
          fullWidth margin="normal" 
          onChange={handleChange} />

          <TextField 
          label="Mật khẩu" type="password" 
          name="password" 
          fullWidth margin="normal" 
          onChange={handleChange} 
          required />
          <TextField 
          label="Nhập lại mật khẩu" type="password" 
          name="repassword" 
          fullWidth margin="normal" 
          onChange={handleChange} 
          required />

          {error && <Typography color="error">{error}</Typography>}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Đăng ký
          </Button>
        </form>

        <Typography mt={2} textAlign="center">
          Đã có tài khoản?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Đăng nhập
          </span>
        </Typography>
      </Paper>
    </div>
  );
};

export default Register;
