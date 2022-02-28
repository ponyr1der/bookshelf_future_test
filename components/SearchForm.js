import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import BookList from './BookList'

export default function SearchForm() {
    const [book, setBook] = useState('')
    const [category, setCategory] = useState('all')
    const [filter, setFilter] = useState('relevance')
    const apiKey = ('AIzaSyClxKjvYiWQKk7MFyVqld9eIrBUXmC1A2o')
    const [endpoint, setEndpoint] = useState('')
    const { data: books, isPending, error } = useFetch(endpoint)
    const [numberOfBooks, setNumberOfBooks] = useState(null)
    let paginationStep = 30

    const handleSubmit =  (e) => {
        e.preventDefault()
        setNumberOfBooks(numberOfBooks + paginationStep)
        setEndpoint('https://www.googleapis.com/books/v1/volumes?q=' + book + '&key=' + apiKey + '&maxResults=30&orderBy=' + filter)
        console.log(book, category, filter, books, numberOfBooks)
        
    }
    const handleLoadMore = (e) => {
        setNumberOfBooks(numberOfBooks + paginationStep)
        e.preventDefault()
        setEndpoint('https://www.googleapis.com/books/v1/volumes?q=' + book + '&startIndex=' + numberOfBooks + '&key=' + apiKey + '&maxResults=30&orderBy=' + filter)
        console.log(book, category, filter, books, numberOfBooks, endpoint)
    }

  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <h1 className='text-center text-light'>Bookshelf</h1>
            <div className="input-group">
            <input 
                type="text" 
                className="form-control" 
                laceholder="book's name" 
                onChange={(e) => setBook(e.target.value)}
                value={book}
            />
            <select 
                className="form-select"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
            >
                <option>All</option>
                <option>Art</option>
                <option>Biography</option>
                <option>Computers</option>
                <option>History</option>
                <option>Medical</option>
                <option>Poetry</option>
            </select>
            <select 
                className="form-select"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
            >
                <option>relevance</option>
                <option>newest</option>
            </select>
            <button 
                className="btn btn-outline-secondary" 
                type="submit"
            >Search
            </button>
            </div>
        </form>
        {isPending && <div className='text-light text-center mt-2'>Loading books...</div>}
        {error && <div className='text-light text-center mt-2'>{error}</div>}
        <div className='d-flex flex-column align-items-center'>
            <div className='row justify-content-center mt-3'>
                {books && <BookList books = {books}/>}
                {books && !isPending && <button className='btn btn-secondary m-3' onClick={handleLoadMore}>Load more...</button>}
                {books && isPending &&  <button className='btn btn-secondary m-3 disabled' onClick={handleLoadMore}>Load more...</button>}
            </div>
        </div>
    </div>
  )
}
