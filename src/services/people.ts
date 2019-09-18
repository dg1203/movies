import axios from 'axios';

const apiKey = '95f0473db1c299ac66b0270406bf56d7';

const getPeople = (page: number, sortBy: string) => {
  try {
    const response = axios.get(`http://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`);
    return response;
  } catch (error) {
    return null;
  }
};

const getPerson = (id: number) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`);
    return response;
  } catch (error) {
    return null;
  }
};

const getCredits = (id: number) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`);
    return response;
  } catch (error) {
    return null;
  }
}

export {
  getPeople,
  getPerson,
  getCredits,
};
