import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export default function Book() {
    const { id } = useParams()
    const endpoint  = 'https://www.googleapis.com/books/v1/volumes/' + id
    const { data: book, isPending, error } = useFetch(endpoint)
    const navigate = useNavigate()


    const handleClick = (e) => {
        e.preventDefault()
        navigate('/')
    }
    
  return (
    <div className='mt-3 d-flex flex-column align-items-center'>
        {book && <button onClick={handleClick} type="button" className="btn-close btn-close-white mb-4" aria-label="Close"></button>}
        {error && <div className='text-light text-center mt-2'>{error}</div>}
        {isPending && <div className='text-light text-center mt-2'>Loading book...</div>}
        {book && 
            <div className='container d-flex justify-content-center'>
                <div className='row flex-row justify-content-center'>
                    <div className='col d-flex justify-content-center'>
                        <img src={book.volumeInfo.imageLinks.small} alt="book's thumbnail" />
                    </div>
                    <div className='col text-light'>
                        <h2><b>{book.volumeInfo.title}</b></h2>
                        <p>{book.volumeInfo.categories}</p>
                        {book.volumeInfo.authors.map(author => (
                            <p key={author} className='text-secondary m-0'>{author}</p>
                        ))}
                        <div className='mt-3'>{book.volumeInfo.description}</div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
