import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const fetchSellerRequests = async () => {
  const res = await axios.get('http://localhost:3000/seller?state=pending');
  return res.data;
};

const SellerReq = () => {
  const { data: sellers = [], isLoading } = useQuery({
    queryKey: ['pendingSellers'],
    queryFn: fetchSellerRequests,
  });

  const queryClient = useQueryClient();
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handleApprove = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/seller/state`, {
        email: selectedSeller.email,
        state: 'approved',
      });
      if (res.data.modifiedCount > 0) {
        toast.success('Seller approved!');
        queryClient.invalidateQueries(['pendingSellers']);
        closeModal();
      }
    } catch (err) {
      toast.error('Failed to approve seller',err);
    }
  };

  const handleReject = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/seller/${selectedSeller.email}`);
      if (res.data.deletedCount > 0) {
        toast.success('Seller request removed');
        queryClient.invalidateQueries(['pendingSellers']);
        closeModal();
      }
    } catch (err) {
      toast.error('Failed to delete seller',err);
    }
  };

  const closeModal = () => {
    document.getElementById('seller-modal').close();
    setSelectedSeller(null);
  };

  if (isLoading) return <p className="text-center py-10">Loading seller requests...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Requests</h2>
      <table className="table w-full table-zebra">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>License No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={seller._id}>
              <td>{index + 1}</td>
              <td><img src={seller.photoURL} alt="Seller" className="w-12 h-12 rounded-full" /></td>
              <td>{seller.fullName || 'N/A'}</td>
              <td>{seller.email}</td>
              <td>{seller.licenseNumber || 'N/A'}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedSeller(seller);
                    document.getElementById('seller-modal').showModal();
                  }}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  See Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="seller-modal" className="modal">
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={closeModal}
          >
            <FaTimes />
          </button>

          {selectedSeller && (
            <div className="space-y-2 mt-4">
              <h3 className="text-xl font-bold mb-3">Seller Details</h3>
              <img
                src={selectedSeller.photoURL}
                alt="Seller"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p><strong>Name:</strong> {selectedSeller.fullName}</p>
              <p><strong>Email:</strong> {selectedSeller.email}</p>
              <p><strong>Phone:</strong> {selectedSeller.phone}</p>
              <p><strong>Store:</strong> {selectedSeller.storeName}</p>
              <p><strong>Trade License:</strong> {selectedSeller.licenseNumber}</p>
              <p><strong>NID Number:</strong> {selectedSeller.nidNumber}</p>
              <p><strong>Address:</strong> {selectedSeller.address}</p>

              <div className="mt-4 flex gap-4">
                <button className="btn btn-success btn-sm" onClick={handleApprove}>
                  Approve
                </button>
                <button className="btn btn-error btn-sm" onClick={handleReject}>
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default SellerReq;
