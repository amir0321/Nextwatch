import { useState, useEffect } from 'react';
import { fetchPopularMovies, fetchUpcomingMovies } from "../services/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchPopularMovies();
            try {
                if (data && data.results) {
                    setPopularMovies(data.results);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        getMovies();
    }, []);

    useEffect(() => {
        const getUpcomingMovies = async () => {
            const data = await fetchUpcomingMovies();
            try {
                if (data && data.results) {
                    setUpcomingMovies(data.results);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        getUpcomingMovies();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1824 },
            items: 8,
        },
        desktop: {
            breakpoint: { max: 1824, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    }

    const CustomLeftArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-0 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl shadow-lg"
        >
            {"<"}
        </button>
    );

    const CustomRightArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-0 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white text-2xl shadow-lg"
        >
            {">"}
        </button>
    );

    return (
        <div className="flex flex-col gap-10 pb-20">
            <section className="relative h-[80vh] w-full bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg max-w-4xl">
                        Unlimited movies, TV shows, and more
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl drop-shadow-md">
                        Watch anywhere. Cancel anytime. Start your membership today.
                    </p>
                    <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors text-lg shadow-lg cursor-pointer">
                        Get Started
                    </button>
                </div>
            </section>

            <section className="px-8 md:px-16">
                <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-red-600 pl-4">Trending Now</h2>
                {error && <div className="text-center py-4">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>}
                <Carousel responsive={responsive} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />} containerClass="pb-10">
                    {popularMovies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-2 ring-1 ring-white/5 block mx-2 h-full">
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
                    ))}
                </Carousel>
            </section>

            <section className="px-8 md:px-16">
                <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-red-600 pl-4">Upcoming Movies</h2>
                {error && <div className="text-center py-4">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>}
                <Carousel responsive={responsive} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />}>
                    {upcomingMovies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-2 ring-1 ring-white/5 block mx-2 h-full">
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
                    ))}
                </Carousel>
            </section>
        </div>
    )
};

export default Home;
