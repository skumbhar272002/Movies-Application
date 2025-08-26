import './App.css';
import React, {useState, useEffect} from 'react';
function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieList, setMovieList] = useState([]);

useEffect(() => {
  // Load from localStorage instead of API for GitHub Pages
  const savedMovies = localStorage.getItem('movieList');
  if (savedMovies) {
    setMovieList(JSON.parse(savedMovies));
  } else {
    // Set some sample data
    const sampleMovies = [
      { moviename: "The Shawshank Redemption", moviereview: "A powerful story of hope and friendship." },
      { moviename: "The Godfather", moviereview: "A masterpiece of cinema with outstanding performances." }
    ];
    setMovieList(sampleMovies);
    localStorage.setItem('movieList', JSON.stringify(sampleMovies));
  }
}, []);

  const submitMovieReview = (e) => {
    e.preventDefault();
    // Use localStorage instead of API for GitHub Pages
    const newMovie = { moviename: movieName, moviereview: movieReview };
    const updatedList = [...movieList, newMovie];
    setMovieList(updatedList);
    localStorage.setItem('movieList', JSON.stringify(updatedList));
    
    // Clear form
    setMovieName('');
    setMovieReview('');
  };

const editReview = (movieName) => {
  const updatedReview = document.getElementById("Edit Review").value;
  if (!updatedReview.trim()) return;
  
  // Use localStorage instead of API for GitHub Pages
  const updatedList = movieList.map((val) =>
    val.moviename === movieName ? { ...val, moviereview: updatedReview } : val
  );
  setMovieList(updatedList);
  localStorage.setItem('movieList', JSON.stringify(updatedList));
};

const deleteReview = (movieName) => {
  // Use localStorage instead of API for GitHub Pages
  const updatedList = movieList.filter((val) => val.moviename !== movieName);
  setMovieList(updatedList);
  localStorage.setItem('movieList', JSON.stringify(updatedList));
};

  return (
    <div className="App">
      <h1>Movie Application</h1>
      <form className='form' onSubmit={submitMovieReview}>
        <label>Movie Name: </label>
          <input type="text" placeholder="Movie Name" value={movieName}
          onChange={(e) => {setMovieName(e.target.value)}} />

        <label>Review:</label>
          <input type="text" placeholder="Review" value={movieReview}
          onChange={(e) => {setMovieReview(e.target.value)}} />
        <button type="submit">Submit</button>
        {movieList.map((val, key) => {
          return (
            <div className={"card"} key={key}>
              <h3>{val.moviename}</h3>
              <p>{val.moviereview}</p>
              <input type="text" id="Edit Review" />
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
