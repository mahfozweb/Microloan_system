import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { FiSave, FiInfo, FiTag, FiDollarSign, FiPercent, FiClock, FiLayers, FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const AddLoan = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        category: "personal",
        minAmount: "",
        maxAmount: "",
        minInterest: "",
        maxInterest: "",
        minDuration: "",
        maxDuration: "",
        description: "",
        available: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        // Build formatted strings for amount, interest, duration
        const loanPayload = {
            ...formData,
            amount: `$${Number(formData.minAmount).toLocaleString()} - $${Number(formData.maxAmount).toLocaleString()}`,
            interest: `${formData.minInterest}% - ${formData.maxInterest}%`,
            duration: `${formData.minDuration} - ${formData.maxDuration} months`,
        };

        try {
            await api.post("/loans", loanPayload);
            toast.success("New loan type added successfully!");
            navigate("/dashboard/manage-loans");
        } catch (error) {
            console.error("Error adding loan:", error);
            toast.error(error.response?.data?.message || "Failed to add loan. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DashboardLayout>
            <Helmet>
                <title>Add New Loan - Manager Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Loan Type</h1>
                <p className="text-gray-600 dark:text-gray-400">Create a new loan product for borrowers</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title and Category */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FiTag className="text-primary-500" /> Loan Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    placeholder="e.g. Small Business Growth Loan"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FiLayers className="text-primary-500" /> Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                >
                                    <option value="personal">Personal</option>
                                    <option value="business">Business</option>
                                    <option value="education">Education</option>
                                    <option value="emergency">Emergency</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FiImage className="text-primary-500" /> Loan Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <FiInfo className="text-primary-500" /> Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                                placeholder="Describe the loan features and benefits..."
                            ></textarea>
                        </div>

                        {/* Amounts */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <FiDollarSign className="text-primary-500" /> Loan Amount Range ($)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    name="minAmount"
                                    required
                                    placeholder="Min"
                                    value={formData.minAmount}
                                    onChange={handleChange}
                                    className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    name="maxAmount"
                                    required
                                    placeholder="Max"
                                    value={formData.maxAmount}
                                    onChange={handleChange}
                                    className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Interest */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <FiPercent className="text-primary-500" /> Interest Rate Range (%)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    name="minInterest"
                                    required
                                    placeholder="Min"
                                    step="0.01"
                                    value={formData.minInterest}
                                    onChange={handleChange}
                                    className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    name="maxInterest"
                                    required
                                    placeholder="Max"
                                    step="0.01"
                                    value={formData.maxInterest}
                                    onChange={handleChange}
                                    className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <FiClock className="text-primary-500" /> Duration Range (Months)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    name="minDuration"
                                    required
                                    placeholder="Min"
                                    value={formData.minDuration}
                                    onChange={handleChange}
                                    className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                                <span className="text-gray-400">to</span>
                                <input
                                    type="number"
                                    name="maxDuration"
                                    required
                                    placeholder="Max"
                                    value={formData.maxDuration}
                                    onChange={handleChange}
                                    className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center gap-3 md:mt-8">
                            <input
                                type="checkbox"
                                name="available"
                                id="available"
                                checked={formData.available}
                                onChange={handleChange}
                                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                            />
                            <label htmlFor="available" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                                Active & Available for Applications
                            </label>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-end gap-4 border-t border-gray-100 dark:border-gray-700 pt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/manage-loans")}
                            className="px-6 py-3 text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-600/20 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FiSave /> Create Loan Type
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </DashboardLayout>
    );
};

export default AddLoan;
