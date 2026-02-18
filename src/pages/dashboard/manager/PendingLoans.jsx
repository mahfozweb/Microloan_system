import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiXCircle, FiUser, FiEye } from 'react-icons/fi';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const PendingLoans = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        try {
            const response = await api.get('/applications?status=pending');
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching pending applications:", error);
            toast.error("Failed to load pending applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleAction = (id, applicant, action, appData) => {
        if (action === 'Approve') {
            Swal.fire({
                title: 'Confirm Approval',
                text: `Are you sure you want to APPROVE the loan for ${applicant}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10b981',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, Approve'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.patch(`/applications/status/${id}`, { status: 'approved' });
                        setApplications(prev => prev.filter(app => app._id !== id));
                        Swal.fire('Approved!', `Loan for ${applicant} has been approved.`, 'success');
                    } catch (error) {
                        Swal.fire('Error', 'Failed to approve application', 'error');
                    }
                }
            });
        } else if (action === 'Reject') {
            Swal.fire({
                title: 'Confirm Rejection',
                text: `Are you sure you want to REJECT the loan for ${applicant}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, Reject'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.patch(`/applications/status/${id}`, { status: 'rejected' });
                        setApplications(prev => prev.filter(app => app._id !== id));
                        Swal.fire('Rejected!', `Loan for ${applicant} has been rejected.`, 'error');
                    } catch (error) {
                        Swal.fire('Error', 'Failed to reject application', 'error');
                    }
                }
            });
        } else {
            // View details
            Swal.fire({
                title: 'Application Details',
                html: `
                    <div class="text-left space-y-2">
                        <p><strong>ID:</strong> ${appData._id}</p>
                        <p><strong>Applicant:</strong> ${appData.fullName}</p>
                        <p><strong>Email:</strong> ${appData.email}</p>
                        <p><strong>Loan:</strong> ${appData.loanTitle}</p>
                        <p><strong>Amount:</strong> $${Number(appData.loanAmount).toLocaleString()}</p>
                        <p><strong>Address:</strong> ${appData.address || 'N/A'}</p>
                        <p><strong>Status:</strong> ${appData.status}</p>
                    </div>
                `,
                confirmButtonColor: '#0284c7'
            });
        }
    };

    if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

    return (
        <DashboardLayout>
            <Helmet>
                <title>Pending Applications - Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Applications</h1>
                <p className="text-gray-600 dark:text-gray-400">Review and approve incoming loan requests</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.length > 0 ? applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                <FiUser />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{app.fullName}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{app.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {app.loanTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                        ${Number(app.loanAmount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleAction(app._id, app.fullName, 'View', app)}
                                                className="p-2 text-gray-500 hover:text-primary-600 bg-gray-100 hover:bg-primary-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/40 rounded-lg transition-all"
                                                title="View Details"
                                            >
                                                <FiEye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction(app._id, app.fullName, 'Approve', app)}
                                                className="p-2 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 rounded-lg transition-all"
                                                title="Approve"
                                            >
                                                <FiCheckCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction(app._id, app.fullName, 'Reject', app)}
                                                className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-all"
                                                title="Reject"
                                            >
                                                <FiXCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No pending applications found.
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

export default PendingLoans;
