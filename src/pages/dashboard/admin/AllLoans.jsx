import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { FiList, FiCheckCircle, FiXCircle, FiEye, FiTrash2, FiSearch, FiEdit2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AdminAllLoans = () => {
    // Mock loan data with state
    const [loans, setLoans] = useState([
        { id: 'LN001', borrower: 'John Doe', email: 'john@doe.com', amount: 5000, category: 'Personal', status: 'Approved', date: '2023-11-15' },
        { id: 'LN002', borrower: 'Jane Smith', email: 'jane@smith.com', amount: 10000, category: 'Business', status: 'Pending', date: '2023-11-20' },
        { id: 'LN003', borrower: 'Robert Brown', email: 'robert@brown.com', amount: 2500, category: 'Emergency', status: 'Rejected', date: '2023-11-18' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete loan record "${id}". This action cannot be reversed!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0284c7',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoans(loans.filter(loan => loan.id !== id));
                Swal.fire('Deleted!', 'Loan record has been removed.', 'success');
            }
        });
    };

    const handleEdit = (loan) => {
        Swal.fire({
            title: 'Edit Loan Record',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Borrower Name" value="${loan.borrower}">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Amount" type="number" value="${loan.amount}">` +
                `<select id="swal-input3" class="swal2-input">
                    <option value="Pending" ${loan.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Approved" ${loan.status === 'Approved' ? 'selected' : ''}>Approved</option>
                    <option value="Rejected" ${loan.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#0284c7',
            preConfirm: () => {
                return {
                    borrower: document.getElementById('swal-input1').value,
                    amount: document.getElementById('swal-input2').value,
                    status: document.getElementById('swal-input3').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { borrower, amount, status } = result.value;
                if (!borrower || !amount) {
                    Swal.fire('Error', 'Name and Amount are required', 'error');
                    return;
                }
                setLoans(loans.map(l => l.id === loan.id ? { ...l, borrower, amount: Number(amount), status } : l));
                Swal.fire('Updated!', 'Loan details have been updated.', 'success');
            }
        });
    };

    const handleView = (loan) => {
        Swal.fire({
            title: `Loan Details: ${loan.id}`,
            html: `
                <div class="text-left space-y-2">
                    <p><strong>Borrower:</strong> ${loan.borrower}</p>
                    <p><strong>Email:</strong> ${loan.email}</p>
                    <p><strong>Category:</strong> ${loan.category}</p>
                    <p><strong>Amount:</strong> $${loan.amount.toLocaleString()}</p>
                    <p><strong>Date Applied:</strong> ${loan.date}</p>
                    <p><strong>Status:</strong> ${loan.status}</p>
                </div>
            `,
            confirmButtonColor: '#0284c7'
        });
    };

    const filteredLoans = loans.filter(loan =>
        loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <Helmet>
                <title>All Loans - Admin Dashboard</title>
            </Helmet>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Loans</h1>
                    <p className="text-gray-600 dark:text-gray-400">Master list of all loan applications across the system</p>
                </div>

                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search borrower or ID..."
                        className="input-field pl-10 h-10 py-0 max-w-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Loan ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Borrower</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredLoans.length > 0 ? filteredLoans.map((loan) => (
                                <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-primary-600 dark:text-primary-400">
                                        {loan.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{loan.borrower}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{loan.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-semibold">
                                        ${loan.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleView(loan)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all mr-1"
                                            title="View Details"
                                        >
                                            <FiEye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(loan)}
                                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all mr-1"
                                            title="Edit Record"
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(loan.id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                            title="Delete Record"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <FiList className="mx-auto h-12 w-12 opacity-20 mb-2" />
                                        <p>No loan records found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAllLoans;
