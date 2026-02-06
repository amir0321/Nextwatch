import { Link } from "react-router-dom";

function About() {
    return (
        <section className="min-h-screen bg-slate-950 text-white pb-20">
            <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-slate-950 to-slate-950 z-0"></div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 drop-shadow-lg">
                        About NextWatch
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        NextWatch is a movie streaming platform that allows users to watch movies and TV shows online.
                    </p>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 -mt-20 relative z-20">
                <article className="glass p-8 rounded-2xl border border-white/10 hover:border-red-500/30 transition-colors duration-300">
                    <h2 className="text-3xl font-bold mb-4 text-red-500">Our Mission</h2>
                    <p className="text-slate-300 leading-relaxed text-lg">
                        At NextWatch we strive to deliver the most seamless and engaging platform for exploring the world of movies.
                        We combine modern web technology with a passion for storytelling.
                    </p>
                </article>

                <article className="glass p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors duration-300">
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">Technologi</h2>
                    <p className="text-slate-300 mb-6">
                        Built with the latest tools for speed and performance.
                    </p>
                    <ul className="grid grid-cols-2 gap-4">
                        <li className="flex items-center space-x-2 text-slate-200">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>React & Vite</span>
                        </li>
                        <li className="flex items-center space-x-2 text-slate-200">
                            <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                            <span>Tailwind CSS</span>
                        </li>
                        <li className="flex items-center space-x-2 text-slate-200">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            <span>TMDB API</span>
                        </li>
                        <li className="flex items-center space-x-2 text-slate-200">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span>Framer Motion</span>
                        </li>
                    </ul>
                </article>
            </section>
            <section className="max-w-4xl mx-auto mt-20 px-6 text-center">
                <h2 className="text-3xl font-bold mb-8 text-white">Contact Us</h2>
                <aside className="glass p-10 rounded-2xl border border-white/5 inline-block w-full">
                    <p className="text-xl text-slate-300 mb-6">
                        Have questions or suggestions? We would love to hear from you.
                    </p>
                    <Link to="/contact" className="cursor-pointer px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-1">
                        Contact Us
                    </Link>
                </aside>
            </section>

        </section>
    );
}

export default About;