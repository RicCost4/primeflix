import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3
// URL da API: /movie/now_playing?api_key=d56495d53211e7a06da01032716281e8&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;