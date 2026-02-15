import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiXCircle, FiUser, FiEye } from 'react-icons/fi';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

const PendingLoans = () => {
    // Mock application data
    const applications = [
        {
            id: 'APP-001',
            applicant: 'John Doe',
            loanTitle: 'Business Expansion Loan',
            amount: 15000,
            date: '2023-11-20',
            status: 'Pending',
        },
        {
            id: 'APP-003',
            applicant: 'Michael Brown',
            loanTitle: 'Home Renovation',
            amount: 8000,
            date: '2023-11-22',
            status: 'Pending',
        },
        {
            id: 'APP-005',
            applicant: 'Sarah Wilson',
            loanTitle: 'Education Loan',
            amount: 5000,
            date: '2023-11-25',
            status: 'Pending',
        },
    ];

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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Application ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {app.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                <FiUser />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{app.applicant}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {app.loanTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                        ${app.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {app.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-2 text-gray-500 hover:text-primary-600 bg-gray-100 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
                                                <FiEye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                                                <FiCheckCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                                                <FiXCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PendingLoans;
