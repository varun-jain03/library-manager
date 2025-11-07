import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const loginHandler = (email, password) => {
    const payload = { email, password };

    return fetch("https://mern-library-backend-y70m.onrender.com/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
          setIsLogin(true);
          setUserEmail(email);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const registerHandler = async (email, password) => {
    const payload = { email, password };

    try {
      const res = await fetch('https://mern-library-backend-y70m.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        const data = await res.json();
        console.log('Registration successful:', data);
        return true;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, loginHandler, registerHandler, userEmail }} >
      {props.children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => {
  return useContext(LoginContext)
}