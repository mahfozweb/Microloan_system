import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | LoanLink</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-9xl font-bold gradient-text">404</h1>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                        <FiHome className="mr-2" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
