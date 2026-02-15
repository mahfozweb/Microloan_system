import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { loans } from '../data/loans';

const AllLoans = () => {


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <>
            <Helmet>
                <title>All Loans - LoanLink</title>
                <meta name="description" content="Browse all available loan options on LoanLink" />
            </Helmet>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            All Available Loans
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore our comprehensive range of loan options designed to meet your financial needs.
                        </p>
                    </div>

                    {/* Filters (Static for now) */}
                    <div className="mb-8 flex flex-wrap gap-4 justify-center">
                        <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                            All Loans
                        </button>
                        <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                            Personal
                        </button>
                        <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                            Business
                        </button>
                        <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                            Education
                        </button>
                    </div>

                    {/* Loans Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {loans.map((loan) => (
                            <motion.div
                                key={loan.id}
                                variants={itemVariants}
                                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border ${loan.borderColor} hover:shadow-lg transition-all duration-300 flex flex-col`}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${loan.color}`}>
                                    {loan.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {loan.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                                    {loan.description}
                                </p>

                                {/* Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Amount</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{loan.amount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Interest</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{loan.interest}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Duration</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">{loan.duration}</span>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                {loan.available && (
                                    <div className="mb-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            Available Now
                                        </span>
                                    </div>
                                )}

                                {/* Apply Button */}
                                <Link
                                    to={`/loans/${loan.id}`}
                                    className="block w-full py-3 text-center rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
                                >
                                    Apply Now
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Contact our team to discuss custom loan options tailored to your specific needs.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllLoans;
