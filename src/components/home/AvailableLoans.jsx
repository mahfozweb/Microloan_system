import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { loans } from "../../data/loans";
import { FiArrowRight } from "react-icons/fi";

const AvailableLoans = () => {
  const displayedLoans = loans.slice(0, 4);

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedLoans.map((loan) => (
            <motion.div
              key={loan.id}
              variants={itemVariants}
              className={`rounded-2xl p-6 border ${loan.borderColor} hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${loan.color}`}
              >
                {loan.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {loan.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {loan.description}
              </p>

              <div className="space-y-2 mb-6">
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
              </div>

              <Link
                to={`/loans/${loan.id}`}
                className="block w-full py-3 text-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
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
