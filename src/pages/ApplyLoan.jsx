import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiSend,
  FiFileText,
  FiDollarSign,
  FiUser,
  FiPhone,
  FiHome,
  FiMapPin,
} from "react-icons/fi";
import { loans } from "../data/loans";
import { useAuth } from "../contexts/AuthContext";

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    const foundLoan = loans.find((l) => l.id === parseInt(id));
    if (!foundLoan) {
      toast.error("Loan plan not found");
      navigate("/loans");
    } else {
      setLoan(foundLoan);
    }
  }, [id, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Here you would typically call your API
      console.log("Application Data:", { ...data, loanId: id });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        "Application submitted successfully! Our team will review it.",
      );
      navigate("/dashboard/my-loans");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!loan) return null;

  return (
    <>
      <Helmet>
        <title>Apply for {loan.title} - LoanLink</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loan Application
              </h1>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {loan.title}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Summary Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Loan Summary
                </h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Maximum Limit
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {loan.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Interest Rate
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {loan.interest}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {loan.duration}
                    </p>
                  </div>
                  <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                    <p className="text-xs text-primary-700 dark:text-primary-300">
                      Please ensure all information provided is accurate to
                      avoid delays in processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">First Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          className="input-field pl-10"
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          className="input-field pl-10"
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label">Email Address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Contact Number</label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          {...register("contactNumber", {
                            required: "Contact number is required",
                          })}
                          className="input-field pl-10"
                          placeholder="+880 1XXX XXXXXX"
                        />
                      </div>
                      {errors.contactNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.contactNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label">National ID / Passport</label>
                      <div className="relative">
                        <FiFileText className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          {...register("nationalId", {
                            required: "National ID is required",
                          })}
                          className="input-field pl-10"
                          placeholder="1234567890"
                        />
                      </div>
                      {errors.nationalId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nationalId.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Loan Amount Requested</label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="number"
                          {...register("loanAmount", {
                            required: "Loan amount is required",
                            min: {
                              value: 1000,
                              message: "Minimum amount is 1000",
                            },
                          })}
                          className="input-field pl-10"
                          placeholder="5000"
                        />
                      </div>
                      {errors.loanAmount && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.loanAmount.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label">Monthly Income</label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                          type="number"
                          {...register("monthlyIncome", {
                            required: "Monthly income is required",
                          })}
                          className="input-field pl-10"
                          placeholder="2500"
                        />
                      </div>
                      {errors.monthlyIncome && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.monthlyIncome.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label">Income Source</label>
                    <select
                      {...register("incomeSource", {
                        required: "Income source is required",
                      })}
                      className="input-field"
                    >
                      <option value="">Select Income Source</option>
                      <option value="salary">Salary / Employment</option>
                      <option value="business">Business Income</option>
                      <option value="freelance">
                        Freelance / Self-employed
                      </option>
                      <option value="other">Other</option>
                    </select>
                    {errors.incomeSource && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.incomeSource.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Current Address</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                      <textarea
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className="input-field pl-10 h-24 pt-3 resize-none"
                        placeholder="Street address, City, Country"
                      ></textarea>
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Reason for Loan (Optional)</label>
                    <textarea
                      {...register("reason")}
                      className="input-field h-24 pt-3 resize-none"
                      placeholder="Briefly explain what you'll use the funds for..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed py-4"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FiSend />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyLoan;
