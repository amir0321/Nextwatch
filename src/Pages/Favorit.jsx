import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorit() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (e, id) => {
        e.preventDefault();
        const updatedFavorites = favorites.filter(movie => movie.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <section className="min-h-screen bg-slate-950 text-white pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 border-l-4 border-red-600 pl-4">My Favorites</h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl text-slate-400 mb-4">No favorites yet</h2>
                        <p className="text-slate-500 mb-8">Start adding movies to your list!</p>
                        <Link to="/movies" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-bold">
                            Explore Movies
                        </Link>
                    </div>
                ) : (
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                        {favorites.map((movie) => (
                            <li key={movie.id}>
                                <Link to={`/movie/${movie.id}`} className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-2 ring-1 ring-white/5 block h-full">
                                    <figure className="aspect-[2/3] overflow-hidden relative m-0">
                                        <img
                                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
                                            alt={movie.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <button
                                            onClick={(e) => removeFavorite(e, movie.id)}
                                            className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10"
                                            title="Remove from favorites"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </figure>

                                    <figcaption className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                                        <h3 className="text-white font-bold text-center drop-shadow-md mb-1 text-sm md:text-base leading-tight">
                                            {movie.title}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 text-xs text-gray-300">
                                            <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            <span className="flex items-center text-yellow-400">
                                                ★ {movie.vote_average?.toFixed(1)}
                                            </span>
                                        </div>
                                    </figcaption>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Favorit;
