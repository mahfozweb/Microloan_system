import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiUser, FiEye } from 'react-icons/fi';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const ApprovedLoans = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApproved = async () => {
            try {
                const response = await api.get('/applications?status=approved');
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching approved applications:", error);
                toast.error("Failed to load approved applications");
            } finally {
                setLoading(false);
            }
        };
        fetchApproved();
    }, []);

    const handleView = (app) => {
        Swal.fire({
            title: 'Application Details',
            html: `
                <div class="text-left space-y-2">
                    <p><strong>Applicant:</strong> ${app.fullName}</p>
                    <p><strong>Email:</strong> ${app.email}</p>
                    <p><strong>Loan:</strong> ${app.loanTitle}</p>
                    <p><strong>Amount:</strong> $${Number(app.loanAmount).toLocaleString()}</p>
                    <p><strong>Approved At:</strong> ${app.approvedAt ? new Date(app.approvedAt).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Fee Status:</strong> ${app.feeStatus || 'unpaid'}</p>
                </div>
            `,
            confirmButtonColor: '#0284c7'
        });
    };

    if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

    return (
        <DashboardLayout>
            <Helmet>
                <title>Approved Applications - Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Approved Applications</h1>
                <p className="text-gray-600 dark:text-gray-400">Track and manage active loans</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approval Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fee Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
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
                                        {app.approvedAt ? new Date(app.approvedAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.feeStatus === 'paid'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {app.feeStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleView(app)}
                                                className="p-1.5 text-gray-500 hover:text-primary-600 bg-gray-100 hover:bg-primary-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/40 rounded-lg transition-all"
                                                title="View Details"
                                            >
                                                <FiEye className="w-4 h-4" />
                                            </button>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                <FiCheck className="mr-1" /> Approved
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No approved applications found.
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

export default ApprovedLoans;
