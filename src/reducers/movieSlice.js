import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tmdb from '../services/api';

const initialState = {
    spotLight: null,
    populars: [],
    moviesByGenre: null,
};

export const moviesAsync = createAsyncThunk(
    'movie/fetchMovies',
    async () => {
        const response = await tmdb('/movie/popular');
        const genres = await tmdb('/genre/movie/list');
        const movies = response.data.results.map(movie => {
            return {
                ...movie,
                genres: movie.genre_ids.map(id => {
                    return genres.data.genres.find(genre => genre.id === id);
                }),
            };
        });
        const moviesByGenre = {};
        // pick random genres
        const randomGenres = genres.data.genres.sort(() => Math.random() - 0.5).slice(0, 3);
        // fetch movies by genre
        for (const genre of randomGenres) {
            const response = await tmdb('/discover/movie', {
                params: {
                    with_genres: genre.id,
                },
            });
            moviesByGenre[genre.name] = response.data.results.map(movie => ({
                ...movie,
                genres: movie.genre_ids.map(id => {
                    return genres.data.genres.find(genre => genre.id === id);
                }),
            }));
        }
        return { movies, moviesByGenre };
    }
);

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setSpotLight: (state, action) => {
            state.spotLight = action.payload;
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(moviesAsync.fulfilled, (state, action) => {
                const { movies, moviesByGenre } = action.payload;
                console.log(moviesByGenre);
                state.populars = movies;
                state.spotLight = movies[Math.floor(Math.random() * movies.length)];
                state.moviesByGenre = moviesByGenre;
            })
            .addCase(moviesAsync.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(moviesAsync.pending, (state, action) => {
                console.log('pending');
            });
    }
});

export const { setSpotLight, setMovies } = movieSlice.actions;

// selector 
export const selectSpotLight = state => state.movie.spotLight;
export const selectPopularMovies = state => state.movie.populars;
export const selectMoviesByGenre = state => state.movie.moviesByGenre;


export default movieSlice.reducer;