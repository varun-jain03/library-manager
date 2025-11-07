import { useMyBooksContext } from '../contexts/myBooksContext.jsx';

function BookCard({ id, title, author, coverImage }) {
  const { addToMyBooks } = useMyBooksContext();

  const addHandler = () => {
    addToMyBooks(id);
  };

  return (
    <div className="book-card">
      <img className="book-image" src={coverImage} alt={title} />
      <h1 className="book-title">{title}</h1>
      <p className="book-author">{author}</p>
      <button className="read-button" onClick={addHandler}>
        Want to Read
      </button>
    </div>
  );
}

export default BookCard;
