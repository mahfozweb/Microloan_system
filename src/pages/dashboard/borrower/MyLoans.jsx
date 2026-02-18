import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiFileText, FiClock, FiCheckCircle, FiXCircle, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MyLoans = () => {
    // Mock user loans
    const [myApplications] = useState([
        {
            id: 'APP-1024',
            title: 'Personal Loan',
            amount: 5000,
            date: '2023-11-15',
            status: 'Processing',
            stage: 'Credit Review',
            color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
        },
        {
            id: 'APP-0988',
            title: 'Education Loan',
            amount: 12000,
            date: '2023-10-20',
            status: 'Approved',
            stage: 'Disbursed',
            color: 'text-green-500 bg-green-50 dark:bg-green-900/20'
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        }
    };

    return (
        <DashboardLayout>
            <Helmet>
                <title>My Loans - LoanLink</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Loan Applications</h1>
                <p className="text-gray-600 dark:text-gray-400">View and track your submitted loan requests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                            <FiFileText className="text-primary-600 w-6 h-6" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Applications</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{myApplications.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                            <FiClock className="text-amber-600 w-6 h-6" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Processing</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <FiCheckCircle className="text-green-600 w-6 h-6" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Active Loans</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan Product</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Applied</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Stage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {myApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${app.color}`}>
                                                <FiTrendingUp className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{app.title}</p>
                                                <p className="text-xs text-gray-400">{app.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                        ${app.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {app.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{app.stage}</span>
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

export default MyLoans;
