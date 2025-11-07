import { createContext, useContext, useState, useEffect } from "react";
import { useLoginContext } from './isLoginContext';

const myBooksContext = createContext();

export const MyBookProvider = (props) => {
	const [myBooks, setMyBooks] = useState([]);
	const { isLogin } = useLoginContext();

	const addToMyBooks = async (bookId) => {
		const token = localStorage.getItem("accessToken");

		if (!token) {
			alert("You must be logged in to add a book!");
			return;
		}

		try {
			const res = await fetch(`https://mern-library-backend-y70m.onrender.com/mybooks/${bookId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					status: "Want to Read",
					rating: 1
				})
			});

			const data = await res.json();

			if (!res.ok) {
				console.error("Backend Error:", data);
				throw new Error(data.msg || "Failed to add book.");
			}

			alert(data.msg || "Book added to My Books!");
		} catch (err) {
			console.error("Error adding book:", err);
			alert(err.message || "Something went wrong.");
		}
	};


	return (
		<myBooksContext.Provider value={{ myBooks, addToMyBooks }}>
			{props.children}
		</myBooksContext.Provider>
	);
};

export const useMyBooksContext = () => useContext(myBooksContext);
