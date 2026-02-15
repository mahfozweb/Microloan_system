import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../contexts/AuthContext';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiUser, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi';

const ManagerProfile = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <Helmet>
                <title>Profile - Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manager Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">View your administrative details</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex items-center gap-6">
                    <img
                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full border-4 border-primary-100 dark:border-primary-900 object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-primary-600 dark:text-primary-400 font-medium">Loan Manager</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                <FiCheckCircle className="mr-1" /> Active
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <FiUser className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">User ID</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{user?.uid || 'MGR-7890'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Contact</p>
                                    <p className="font-medium text-gray-900 dark:text-white">+1 (555) 987-6543</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Loans Managed</span>
                                <span className="font-bold text-gray-900 dark:text-white">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Active Applications</span>
                                <span className="font-bold text-gray-900 dark:text-white">45</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Approval Rate</span>
                                <span className="font-bold text-green-600 dark:text-green-400">92%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ManagerProfile;
