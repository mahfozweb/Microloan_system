import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect based on role
    if (user.role === 'admin') {
        return <Navigate to="/dashboard/manage-users" replace />;
    } else if (user.role === 'manager') {
        return <Navigate to="/dashboard/manage-loans" replace />;
    } else if (user.role === 'borrower') {
        return <Navigate to="/dashboard/my-loans" replace />;
    }

    return (
        <>
            <Helmet>
                <title>Dashboard - LoanLink</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="section-title text-center">Dashboard</h1>
            </div>
        </>
    );
};

export default Dashboard;
