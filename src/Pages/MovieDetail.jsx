import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/axios';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const data = await fetchMovieDetails(id);
            if (!data) {
                setError(true);
                setLoading(false);
                return;
            }
            setMovie(data);
            setLoading(false);
        };
        getDetails();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(stored);
    }, []);

    const toggleFavorite = (movie) => {
        setFavorites(prev => {
            const updated = prev.some(f => f.id === movie.id)
                ? prev.filter(f => f.id !== movie.id)
                : [...prev, movie];
            localStorage.setItem('favorites', JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = movie ? favorites.some(f => f.id === movie.id) : false;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Movie not found</h2>
                <Link to="/home" className="text-red-500 hover:text-red-400 font-semibold text-lg underline">Back to Home</Link>
            </div>
        );
    }

    const hours = Math.floor(movie?.runtime / 60);
    const minutes = movie?.runtime % 60;

    const trailer = movie?.videos?.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");

    return (
        <article className="min-h-screen bg-slate-950 text-white pb-20">
            <header className="relative h-[90vh] w-full">
                <figure className="absolute inset-0 m-0">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></span>
                </figure>

                <section className="absolute inset-0 w-full p-6 md:p-16 pt-32 md:pt-40 max-w-6xl z-10 flex flex-col justify-center">
                    <Link to="/movies" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors self-start bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/30">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to movies
                    </Link>

                    <h1 className="text-4xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4 leading-tight tracking-tight">
                        {movie.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-8 text-sm md:text-base font-medium">
                        <span className="bg-red-600/90 text-white px-3 py-1 rounded-md font-bold shadow-lg shadow-red-900/50">{movie.release_date?.split('-')[0]}</span>
                        <span className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                        </span>
                        <span className="text-slate-400">{hours}h {minutes}m</span>
                        <div className="hidden md:flex gap-2">
                            {movie.genres?.map(g => (
                                <span key={g.id} className="text-slate-300 bg-white/10 px-3 py-1 rounded-full text-xs hover:bg-white/20 transition-colors cursor-default">{g.name}</span>
                            ))}
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl drop-shadow-md mb-8 line-clamp-4 md:line-clamp-none">
                        {movie.overview}
                    </p>

                    <nav className="flex flex-wrap gap-4">
                        {trailer && (
                            <a
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-red-600/40 flex items-center gap-3 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
                                <span className="relative z-10">Watch Trailer</span>
                            </a>
                        )}
                        <button onClick={() => toggleFavorite(movie)} className="cursor-pointer px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-bold transition-all flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            {isFavorite ? "Remove from List" : "Add to List"}
                        </button>
                    </nav>
                </section>
            </header>

            <section className="max-w-7xl mx-auto px-6 md:px-16 mt-16 grid md:grid-cols-3 gap-12">
                <section className="md:col-span-2 space-y-12">
                    {movie.credits?.cast?.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-500 pl-4 tracking-wide">Top Cast</h3>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {movie.credits.cast.slice(0, 8).map(person => (
                                    <li key={person.id} className="text-center group cursor-pointer">
                                        <figure className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl group-hover:border-red-500 transition-all duration-300 group-hover:scale-105">
                                            <img
                                                src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://placehold.co/200x200?text=No+Img'}
                                                alt={person.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </figure>
                                        <p className="font-bold text-white text-base truncate group-hover:text-red-400 transition-colors">{person.name}</p>
                                        <p className="text-sm text-slate-400 truncate">{person.character}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>

                <aside className="space-y-8">
                    <section className="glass p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <span className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16"></span>

                        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Information
                        </h3>

                        <dl className="space-y-5 text-sm">
                            <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                <dt className="text-slate-400">Original Title</dt>
                                <dd className="font-medium text-white text-right max-w-[60%]">{movie.original_title}</dd>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <dt className="text-slate-400">Status</dt>
                                <dd className="font-medium text-white bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs uppercase tracking-wider">{movie.status}</dd>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <dt className="text-slate-400">Budget</dt>
                                <dd className="font-medium text-white">${movie.budget?.toLocaleString()}</dd>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <dt className="text-slate-400">Revenue</dt>
                                <dd className="font-medium text-white">${movie.revenue?.toLocaleString()}</dd>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <dt className="text-slate-400">Language</dt>
                                <dd className="font-medium text-white uppercase">{movie.original_language}</dd>
                            </div>
                        </dl>
                    </section>

                    {movie.keywords?.keywords?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold mb-4 text-slate-300">Topics</h3>
                            <ul className="flex flex-wrap gap-2">
                                {movie.keywords.keywords.map(kw => (
                                    <li key={kw.id} className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-default border border-slate-700 hover:border-slate-600">
                                        #{kw.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>
            </section>
        </article>
    );
}

export default MovieDetail;