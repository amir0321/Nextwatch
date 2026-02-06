import { useEffect, useState } from "react"
import { fetchAllMovies, searchMovies } from "../services/axios";
import { Link } from "react-router-dom";
import MoviesStatus from "../components/MoviesStatus";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadMovies(1);
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setPage(1)
                loadMovies(1);
            } else {
                liveSearch();
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const loadMovies = async (pageNum) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchAllMovies(pageNum);

            if (data?.results) {
                if (pageNum === 1) {
                    setMovies(data.results);
                } else {
                    setMovies(prev => {
                        const existingIds = new Set(prev.map(m => m.id));
                        const newMovies = data.results.filter(m => !existingIds.has(m.id));
                        return [...prev, ...newMovies];
                    });
                }
            }
        } catch (err) {
            setError("Ett fel uppstod vid hämtning av filmer.");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleShowMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(nextPage);
    };

    const liveSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchMovies(searchTerm);
            setMovies(data.results || []);
        } catch (error) {
            console.error('Error searching movies:', error);
            setError("Ett fel uppstod vid sökning av filmer.");
            setMovies([]);
        }
        setLoading(false);
    };

    return (
        <section className="min-h-screen bg-slate-950 text-white pb-20">
            <header className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden mb-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950"></div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600 mb-6 drop-shadow-2xl">
                        Explore Universe
                    </h1>
                    <p className="text-xl text-slate-300 font-light mb-8">
                        Discover thousands of movies, from timeless classics to the latest blockbusters.
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity"></span>
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="relative w-full py-4 px-8 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-red-500/50 transition-all shadow-xl"
                        />
                        <svg className="w-6 h-6 text-slate-400 absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6">

                <MoviesStatus
                    loading={loading}
                    error={error}
                    movies={movies}
                    searchTerm={searchTerm}
                />

                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <Link to={`/movie/${movie.id}`} className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-2 ring-1 ring-white/5 block h-full">
                                <figure className="aspect-[2/3] overflow-hidden h-full m-0">
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </figure>

                                <figcaption className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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

                {searchTerm === "" && (
                    <nav className="flex justify-center mt-20 mb-10">
                        <button
                            onClick={handleShowMore}
                            disabled={loading}
                            className="relative px-10 py-4 group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative flex items-center gap-3 bg-slate-950 border border-white/10 hover:border-white/20 px-8 py-3 rounded-full leading-none transition-all">
                                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 group-hover:to-red-400">
                                    {loading ? "Loading Universe..." : "Load More Movies"}
                                </span>
                            </span>
                        </button>
                    </nav>
                )}
            </section>
        </section >
    )
}

export default Movies
