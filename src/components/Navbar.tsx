import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Dog, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
                                <Dog className="text-orange-500" /> VC Dog Show
                            </span>
                        </Link>
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                                <Link to="/dogs" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Dogs</Link>
                                <Link to="/competitions" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Competitions</Link>
                                <Link to="/apply" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Apply</Link>
                                <Link to="/pricing" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/profile" className="text-gray-800 hover:text-orange-500 p-1 rounded-full">
                                        <User className="w-6 h-6" />
                                    </Link>
                                    <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">Log In</Link>
                                    <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-md transition-all">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-orange-500 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/dogs" className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Dogs</Link>
                        <Link to="/competitions" className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Competitions</Link>
                        <Link to="/apply" className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Apply</Link>
                        <Link to="/pricing" className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Log Out</button>
                            </>
                        ) : (
                            <div className="mt-4 flex flex-col gap-2 p-2">
                                <Link to="/login" className="block text-center px-4 py-2 text-base font-medium text-orange-600 bg-orange-50 rounded-lg">Log In</Link>
                                <Link to="/register" className="block text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
