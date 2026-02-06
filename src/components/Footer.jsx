function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent uppercase tracking-wider mb-2">
                            NextWatch
                        </h2>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Your premium destination for the latest movies and TV shows.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <nav className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Help</a>
                        </nav>
                        <p className="text-gray-600 text-xs">
                            © {new Date().getFullYear()} NextWatch. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
