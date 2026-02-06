import axios from 'axios';

export const fetchPopularMovies = async () => {
    const popularMovies = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {
            language: 'en-US',
            page: '1'
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };
    try {
        const response = await axios.request(popularMovies);
        return response.data;
    } catch (error) {
        console.error('Något gick fel vid hämtning av populära filmer:', error);
    }
};

export const fetchUpcomingMovies = async () => {
    const upcomingMovies = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        params: {
            language: 'en-US',
            page: '1'
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };
    try {
        const response = await axios.request(upcomingMovies);
        return response.data;
    } catch (error) {
        console.error('Något gick fel vid hämtning av kommande filmer:', error);
    }
};

export const fetchAllMovies = async (page = 1) => {
    const allMovies = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            include_adult: 'false',
            include_video: 'false',
            language: 'en-US',
            page: page.toString(),
            sort_by: 'popularity.desc'
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };
    try {
        const response = await axios.request(allMovies);
        return response.data;
    } catch (error) {
        console.error('Något gick fel vid hämtning av alla filmer:', error);
    }
};

export const searchMovies = async (query, page = 1) => {
    if (!query) return { results: [] };

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
            query: query,
            language: 'en-US',
            page: page.toString(),
            include_adult: 'false'
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Något gick fel vid sökning av filmer:', error);
        return { results: [] };
    }
};


export const fetchMovieDetails = async (id) => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: {
            language: 'en-US',
            append_to_response: 'videos,credits,keywords'
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching details:', error);
    }
};