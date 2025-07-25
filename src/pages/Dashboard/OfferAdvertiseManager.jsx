import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaBullhorn } from 'react-icons/fa';
import useAuth from '../../Context/useAuth';
import uploadToCloudinary from '../../services/uploadToCloudinary';
import { toast } from 'react-toastify';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const OfferAdvertiseManager = ({ sellerEmail }) => {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [offerPercentage, setOfferPercentage] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dialogRef = useRef(null);
  const queryClient = useQueryClient();

  const fetchSellerProducts = async () => {
    const params = { sellerEmail: user.email };
    const res = await axiosSecure.get('http://localhost:3000/products', { params });
    return res.data;
  };

  const {
    data: products = [],
    isLoading,
    isError,
    // refetch,
  } = useQuery({
    queryKey: ['products', user.email],
    queryFn: fetchSellerProducts,
    enabled: !!user?.email,
  });

  const offered = products.filter((p) => p.discount > 0);
  const normal = products.filter((p) => p.discount === 0);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    dialogRef.current.showModal();
  };

  const handleSubmit = async () => {
    if (!selectedProduct || !offerPercentage) return;

    try {
      setUploading(true);
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const data = {
        name: selectedProduct.name,
        productId: selectedProduct._id,
        sellerEmail,
        percentage: parseInt(offerPercentage),
        image: imageUrl,
        description,
      };

      await axiosSecure.post('http://localhost:3000/admin/offer-requests', data);

      dialogRef.current.close();
      setOfferPercentage('');
      setDescription('');
      setImageFile(null);

      // 🔄 Refresh product list
      await queryClient.invalidateQueries(['products', user.email]);
      toast.success('Offer request submitted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <p className="text-center">Loading products...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Offered Products</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (৳)</th>
              <th>Discount %</th>
            </tr>
          </thead>
          <tbody>
            {offered.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.image} className="w-12 h-12 rounded" />
                </td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.discount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-bold">Normal Products</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (৳)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {normal.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.image} className="w-12 h-12 rounded" />
                </td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => handleOpenModal(p)}
                  >
                    <FaBullhorn className="mr-1" /> Add Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">
            Add Advertisement for {selectedProduct?.name}
          </h3>
          <div className="space-y-2">
            <label className="label">Discount Percentage</label>
            <input
              type="number"
              placeholder="Enter percentage"
              className="input input-bordered w-full"
              value={offerPercentage}
              onChange={(e) => setOfferPercentage(e.target.value)}
            />

            <label className="label">Upload Ad Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <label className="label">Short Description</label>
            <textarea
              placeholder="Why should this be advertised?"
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => dialogRef.current.close()}
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OfferAdvertiseManager;

