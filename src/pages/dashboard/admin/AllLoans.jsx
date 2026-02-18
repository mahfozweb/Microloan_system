import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiList, FiEye, FiTrash2, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const AdminAllLoans = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchApplications = async () => {
        try {
            const response = await api.get('/applications');
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete application record. This action cannot be reversed!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0284c7',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/applications/${id}`);
                    setApplications(applications.filter(app => app._id !== id));
                    Swal.fire('Deleted!', 'Application record has been removed.', 'success');
                } catch (error) {
                    Swal.fire('Error', error.response?.data?.message || 'Failed to delete record', 'error');
                }
            }
        });
    };

    const handleView = (app) => {
        Swal.fire({
            title: `Application Details`,
            html: `
                <div class="text-left space-y-2">
                    <p><strong>Borrower:</strong> ${app.fullName}</p>
                    <p><strong>Email:</strong> ${app.email}</p>
                    <p><strong>Loan:</strong> ${app.loanTitle}</p>
                    <p><strong>Amount:</strong> $${Number(app.loanAmount).toLocaleString()}</p>
                    <p><strong>Status:</strong> ${app.status}</p>
                    <p><strong>Stage:</strong> ${app.stage || 'N/A'}</p>
                    <p><strong>Address:</strong> ${app.address}</p>
                </div>
            `,
            confirmButtonColor: '#0284c7'
        });
    };

    const filteredApplications = applications.filter(app =>
        app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.loanTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

    return (
        <DashboardLayout>
            <Helmet>
                <title>All Loans - Admin Dashboard</title>
            </Helmet>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Loans</h1>
                    <p className="text-gray-600 dark:text-gray-400">Master list of all loan applications across the system</p>
                </div>

                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search borrower, loan or ID..."
                        className="input-field pl-10 h-10 py-0 max-w-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Borrower</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredApplications.length > 0 ? filteredApplications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{app.fullName}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{app.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                        {app.loanTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-semibold">
                                        ${Number(app.loanAmount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleView(app)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all mr-1"
                                            title="View Details"
                                        >
                                            <FiEye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                            title="Delete Record"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <FiList className="mx-auto h-12 w-12 opacity-20 mb-2" />
                                        <p>No loan records found.</p>
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

export default AdminAllLoans;
