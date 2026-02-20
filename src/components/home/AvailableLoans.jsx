import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { FiArrowRight } from "react-icons/fi";
import LoadingSpinner from "../shared/LoadingSpinner";
import LoanCard from "../shared/LoanCard";

const AvailableLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get('/loans?home=true');
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching home loans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Loan Options
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our most popular loan products designed to help you achieve your goals.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} variants={itemVariants} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/loans"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300"
          >
            View All Loans <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AvailableLoans;
