import axios from 'axios';

const apiKey = '95f0473db1c299ac66b0270406bf56d7';

const getMovies = (page: number, sortBy: string) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/movie/${sortBy}?api_key=${apiKey}&page=${page}`);
    return response;
  } catch (error) {
    return null;
  }
};

const getMovie = (id: number) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    return response;
  } catch (error) {
    return null;
  }
};

const getCredits = (id: number) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
    return response;
  } catch (error) {
    return null;
  }
}

export {
  getMovies,
  getMovie,
  getCredits,
};
