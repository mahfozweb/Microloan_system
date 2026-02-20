import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { getLoanVisuals } from "../../utils/loanVisuals";
import { FiArrowRight } from "react-icons/fi";
import LoadingSpinner from "../shared/LoadingSpinner";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loans Tailored for You
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect loan option that fits your financial goals and
            needs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loans.map((loan) => {
            const visuals = getLoanVisuals(loan.category);
            return (
              <motion.div
                key={loan._id}
                variants={itemVariants}
                className={`rounded-3xl overflow-hidden border ${visuals.borderColor} hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 flex flex-col group`}
              >
                <div className={`relative h-28 flex items-center justify-center ${visuals.color} border-b ${visuals.borderColor}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110 duration-300 bg-white/50 dark:bg-gray-800/50">
                    {visuals.icon}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {loan.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 min-h-[2.5rem]">
                    {loan.description}
                  </p>

                  <div className="space-y-2 mb-6 bg-gray-50/50 dark:bg-gray-900/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Amount</span>
                      <span className="font-bold text-gray-900 dark:text-white">{loan.amount}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Interest</span>
                      <span className="font-bold text-primary-600">{loan.interest}</span>
                    </div>
                  </div>

                  <Link
                    to={`/loans/${loan._id}`}
                    className="mt-auto block w-full py-3 text-center rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm hover:shadow-primary-600/20 active:scale-95"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            );
          })}
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
