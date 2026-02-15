import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiDollarSign, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

const MyLoans = () => {
    // Mock data
    const myLoans = [
        {
            id: 1,
            title: 'Personal Loan',
            amount: 5000,
            status: 'Approved',
            date: '2023-10-15',
            repaid: 1500,
        },
        {
            id: 2,
            title: 'Emergency Loan',
            amount: 1000,
            status: 'Pending',
            date: '2023-11-20',
            repaid: 0,
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    return (
        <DashboardLayout>
            <Helmet>
                <title>My Loans - Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">my Loans</h1>
                <p className="text-gray-600 dark:text-gray-400">Track your application status and repayments</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Borrowed</h3>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FiDollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$6,000</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Loans</h3>
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <FiClock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Repaid</h3>
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,500</p>
                </div>
            </div>

            {/* Loans Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Applied</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Repayment Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {myLoans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900 dark:text-white">{loan.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">ID: #{loan.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                        ${loan.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                        {loan.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 max-w-[100px]">
                                            <div
                                                className="bg-primary-600 h-2.5 rounded-full"
                                                style={{ width: `${(loan.repaid / loan.amount) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                            ${loan.repaid} / ${loan.amount}
                                        </span>
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

export default MyLoans;
