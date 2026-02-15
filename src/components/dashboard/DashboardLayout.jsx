import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
