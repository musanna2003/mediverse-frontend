import React from 'react';
import axios from 'axios';
import { FaUserShield, FaUserTie } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const ManageUsers = () => {
    const role = 'user'; // currently managing 'user' role only
    const queryClient = useQueryClient();

    // 🧲 Fetch users by role
    const fetchUsersByRole = async (role) => {
    const res = await axios.get('http://localhost:3000/users', {
        params: { role },
    });
    return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', role],
        queryFn: () => fetchUsersByRole(role),
    });
  // 🔁 Update role
    const updateRole = async (user, newRole) => {
        try {
            const res = await axios.put('http://localhost:3000/users/update', {
                email : user.email,
                role: newRole,
            });
            if (newRole === "seller"){
                const sellerData = {
                    name: user.name || "N/A",
                    email: user.email,
                    phone: data.phone || "N/A",
                    storeName: data.storeName || "N/A",
                    nidNumber: data.nidNumber || "N/A",
                    licenseNumber: data.licenseNumber || "N/A",
                    address: data.address || "N/A",
                    state: 'approved',
                    createdAt: new Date().toISOString(),
                };
                const res2 = await axios.post('http://localhost:3000/sellers', sellerData);
                console.log(res2.data)
            }

            if (res.data.modifiedCount > 0) {
                toast.success(`Role updated to ${newRole}`);
                queryClient.invalidateQueries(['users', role]); // Refresh the list
            } else {
                toast.error('No user updated');
            }
        } catch (err) {
        console.error('Role update failed:', err);
        toast.error('Failed to update role');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong while fetching users.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-base-200 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
            <table className="table w-full">
            <thead>
                <tr className="bg-base-300">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Promote</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((user, index) => (
                <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name || 'N/A'}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="flex gap-2">
                    {user.role !== 'seller' && (
                        <button
                        className="btn btn-sm btn-success"
                        onClick={() => updateRole(user, 'seller')}
                        >
                        <FaUserTie className="mr-1" /> Make Seller
                        </button>
                    )}
                    {user.role !== 'admin' && (
                        <button
                        className="btn btn-sm btn-warning"
                        onClick={() => updateRole(user, 'admin')}
                        >
                        <FaUserShield className="mr-1" /> Make Admin
                        </button>
                    )}
                    {user.role === 'admin' && (
                        <button
                        className="btn btn-sm btn-error"
                        onClick={() => updateRole(user, 'user')}
                        >
                        <FaUserShield className="mr-1" /> Remove Admin
                        </button>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ManageUsers;
