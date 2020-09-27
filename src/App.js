import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/get-books', { query })
      .then(success => {
        console.log({ success });
        setBooks(success.data.data.items)
      })
      .catch(error => {
        console.log({ error })
      })
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>Search Book Application</h1>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search Book" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </form>
      <div className="mt-4 ml-6 card-wrapper">
        {books.length >= 0 ? books.map((item) => (
          <div class="card mt-3" style={{ width: '70%' }}>
            <div class="card-body">
              <h5 class="card-title">{item.volumeInfo.title}</h5>
              <div className="card-item">
                <div>Authors :</div>
                <div> {item.volumeInfo.authors ? item.volumeInfo.authors.length > 1 ? item.volumeInfo.authors.map((tag, i) => <span key={i}>{i > 0 && ", "} {tag}</span>) : item.volumeInfo.authors[0] : null}</div>
              </div>
              <div className="card-item">
                <div>Page Count :</div>
                <div> {item.volumeInfo.pageCount}</div>
              </div>
              <div className="card-item">
                <div>publisher :</div>
                <div> {item.volumeInfo.publisher}</div>
              </div>
              <div className="card-item">
                <div>Average Rating :</div>
                <div> {item.volumeInfo.averageRating ? item.volumeInfo.averageRating : 0}</div>
              </div>
              <div className="card-item">
                <div>Ratings Count :</div>
                <div> {item.volumeInfo.ratingsCount ? item.volumeInfo.ratingsCount : 0}</div>
              </div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
}

export default App;
