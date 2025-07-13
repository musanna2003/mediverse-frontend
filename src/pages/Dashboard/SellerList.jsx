import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';



const fetchSellers = async (state) => {
  const res = await axios.get('http://localhost:3000/seller', {
    params: { state }
  });
  return res.data;
};

const SellerList = () => {

    const state = "approved"
    const queryClient = useQueryClient();
    const [selectedSeller, setSelectedSeller] = useState(null);

    const { data: sellers, isLoading, isError } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetchSellers(state)
    });

    const handleRemove = async () => {
        if (!selectedSeller) return;

        try {
        const res = await axios.delete(`http://localhost:3000/seller/${selectedSeller.email}`);
        const res2 = await axios.put('http://localhost:3000/users/update', {
                email : selectedSeller.email ,
                role: "user",
            });
        console.log(res.data.success && res2.data)
        if (res.data?.success) {
            toast.success(`${selectedSeller.name} removed from sellers.`);
            queryClient.invalidateQueries(['sellers']);
            setSelectedSeller(null);
            document.getElementById('remove-seller-modal').close();
        } else {
            toast.warning('No changes made.');
        }
        } catch (err) {
        console.error('Failed to remove seller:', err);
        toast.error('Failed to remove seller.');
        }
    };

    if (isLoading) return <p>Loading sellers...</p>;
    if (isError) return <p>Failed to load sellers.</p>;

    return (
        <div className="overflow-x-auto max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">All Sellers</h2>
        <table className="table table-zebra w-full">
            <thead className="bg-base-200">
            <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Trade License</th>
                <th>Phone</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {sellers.map((seller, idx) => (
                <tr key={seller._id || idx}>
                <td>{idx + 1}</td>
                <td>
                    <img src={seller.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                </td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.licenseNumber || 'N/A'}</td>
                <td>{seller.phone || 'N/A'}</td>
                <td>
                    <button
                    onClick={() => {
                        setSelectedSeller(seller);
                        document.getElementById('remove-seller-modal').showModal();
                    }}
                    className="btn btn-sm btn-error"
                    >
                    <FaTrash /> Remove
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* 🔴 Confirm Delete Modal */}
        <dialog id="remove-seller-modal" className="modal">
            <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">Confirm Removal</h3>
            <p className="py-4">
                Are you sure you want to remove{' '}
                <span className="font-semibold">{selectedSeller?.name}</span> from sellers?
            </p>
            <div className="modal-action">
                <form method="dialog" className="flex gap-3">
                <button className="btn btn-sm">Cancel</button>
                <button
                    type="button"
                    onClick={handleRemove}
                    className="btn btn-sm btn-error"
                >
                    Yes, Remove
                </button>
                </form>
            </div>
            </div>
        </dialog>
        </div>
    );
};

export default SellerList;
