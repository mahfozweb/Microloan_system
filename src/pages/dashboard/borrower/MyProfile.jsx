import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../contexts/AuthContext';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3 } from 'react-icons/fi';

const BorrowerProfile = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <Helmet>
                <title>My Profile - Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">my Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img
                                src={user?.photoURL || 'https://via.placeholder.com/150'}
                                alt={user?.name}
                                className="w-24 h-24 rounded-full border-4 border-primary-100 dark:border-primary-900 object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors shadow-sm">
                                <FiEdit3 className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                            <p className="text-primary-600 dark:text-primary-400 font-medium">Borrower Account</p>
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium">
                        Edit Profile
                    </button>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <FiUser className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
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
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</p>
                                    <p className="font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                                    <p className="font-medium text-gray-900 dark:text-white">123 Borrower Lane, Cityville</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Overview</h3>
                        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                                <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                                <span className="font-medium text-gray-900 dark:text-white">October 2023</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                                <span className="text-gray-600 dark:text-gray-400">Total Loans Applied</span>
                                <span className="font-medium text-gray-900 dark:text-white">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">Verification Status</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BorrowerProfile;
