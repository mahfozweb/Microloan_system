import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiUsers, FiMail, FiShield, FiTrash2, FiEdit2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    // Mock user data with state
    const [users, setUsers] = useState([
        { id: 1, name: 'Admin User', email: 'admin@loanlink.com', role: 'admin', status: 'Active' },
        { id: 2, name: 'Loan Manager', email: 'manager@loanlink.com', role: 'manager', status: 'Active' },
        { id: 3, name: 'John Borrower', email: 'john@gmail.com', role: 'borrower', status: 'Active' },
        { id: 4, name: 'Jane Borrower', email: 'jane@gmail.com', role: 'borrower', status: 'Pending' },
    ]);

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
            case 'manager': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const handleDelete = (id, name) => {
        if (id === 1) {
            Swal.fire({
                icon: 'error',
                title: 'Operation Denied',
                text: 'Cannot delete the primary admin account!',
                confirmButtonColor: '#0284c7'
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete user "${name}". This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0284c7',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter(user => user.id !== id));
                Swal.fire(
                    'Deleted!',
                    `User "${name}" has been deleted.`,
                    'success'
                );
            }
        });
    };

    const toggleStatus = (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
                toast.info(`Status updated to ${newStatus} for ${user.name}`);
                return { ...user, status: newStatus };
            }
            return user;
        }));
    };

    const handleEdit = (user) => {
        Swal.fire({
            title: 'Edit User',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${user.name}">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">` +
                `<select id="swal-input3" class="swal2-input">
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                    <option value="borrower" ${user.role === 'borrower' ? 'selected' : ''}>Borrower</option>
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#0284c7',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    email: document.getElementById('swal-input2').value,
                    role: document.getElementById('swal-input3').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, email, role } = result.value;
                if (!name || !email) {
                    Swal.fire('Error', 'Name and Email are required', 'error');
                    return;
                }
                setUsers(users.map(u => u.id === user.id ? { ...u, name, email, role } : u));
                Swal.fire('Updated!', 'User information has been updated.', 'success');
            }
        });
    };

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
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => toggleStatus(user.id)}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : user.status === 'Blocked'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}
                                        >
                                            {user.status === 'Active' && <FiCheckCircle className="mr-1" />}
                                            {user.status === 'Blocked' && <FiXCircle className="mr-1" />}
                                            {user.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4 p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                            title="Edit User"
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete User"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
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
