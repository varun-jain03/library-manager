import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import './App.css'
import { useEffect, useState } from "react";
import { useLoginContext } from './contexts/isLoginContext.jsx';
import Home from './pages/homePage.jsx';
import Login from './pages/loginPage.jsx';
import Register from './pages/registerPage.jsx';
import MyBook from './pages/mybookPage.jsx';

function MainNav() {
  const { isLogin, setIsLogin, userEmail } = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLogin(!!token);
  }, []);

  return (
    <nav className="main-nav">
      <h2 className="logo">My Library</h2>

      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        {isLogin && (
          <>
            <Link className="nav-link" to="/myBooks">My Books</Link>
            <button
              className="logout-BTN"
              onClick={() => {
                localStorage.clear();
                setIsLogin(false);
                navigate('/');
              }}
            >Logout</button>
            <span className="user-email">{userEmail}</span>
          </>
        )}
        {!isLogin && (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <MainNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myBooks' element={<MyBook />} />

      </Routes>
    </Router>
  );
}

export default App;