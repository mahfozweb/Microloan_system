import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiFileText, FiRefreshCw, FiCheckCircle, FiXCircle, FiMoreVertical } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const LoanApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const stages = ['Documentation', 'Credit Review', 'Verification', 'Final Approval'];

    const fetchApplications = async () => {
        try {
            const response = await api.get('/applications?status=pending');
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

    const updateStage = (id, currentStage) => {
        const currentIndex = stages.indexOf(currentStage);
        const nextStage = stages[(currentIndex + 1) % stages.length];

        Swal.fire({
            title: 'Change Stage?',
            text: `Move application ${id} from "${currentStage || 'N/A'}" to "${nextStage}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0284c7',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, move'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.patch(`/applications/stage/${id}`, { stage: nextStage });
                    setApplications(apps => apps.map(app =>
                        app._id === id ? { ...app, stage: nextStage } : app
                    ));
                    Swal.fire('Updated!', `Stage moved to ${nextStage}.`, 'success');
                } catch (error) {
                    Swal.fire('Error', 'Failed to update stage', 'error');
                }
            }
        });
    };

    const handleAction = (id, name, action) => {
        if (action === 'Approve') {
            Swal.fire({
                title: 'Approve Application?',
                text: `You are about to approve the loan application for ${name}.`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#10b981',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Confirm Approval'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.patch(`/applications/status/${id}`, { status: 'approved' });
                        setApplications(apps => apps.filter(app => app._id !== id));
                        Swal.fire('Approved!', 'The application has been approved successfully.', 'success');
                    } catch (error) {
                        Swal.fire('Error', 'Failed to approve application', 'error');
                    }
                }
            });
        } else if (action === 'Reject') {
            Swal.fire({
                title: 'Reject Application?',
                text: `Are you sure you want to reject the application for ${name}?`,
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Confirm Rejection'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.patch(`/applications/status/${id}`, { status: 'rejected' });
                        setApplications(apps => apps.filter(app => app._id !== id));
                        Swal.fire('Rejected!', 'The application has been rejected.', 'info');
                    } catch (error) {
                        Swal.fire('Error', 'Failed to reject application', 'error');
                    }
                }
            });
        }
    };

    if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

    return (
        <DashboardLayout>
            <Helmet>
                <title>Loan Applications - Admin Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Loan Applications</h1>
                <p className="text-gray-600 dark:text-gray-400">Track and review current loan application workflows</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Application</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stage</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.length > 0 ? applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{app.fullName}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{app._id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {app.loanTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                        ${Number(app.loanAmount).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => updateStage(app._id, app.stage)}
                                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 transition-colors"
                                            title="Click to advance stage"
                                        >
                                            <FiRefreshCw className="mr-1 h-3 w-3" /> {app.stage || 'Start Process'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleAction(app._id, app.fullName, 'Approve')}
                                                className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-all"
                                                title="Quick Approve"
                                            >
                                                <FiCheckCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleAction(app._id, app.fullName, 'Reject')}
                                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
                                                title="Quick Reject"
                                            >
                                                <FiXCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <FiFileText className="h-12 w-12 opacity-10 mb-4" />
                                            <p>No active applications to review.</p>
                                        </div>
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

export default LoanApplications;
