import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSend, FiInfo, FiFileText, FiUser, FiMail, FiPhone, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { loans } from "../data/loans";

const ApplyLoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loan = loans.find((l) => l.id === parseInt(id));

    const [formData, setFormData] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        occupation: "",
        monthlyIncome: "",
        loanAmount: "",
        purpose: "",
        address: "",
    });

    useEffect(() => {
        if (!loan) {
            toast.error("Loan not found");
            navigate("/loans");
        }
    }, [loan, navigate]);

    if (!loan) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Loan application submitted successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Apply for {loan.title} - LoanLink</title>
            </Helmet>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to={`/loans/${id}`}
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors group"
                    >
                        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Details
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                        {/* Header */}
                        <div className={`p-8 ${loan.color} border-b ${loan.borderColor}`}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                                    {loan.icon}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Application: {loan.title}
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Range: {loan.amount} | Interest: {loan.interest}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FiUser className="text-gray-400" /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FiMail className="text-gray-400" /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FiPhone className="text-gray-400" /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {/* Occupation */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FiBriefcase className="text-gray-400" /> Occupation
                                    </label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        required
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="e.g. Software Engineer"
                                    />
                                </div>

                                {/* Monthly Income */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FiDollarSign className="text-gray-400" /> Monthly Income ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="monthlyIncome"
                                        required
                                        value={formData.monthlyIncome}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder="e.g. 5000"
                                    />
                                </div>

                                {/* Loan Amount */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <FiDollarSign className="text-gray-400" /> Requested Amount ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="loanAmount"
                                        required
                                        value={formData.loanAmount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                                        placeholder={`e.g. 2000 (Range: ${loan.amount})`}
                                    />
                                </div>
                            </div>

                            {/* Purpose */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FiFileText className="text-gray-400" /> Purpose of Loan
                                </label>
                                <textarea
                                    name="purpose"
                                    required
                                    rows="3"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none"
                                    placeholder="Tell us why you need this loan..."
                                ></textarea>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FiInfo className="text-gray-400" /> Current Address
                                </label>
                                <textarea
                                    name="address"
                                    required
                                    rows="2"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none"
                                    placeholder="Enter your permanent address"
                                ></textarea>
                            </div>

                            {/* Terms and Submit */}
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-8">
                                    <input
                                        type="checkbox"
                                        required
                                        id="terms"
                                        className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                                    />
                                    <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer">
                                        I agree to the terms and conditions and privacy policy. I certify that all information provided is accurate and truthful. I understand that false information may lead to the rejection of my application.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-primary-600 hover:bg-primary-700 shadow-primary-600/20 active:scale-[0.98]"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend /> Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-4"
                    >
                        <FiInfo className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        <div className="text-sm text-blue-800 dark:text-blue-300">
                            <p className="font-semibold mb-1">Processing Time</p>
                            <p>Most applications are reviewed within 24-48 business hours. You can track your application status in your borrower dashboard.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ApplyLoan;
