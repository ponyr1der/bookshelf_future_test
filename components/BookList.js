import React from 'react'
import { Link } from 'react-router-dom'

export default function BookList({ books }) {

  return (
    <>
        {books.items && books.items.map(book => (
            <div key={book.id} className="card m-3 rounded" style={{width: '18rem'}}>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="book's thumbnail" />
                <div className="card-body d-flex align-items-end flex-row">
                    <div>
                        <h5 className="card-title">{book.volumeInfo.title}</h5>
                        <p className="card-text">{book.volumeInfo.authors}, {book.volumeInfo.categories}</p>
                        <Link to={`/books/${book.id}`} className='btn btn-outline-secondary' >Read more...</Link>
                    </div>
                </div>
          </div>
        ))}
    </>
  )
}
