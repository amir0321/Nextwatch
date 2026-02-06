import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileOpen]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/movies', label: 'Movies' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/5 py-2'
                : 'bg-gradient-to-b from-black via-black/60 to-transparent py-4'
                }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <figure className="flex items-center gap-10">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <span className="relative">
                                <MovieIcon className="text-red-600 text-4xl group-hover:scale-[1.15] group-hover:rotate-3 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] z-10 relative" />
                                <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse-slow group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>
                            </span>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-red-600 via-rose-500 via-purple-500 to-red-600 bg-clip-text text-transparent uppercase tracking-[0.2em] drop-shadow-sm font-sans italic animate-text-shine">
                                NextWatch
                            </h1>
                        </NavLink>

                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-medium tracking-wide transition-colors duration-300 relative group py-2 
                                        drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isActive ? 'text-white font-bold' : 'text-gray-200 hover:text-white'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-full transform transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''}`} />
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </figure>

                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-4 text-white">
                            <Link to={'/movies'} className="hover:text-red-500 transition-colors duration-300 drop-shadow-md">
                                <SearchIcon sx={{ fontSize: 28 }} />
                            </Link>
                            <button className="hover:text-red-500 transition-colors duration-300 drop-shadow-md relative">
                                <NotificationsIcon sx={{ fontSize: 28 }} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                            </button>
                            <figure className="group relative cursor-pointer">
                                <span className="w-8 h-8 rounded bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20 group-hover:border-white transition-all">
                                    <PersonIcon sx={{ fontSize: 20 }} onClick={() => navigate('/favorites')} />
                                </span>
                            </figure>
                        </nav>

                        <button
                            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors drop-shadow-md cursor-pointer"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            <span
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setMobileOpen(false)}
                style={{ touchAction: 'none' }}
            />

            <aside
                className={`fixed top-0 right-0 h-screen w-72 bg-slate-950 border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl overflow-y-auto ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6 flex flex-col min-h-full bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white tracking-widest border-b-2 border-red-600 pb-1">MENU</h2>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-400 hover:text-white transition-transform hover:rotate-90 duration-300 cursor-pointer"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `text-lg font-medium px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${isActive
                                        ? 'bg-red-600/20 text-red-500 border-l-4 border-red-600 pl-3'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <footer className="mt-auto border-t border-white/10 pt-6">
                        <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors mb-4">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
                                <PersonIcon sx={{ fontSize: 18, color: 'white' }} />
                            </div>
                            <span className="font-medium">My Profile</span>
                        </div>
                    </footer>
                </div>
            </aside>
        </header>
    );
}

export default Header;