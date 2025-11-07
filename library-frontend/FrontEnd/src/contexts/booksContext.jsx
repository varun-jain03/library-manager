import { createContext, useContext, useState } from "react";

const BooksContext = createContext();

export const BooksProvider = (props) => {
    const [ books, setBooks ] = useState([]);
    
    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            {props.children}
        </BooksContext.Provider>
    )
}

export const useBooksContext = () => {
    return useContext(BooksContext);
}

