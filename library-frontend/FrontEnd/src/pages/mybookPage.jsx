import { useEffect, useState } from "react";

export default function MyBook() {
  const [mybooksList, setMybooksList] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const res = await fetch('https://mern-library-backend-y70m.onrender.com/mybooks', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        setMybooksList(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
  }, [mybooksList]);

  const removeHandler = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`https://mern-library-backend-y70m.onrender.com/mybooks/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMybooksList((prevList) =>
          prevList.filter((book) => book.bookId._id !== id)
        );
      }
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className="books-page">
      <h1 className="page-heading">My Books</h1>
      <div className="book-grid">
        {mybooksList.map((book) => {
          return (
            <div key={book?.bookId?._id} className="book-card">
              <img
                className="book-image"
                src={book.bookId.coverImage || "https://via.placeholder.com/150"}
                alt={book.bookId.title || "No title"}
              />
              <h1 className="book-title">{book.bookId.title}</h1>
              <p className="book-author">by {book.bookId.author}</p>
              <p className="book-status">Status: {book.status}</p>
              <p className="book-rating">⭐ {book.rating}</p>
              <div>
                <button
                  className="logout-BTN"
                  onClick={() => removeHandler(book.bookId._id)}
                >remove</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
