import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import api from "../../../services/api";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const ManageLoans = () => {
  const [loanList, setLoanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLoans = async () => {
    try {
      const response = await api.get("/loans");
      setLoanList(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-loan/${id}`);
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the loan listing "${title}". This action is permanent!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0284c7',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/loans/${id}`);
          setLoanList((prev) => prev.filter((loan) => loan._id !== id));
          Swal.fire('Deleted!', `"${title}" has been deleted.`, 'success');
        } catch (error) {
          Swal.fire('Error', 'Failed to delete loan', 'error');
        }
      }
    });
  };

  if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Helmet>
        <title>Manage Loans - Dashboard</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Loans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all loan listings
          </p>
        </div>
        <Link
          to="/dashboard/add-loan"
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" />
          Add New Loan
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ minWidth: '150px' }}>
                  Amount Range
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Interest Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loanList.length > 0 ? (
                loanList.map((loan) => (
                  <tr
                    key={loan._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
                          <img
                            src={loan.image || "https://via.placeholder.com/40"}
                            alt={loan.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {loan.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block truncate max-w-[200px]">
                            {loan.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {loan.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {loan.interest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {loan.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(loan._id)}
                        className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4 transition-colors p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg"
                        title="Edit Loan"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(loan._id, loan.title)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Delete Loan"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    No loans found. Add a new one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageLoans;
