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
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border-2 ${
                  filter === category.id
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
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border ${loan.borderColor} hover:shadow-xl transition-all duration-300 flex flex-col group`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${loan.color}`}
                  >
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
                  <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Amount
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {loan.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Interest
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {loan.interest}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Duration
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {loan.duration}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {loan.available && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800">
                        Available Now
                      </span>
                    </div>
                  )}

                  {/* Apply Button */}
                  <Link
                    to={`/loans/${loan.id}`}
                    className="block w-full py-3 text-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-md shadow-primary-600/10 hover:shadow-primary-600/20 active:scale-95"
                  >
                    Apply Now
                  </Link>
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
