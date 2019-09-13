import axios from 'axios';

const api_key = '95f0473db1c299ac66b0270406bf56d7';

const getMovies = (page: number) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`);
    return response;
  } catch(error) {
    return null;
  }
}

const getMovie = (id: number) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
    return response;
  } catch(error) {
    return null;
  }
}

export {
  getMovies,
  getMovie
}