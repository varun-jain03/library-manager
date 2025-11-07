import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../contexts/isLoginContext.jsx';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerHandler } = useLoginContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // stops form auto-refresh
    const success = await registerHandler(email, password);
    console.log(success);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Register</h2>

      <form className="auth-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={ handleRegister }
        >
          Register
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
