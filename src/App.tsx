import React, {useState} from 'react';

interface Book {
    name: string
}

const App = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [books, setBooks] = useState<Book[]>([]);
    const fetchBooks = async () => {
        try {
            const response: Response = await fetch(
                'https://www.anapioficeandfire.com/api/books',
                {headers: {'Content-Type': 'application/json'}, method: "GET"});
            setBooks(await response.json());
            setErrorMessage(undefined);
        } catch (cause) {
            setErrorMessage('We were unable not retrieve any books due to connection problems. Please check your internet connection.');
        }
    };

    const displayBooks = () => {
        return (
            <div>
                {books.map((book, index) => {
                        const indexToDisplay = index += 1;
                        return <div key={`book${index}`}>{indexToDisplay}&nbsp;{book.name}</div>
                })}
            </div>
        );
    };

    return (
        <div className="App">
            <button onClick={fetchBooks}>Get GoT books</button>
            {errorMessage ? <p>Error: {errorMessage}</p> : displayBooks()}
        </div>
    );
};

export default App;
