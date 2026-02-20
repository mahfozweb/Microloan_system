import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import LoanCard from "../components/shared/LoanCard";

const AllLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const url = filter === "all" ? '/loans' : `/loans?category=${filter}`;
                const response = await api.get(url);
                setLoans(response.data);
            } catch (error) {
                console.error("Error fetching all loans:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, [filter]);

    const categories = [
        { id: "all", label: "All Loans" },
        { id: "personal", label: "Personal" },
        { id: "business", label: "Business" },
        { id: "education", label: "Education" },
        { id: "renovation", label: "Renovation" },
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

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence mode="popLayout">
                                {loans.map((loan) => (
                                    <LoanCard key={loan._id} loan={loan} variants={itemVariants} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!loading && loans.length === 0 && (
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
