import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";

// Pages
import Home from "./pages/Home";
import AllLoans from "./pages/AllLoans";
import LoanDetails from "./pages/LoanDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ApplyLoan from "./pages/ApplyLoan";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";

// Admin Dashboard
import ManageUsers from "./pages/dashboard/admin/ManageUsers";
import AdminAllLoans from "./pages/dashboard/admin/AllLoans";
import LoanApplications from "./pages/dashboard/admin/LoanApplications";

// Manager Dashboard
import AddLoan from "./pages/dashboard/manager/AddLoan";
import ManageLoans from "./pages/dashboard/manager/ManageLoans";
import EditLoan from "./pages/dashboard/manager/EditLoan";
import PendingLoans from "./pages/dashboard/manager/PendingLoans";
import ApprovedLoans from "./pages/dashboard/manager/ApprovedLoans";
import ManagerProfile from "./pages/dashboard/manager/MyProfile";

// Borrower Dashboard
import MyLoans from "./pages/dashboard/borrower/MyLoans";
import BorrowerProfile from "./pages/dashboard/borrower/MyProfile";

const AppContent = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/loans" element={<AllLoans />} />
                    <Route
                        path="/loans/:id"
                        element={
                            <PrivateRoute>
                                <LoanDetails />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/apply-loan/:id"
                        element={
                            <PrivateRoute>
                                <ApplyLoan />
                            </PrivateRoute>
                        }
                    />

                    {/* Dashboard Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/dashboard/manage-users"
                        element={
                            <PrivateRoute allowedRoles={["admin"]}>
                                <ManageUsers />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/all-loans"
                        element={
                            <PrivateRoute allowedRoles={["admin"]}>
                                <AdminAllLoans />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/loan-applications"
                        element={
                            <PrivateRoute allowedRoles={["admin"]}>
                                <LoanApplications />
                            </PrivateRoute>
                        }
                    />

                    {/* Manager Routes */}
                    <Route
                        path="/dashboard/add-loan"
                        element={
                            <PrivateRoute allowedRoles={["manager", "admin"]}>
                                <AddLoan />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/manage-loans"
                        element={
                            <PrivateRoute allowedRoles={["manager", "admin"]}>
                                <ManageLoans />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/edit-loan/:id"
                        element={
                            <PrivateRoute allowedRoles={["manager", "admin"]}>
                                <EditLoan />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/pending-loans"
                        element={
                            <PrivateRoute allowedRoles={["manager", "admin"]}>
                                <PendingLoans />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/approved-loans"
                        element={
                            <PrivateRoute allowedRoles={["manager", "admin"]}>
                                <ApprovedLoans />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/manager-profile"
                        element={
                            <PrivateRoute allowedRoles={["manager", "admin"]}>
                                <ManagerProfile />
                            </PrivateRoute>
                        }
                    />

                    {/* Borrower Routes */}
                    <Route
                        path="/dashboard/my-loans"
                        element={
                            <PrivateRoute allowedRoles={["borrower"]}>
                                <MyLoans />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/borrower-profile"
                        element={
                            <PrivateRoute allowedRoles={["borrower"]}>
                                <BorrowerProfile />
                            </PrivateRoute>
                        }
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {!isDashboard && <Footer />}
        </div>
    );
};

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <AuthProvider>
                    <Router>
                        <AppContent />
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
