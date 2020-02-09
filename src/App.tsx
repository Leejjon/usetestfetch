import React, {useState} from 'react';

interface Book {
    name: string
}

const App = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const fetchBooks = async () => {
        const response: Response = await fetch(
            'https://www.anapioficeandfire.com/api/books',
            {headers: {'Content-Type': 'application/json'}, method: "GET"});
        setBooks(await response.json());
    };

    return (
        <div className="App">
            <button onClick={fetchBooks}>Get GoT books</button>
            {books.map((book, index) => {
                const indexToDisplay = index += 1;
                return <div key={`book${index}`}>{indexToDisplay}&nbsp;{book.name}</div>
            })}
        </div>
    );
};

export default App;
