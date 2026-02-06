function MoviesStatus({ loading, error, movies, searchTerm }) {
    if (loading) {
        return (
            <div className="text-center py-10 text-slate-400">
                Searching movies...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="text-center text-slate-500 py-20 text-xl">
                No movies found matching "{searchTerm}"
            </div>
        );
    }

    return null;
}

export default MoviesStatus;
