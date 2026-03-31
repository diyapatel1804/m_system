import { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/";

    } catch (error) {
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-bg">

      {/* 🔥 Animated circles */}
      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Mess Management System</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>

            {/* 👁️ Toggle */}
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
}

export default Login;