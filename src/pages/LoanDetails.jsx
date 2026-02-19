import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiInfo } from "react-icons/fi";
import api from "../services/api";
import { getLoanVisuals } from "../utils/loanVisuals";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await api.get(`/loans/${id}`);
        setLoan(response.data);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Loan Not Found
          </h2>
          <Link
            to="/loans"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            &larr; Back to All Loans
          </Link>
        </div>
      </div>
    );
  }

  const visuals = getLoanVisuals(loan.category);

  return (
    <>
      <Helmet>
        <title>{loan.title} - LoanLink</title>
        <meta name="description" content={loan.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div
              className={`p-8 md:p-12 ${visuals.color} border-b ${visuals.borderColor}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700">
                    <img
                      src={loan.image || "https://via.placeholder.com/150"}
                      alt={loan.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1 p-1 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm">
                      {visuals.icon}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {loan.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Available Now
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Max Amount
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {loan.amount}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Loan Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {loan.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span>
                        Interest Rate:{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {loan.interest}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span>
                        Duration:{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {loan.duration}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span>No hidden fees or charges</span>
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span>Quick approval process</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Application Requirements
                  </h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold">
                          1
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Valid Identification
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          National ID card or Passport
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold">
                          2
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Proof of Income
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Recent bank statements or salary slips
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold">
                          3
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Active Bank Account
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          For fund disbursement and repayments
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/apply-loan/${loan._id}`)}
                    className="w-full py-4 text-white font-bold rounded-xl transition-all shadow-lg bg-primary-600 hover:bg-primary-700 shadow-primary-600/20 active:scale-95"
                  >
                    Proceed to Apply
                  </button>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center">
                    <FiInfo className="mr-1" /> Terms and conditions apply
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
