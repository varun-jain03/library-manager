import { Link, useNavigate } from "react-router-dom";
import { useLoginContext } from '../contexts/isLoginContext.jsx';
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isLogin, loginHandler } = useLoginContext();
	const navigate = useNavigate();


	return (
		<div className="auth-container">
			<h2 className="auth-heading">Login</h2>

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
					onClick={(e) => {
						e.preventDefault();
						loginHandler(email, password).then((success) => {
							if (success) {
								navigate('/');
							}
						});
					}}
				>
					Login
				</button>
			</form>


			<p className="auth-switch">
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}