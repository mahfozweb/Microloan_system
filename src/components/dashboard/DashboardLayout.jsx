import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    FiGrid,
    FiUser,
    FiPlusCircle,
    FiList,
    FiClock,
    FiCheckCircle,
    FiUsers,
    FiFileText,
    FiHome,
    FiLogOut,
    FiMenu,
    FiX
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = {
        admin: [
            { name: 'Overview', href: '/dashboard', icon: FiGrid },
            { name: 'Manage Users', href: '/dashboard/manage-users', icon: FiUsers },
            { name: 'All Loans', href: '/dashboard/all-loans', icon: FiList },
            { name: 'Loan Applications', href: '/dashboard/loan-applications', icon: FiFileText },
        ],
        manager: [
            { name: 'Overview', href: '/dashboard', icon: FiGrid },
            { name: 'Add Loan', href: '/dashboard/add-loan', icon: FiPlusCircle },
            { name: 'Manage Loans', href: '/dashboard/manage-loans', icon: FiList },
            { name: 'Pending Loans', href: '/dashboard/pending-loans', icon: FiClock },
            { name: 'Approved Loans', href: '/dashboard/approved-loans', icon: FiCheckCircle },
            { name: 'My Profile', href: '/dashboard/manager-profile', icon: FiUser },
        ],
        borrower: [
            { name: 'Overview', href: '/dashboard', icon: FiGrid },
            { name: 'My Loans', href: '/dashboard/my-loans', icon: FiList },
            { name: 'My Profile', href: '/dashboard/borrower-profile', icon: FiUser },
            { name: 'Available Loans', href: '/loans', icon: FiHome },
        ],
    };

    const currentNav = navigation[user?.role] || navigation.borrower;

    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold gradient-text">Dashboard</span>
                        <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <FiX className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {currentNav.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'}
                  `}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 mb-4 px-4">
                            <img
                                src={user?.photoURL || 'https://via.placeholder.com/40'}
                                alt={user?.name}
                                className="w-10 h-10 rounded-full border-2 border-primary-500"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
                                    {user?.role}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                        >
                            <FiLogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-4 shrink-0 transition-colors duration-300">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>
                    <span className="ml-4 text-xl font-bold gradient-text">LoanLink</span>
                </header>

                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
