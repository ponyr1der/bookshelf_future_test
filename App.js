import './App.css';
import SearchForm from './components/SearchForm';
import Book from './pages/Book';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="container bg-dark pt-2 d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SearchForm /> } />
          <Route path='/books/:id' element={ <Book /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
