import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import api from "../../../services/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const EditLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    minAmount: "",
    minAmount: "",
    maxAmount: "",
    interest: "",
    duration: "",
    description: "",
    requirements: "",
  });

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await api.get(`/loans/${id}`);
        const loan = response.data;
        if (loan) {
          // Extract numbers from strings like "$500 - $5,000"
          const amounts = loan.amount ? loan.amount.replace(/\$|,/g, "").split(" - ") : ["", ""];
          setFormData({
            title: loan.title || "",
            image: loan.image || "",
            minAmount: amounts[0]?.trim() || "",
            maxAmount: amounts[1]?.trim() || "",
            interest: loan.interest || "",
            duration: loan.duration || "",
            description: loan.description || "",
            requirements: Array.isArray(loan.requirements)
              ? loan.requirements.join(", ")
              : loan.requirements || "Valid ID, Bank Statement, Income Proof",
          });
        } else {
          toast.error("Loan product not found");
          navigate("/dashboard/manage-loans");
        }
      } catch (error) {
        console.error("Error fetching loan:", error);
        toast.error("Loan product not found");
        navigate("/dashboard/manage-loans");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const loanPayload = {
      ...formData,
      amount: `$${Number(formData.minAmount).toLocaleString()} - $${Number(formData.maxAmount).toLocaleString()}`,
      requirements: formData.requirements.split(",").map((r) => r.trim()),
    };

    try {
      await api.put(`/loans/${id}`, loanPayload);
      setStatus("success");
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Loan product has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/dashboard/manage-loans"), 2000);
    } catch (error) {
      console.error("Error updating loan:", error);
      setStatus(null);
      toast.error(error.response?.data?.message || "Failed to update loan.");
    }
  };

  if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Edit Loan - Dashboard</title>
      </Helmet>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-2 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to List
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Loan Product
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update details for {formData.title}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
              placeholder="e.g. Small Business Growth Fund"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Amount ($)
              </label>
              <input
                type="number"
                name="minAmount"
                value={formData.minAmount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Amount ($)
              </label>
              <input
                type="number"
                name="maxAmount"
                value={formData.maxAmount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                placeholder="50000"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="text"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                placeholder="5-10%"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (months)
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
                placeholder="12-36 months"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none text-gray-900 dark:text-white"
              placeholder="Detailed description of the loan product..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Requirements (comma separated)
            </label>
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white"
              placeholder="Valid ID, Bank Statement, Income Proof"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="animate-pulse">Updating...</span>
              ) : status === "success" ? (
                <span className="text-green-200">Updated!</span>
              ) : (
                <>
                  <FiSave /> Update Loan Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditLoan;
