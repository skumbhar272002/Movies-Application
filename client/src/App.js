import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

useEffect(() => {
  Axios.get('http://localhost:3001/api/get').then((response) => {
    setMovieList(response.data);
  });
}, []);

  const submitMovieReview = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: movieReview,
    }).then(() => {
      setMovieList([...movieList, 
        {moviename: movieName, moviereview: movieReview}]);
    });
  };

const editReview = (movieName) => {
  const newReview = document.getElementById("Edit Review").value;
  Axios.put(`http://localhost:3001/api/update`, {
    movieName,
    movieReview: newReview,
  }).then(() => {
    setMovieList(
      movieList.map((val) =>
        val.moviename === movieName ? { ...val, moviereview: newReview } : val
      )
    );
  });

};

const deleteReview = (movieName) => {
  Axios.delete(`http://localhost:3001/api/delete`, { data: { movieName } }).then(() => {
    setMovieList(movieList.filter((val) => val.moviename !== movieName));
  });
  setNewReview('');
};

  return (
    <div className="App">
      <h1>Movie Application</h1>
      <form className='form'onSubmit={submitMovieReview}>
        <label>Movie Name: </label>
          <input type="text" placeholder="Movie Name" 
          onChange={(e) => {setMovieName(e.target.value)}} />

        <label>Review:</label>
          <input type="text" placeholder="Review" 
          onChange={(e) => {setMovieReview(e.target.value)}} />
        <button type="button" onClick={submitMovieReview}>Submit</button>
        {movieList.map((val, key) => {
          return (
            <div className={"card"} key={key}>
              <h3>{val.moviename}</h3>
              <p>{val.moviereview}</p>
              <input type="text" id="Edit Review" onChange={(e) => setNewReview(e.target.value)} />
              <button onClick={() => editReview(val.moviename)}>Edit</button>
              <button onClick={() => deleteReview(val.moviename)}>Delete</button>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default App;
