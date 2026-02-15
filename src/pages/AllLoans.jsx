import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { loans } from "../data/loans";

const AllLoans = () => {
    const [filter, setFilter] = useState("all");

    const filteredLoans =
        filter === "all" ? loans : loans.filter((loan) => loan.category === filter);

    const categories = [
        { id: "all", label: "All Loans" },
        { id: "personal", label: "Personal" },
        { id: "business", label: "Business" },
        { id: "education", label: "Education" },
    ];

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
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    return (
        <>
            <Helmet>
                <title>All Loans - LoanLink</title>
                <meta
                    name="description"
                    content="Browse all available loan options on LoanLink"
                />
            </Helmet>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                        >
                            All Available Loans
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        >
                            Explore our comprehensive range of loan options designed to meet
                            your financial needs.
                        </motion.p>
                    </div>

                    {/* Filters */}
                    <div className="mb-12 flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setFilter(category.id)}
                                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border-2 ${filter === category.id
                                        ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/25 scale-105"
                                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-200 dark:hover:border-primary-900"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Loans Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredLoans.map((loan) => (
                                <motion.div
                                    layout
                                    key={loan.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border ${loan.borderColor} hover:shadow-2xl transition-all duration-500 flex flex-col group`}
                                >
                                    {/* Image Header */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={loan.image}
                                            alt={loan.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110 duration-300 ${loan.color}`}>
                                            {loan.icon}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                            {loan.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                                            {loan.description}
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-3 mb-6 bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    Amount
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {loan.amount}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    Interest
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-white text-primary-600">
                                                    {loan.interest}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    Duration
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {loan.duration}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        {loan.available && (
                                            <div className="mb-6 flex">
                                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800/50">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                                                    Available Now
                                                </span>
                                            </div>
                                        )}

                                        {/* Apply Button */}
                                        <Link
                                            to={`/loans/${loan.id}`}
                                            className="block w-full py-4 text-center rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 active:scale-[0.98] transform group-hover:-translate-y-1"
                                        >
                                            Apply Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredLoans.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500 dark:text-gray-400">
                                No loans found in this category.
                            </p>
                        </div>
                    )}

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                            Our advisors are here to help you find the perfect financial
                            solution tailored to your specific goals.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-600/20 hover:-translate-y-1"
                        >
                            Talk to an Expert
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AllLoans;
