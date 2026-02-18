import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../contexts/AuthContext';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiUser, FiMail, FiPhone, FiCheckCircle, FiShield } from 'react-icons/fi';

const BorrowerProfile = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <Helmet>
                <title>My Profile - LoanLink</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your personal information and security</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full border-4 border-primary-100 dark:border-primary-900 object-cover shadow-lg"
                    />
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-2">
                            <span className="text-primary-600 dark:text-primary-400 font-medium px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 rounded text-sm capitalize">{user?.role}</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                <FiCheckCircle className="mr-1" /> Profile Verified
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <FiUser className="text-primary-500" /> Basic Details
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <FiUser className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Account ID</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{user?.uid}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <FiMail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <FiPhone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Phone</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FiShield className="text-primary-500" /> Security Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Two-Factor Auth</span>
                                    <span className="text-red-500 font-medium">Disabled</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Email Verification</span>
                                    <span className="text-green-500 font-medium">Verified</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Identity Document</span>
                                    <span className="text-green-500 font-medium">Approved</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Update Security Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BorrowerProfile;
