// contexts/indexContext.jsx
import { BooksProvider } from './booksContext.jsx';
import { LoginProvider } from './isLoginContext.jsx';
import { MyBookProvider } from './myBooksContext.jsx';

export const CombinedProvider = ({ children }) => {
  return (
    <LoginProvider>
      <MyBookProvider>
        <BooksProvider>
          {children}
        </BooksProvider>
      </MyBookProvider>
    </LoginProvider>
  );
};