import { useEffect, useState } from "react";
import BookCard from '../components/bookComponent.jsx';
import { useBooksContext } from "../contexts/booksContext.jsx";

function Home() {
    const { books, setBooks } = useBooksContext();

    useEffect(() => {
        fetch('https://mern-library-backend-y70m.onrender.com/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data.BOOKS)
                console.log(data)})
            .catch((error) => console.log(error))
    }, [])

    return (
    <div className="books-page">
      <h1 className="page-heading">These are all the books</h1>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard
            key={book._id}
            id={book._id}
            title={book.title}
            author={book.author}
            coverImage={book.coverImage}
          />
        ))}
      </div>
    </div>
    )
}

export default Home;