import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    FiUsers, FiDollarSign, FiFileText, FiPlusSquare,
    FiCheckSquare, FiUser, FiActivity
} from 'react-icons/fi';

const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) => `
        flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
        ${isActive(path) ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-4 border-primary-600 dark:border-primary-400' : ''}
    `;

    const renderLinks = () => {
        switch (user.role) {
            case 'admin':
                return (
                    <>
                        <Link to="/dashboard/manage-users" className={linkClass('/dashboard/manage-users')}>
                            <FiUsers className="mr-3" /> Manage Users
                        </Link>
                        <Link to="/dashboard/all-loans" className={linkClass('/dashboard/all-loans')}>
                            <FiDollarSign className="mr-3" /> All Loans
                        </Link>
                        <Link to="/dashboard/loan-applications" className={linkClass('/dashboard/loan-applications')}>
                            <FiFileText className="mr-3" /> Applications
                        </Link>
                    </>
                );
            case 'manager':
                return (
                    <>
                        <Link to="/dashboard/manage-loans" className={linkClass('/dashboard/manage-loans')}>
                            <FiActivity className="mr-3" /> Manage Loans
                        </Link>
                        <Link to="/dashboard/add-loan" className={linkClass('/dashboard/add-loan')}>
                            <FiPlusSquare className="mr-3" /> Add Loan
                        </Link>
                        <Link to="/dashboard/pending-loans" className={linkClass('/dashboard/pending-loans')}>
                            <FiFileText className="mr-3" /> Pending Applications
                        </Link>
                        <Link to="/dashboard/approved-loans" className={linkClass('/dashboard/approved-loans')}>
                            <FiCheckSquare className="mr-3" /> Approved Applications
                        </Link>
                        <Link to="/dashboard/manager-profile" className={linkClass('/dashboard/manager-profile')}>
                            <FiUser className="mr-3" /> My Profile
                        </Link>
                    </>
                );
            case 'borrower':
                return (
                    <>
                        <Link to="/dashboard/my-loans" className={linkClass('/dashboard/my-loans')}>
                            <FiDollarSign className="mr-3" /> My Loans
                        </Link>
                        <Link to="/dashboard/borrower-profile" className={linkClass('/dashboard/borrower-profile')}>
                            <FiUser className="mr-3" /> My Profile
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen hidden md:block">
            <div className="py-6">
                <h2 className="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Menu
                </h2>
                <nav className="space-y-1">
                    {renderLinks()}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
