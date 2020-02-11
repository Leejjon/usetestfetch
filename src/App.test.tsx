import React from 'react';
import {fireEvent, render, waitForElement} from '@testing-library/react';
import App from './App';
import fetchMock from "fetch-mock";

describe('Test App', () => {
    test('Verify if books are retrieved on button click', async () => {
        const books = [
            {name: 'A Game of Thrones'},
            {name: 'A Clash of Kings'},
            {name: 'A Storm of Swords'},
            {name: 'The Hedge Knight'},
            {name: 'A Feast for Crows'},
            {name: 'The Sworn Sword'},
            {name: 'The Mystery Knight'},
            {name: 'A Dance with Dragons'},
            {name: 'The Princess and the Queen'},
            {name: 'The Rogue Prince'}
        ];
        fetchMock.mock('https://www.anapioficeandfire.com/api/books', {
            body: books,
            status: 200
        });

        // Render the App
        const {getByText} = render(<App/>);

        // Find the button to retrieve the books
        const button = getByText('Get GoT books');
        expect(button).toBeInTheDocument();

        // Actually click the button.
        fireEvent.click(button);

        // The above statement will result in an async action, so we need to wait a bit before the books will appear:
        const book1 = await waitForElement(
            () => getByText('1 A Game of Thrones')
        );
        expect(book1).toBeInTheDocument();
    });
});
