import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiUsers, FiEdit2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const getRoleBadgeColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'manager': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const toggleStatus = async (user) => {
        const newStatus = user.status === 'active' ? 'blocked' : 'active';

        try {
            await api.patch(`/users/role/${user._id}`, { status: newStatus });
            setUsers(users.map(u => u._id === user._id ? { ...u, status: newStatus } : u));
            toast.success(`User ${newStatus === 'active' ? 'unblocked' : 'blocked'} successfully`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleEdit = (user) => {
        Swal.fire({
            title: 'Update User Role',
            html: `
                <div class="text-left mb-2 text-sm text-gray-600">User: ${user.name} (${user.email})</div>
                <select id="swal-input-role" class="swal2-input w-full">
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                    <option value="borrower" ${user.role === 'borrower' ? 'selected' : ''}>Borrower</option>
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#0284c7',
            preConfirm: () => {
                return document.getElementById('swal-input-role').value;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const role = result.value;
                try {
                    await api.patch(`/users/role/${user._id}`, { role });
                    setUsers(users.map(u => u._id === user._id ? { ...u, role } : u));
                    Swal.fire('Updated!', 'User role has been updated.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Failed to update user role', 'error');
                }
            }
        });
    };

    if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

    return (
        <DashboardLayout>
            <Helmet>
                <title>Manage Users - Admin Dashboard</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage all registered users in the system</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold overflow-hidden">
                                                {u.photoURL ? (
                                                    <img src={u.photoURL} alt={u.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    u.name?.charAt(0) || 'U'
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{u.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(u.role)}`}>
                                            {u.role || 'borrower'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => toggleStatus(u)}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${u.status === 'active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                }`}
                                        >
                                            {u.status === 'active' ? (
                                                <><FiCheckCircle className="mr-1" /> Active</>
                                            ) : (
                                                <><FiXCircle className="mr-1" /> Blocked</>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(u)}
                                            className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                            title="Edit Role"
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {users.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl mt-4 border border-dashed border-gray-300 dark:border-gray-700">
                    <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users found</h3>
                </div>
            )}
        </DashboardLayout>
    );
};

export default ManageUsers;
