import { useState } from "react";
import axios from "axios";
import "./authPage.css";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("https://chatvibe-springboot-server.onrender.com/login", {
        username,
        secret,
      });
      const { data } = response;
      props.onAuth({ ...data, secret }); // NOTE: override secret
    } catch (error) {
      setError(error.response?.data ?? "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        {/* Login Form */}
        <form onSubmit={onLogin}>
          <div className="title">Login</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "LOG IN"}
          </button>
          {error && <p className="error-message">{error}</p>}

          <div className="navigation">
            <p>Don't have an account? <a href="#signup" onClick={() => props.handlePageChange("signup")}>Sign Up</a></p>
          </div>
        </form>
      </div>
      <footer className="footer">
        <p>Check manual <a href="https://drive.google.com/file/d/1EE50O4q2kDdVIpINuNCV8V3TITATj09b/view?usp=drive_link">here.</a></p>
      </footer>
    </div>
  );
};

const SignupPage = (props) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("https://chatvibe-springboot-server.onrender.com/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      });
      const { data } = response;
      props.onAuth({ ...data, secret }); // NOTE: override secret
    } catch (error) {
      setError(error.response?.data ?? "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        {/* Sign Up Form */}
        <form onSubmit={onSignup}>
          <div className="title">Sign Up</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "SIGN UP"}
          </button>
          {error && <p className="error-message">{error}</p>}

          <div className="navigation">
            <p>Already have an account? <a href="#login" onClick={() => props.handlePageChange("login")}>Sign In</a></p>
          </div>
        </form>
      </div>
      <footer className="footer">
        <p>Check manual <a href="https://drive.google.com/file/d/1EE50O4q2kDdVIpINuNCV8V3TITATj09b/view?usp=drive_link">here.</a></p>
      </footer>
    </div>
  );
};

const AuthPage = (props) => {
  const [currentPage, setCurrentPage] = useState("login");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === "login" && <LoginPage handlePageChange={handlePageChange} {...props} />}
      {currentPage === "signup" && <SignupPage handlePageChange={handlePageChange} {...props} />}
    </div>
  );
};

export default AuthPage;
