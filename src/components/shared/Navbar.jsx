import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser, FiGrid, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setDropdownOpen(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Loans', path: '/loans' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold font-heading gradient-text"
                        >
                            LoanLink
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors duration-200 ${isActive(link.path)
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <ThemeToggle />

                        {user ? (
                            <div className="flex items-center space-x-3">
                                {/* Dashboard Button */}
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
                                >
                                    <FiGrid className="w-4 h-4" />
                                    Dashboard
                                </Link>

                                {/* User Avatar Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-primary-400 transition-all"
                                    >
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0284c7&color=fff`}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full border-2 border-primary-500 object-cover"
                                        />
                                        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium rounded-full capitalize">
                                                        {user.role}
                                                    </span>
                                                </div>
                                                <div className="py-1">
                                                    <Link
                                                        to="/dashboard"
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <FiGrid className="w-4 h-4" />
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        to={user.role === 'borrower' ? '/dashboard/borrower-profile' : '/dashboard/manager-profile'}
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <FiUser className="w-4 h-4" />
                                                        My Profile
                                                    </Link>
                                                </div>
                                                <div className="py-1 border-t border-gray-100 dark:border-gray-700">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <FiLogOut className="w-4 h-4" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <ThemeToggle />
                        {user && (
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <FiGrid className="w-3.5 h-3.5" />
                                Dashboard
                            </Link>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block font-medium transition-colors duration-200 py-1 ${isActive(link.path)
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0284c7&color=fff`}
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full border-2 border-primary-500 object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                                            <span className="text-xs text-primary-600 dark:text-primary-400 capitalize">{user.role}</span>
                                        </div>
                                    </div>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-center justify-center"
                                    >
                                        <FiGrid className="w-4 h-4" />
                                        Go to Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                                    >
                                        <FiLogOut />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
