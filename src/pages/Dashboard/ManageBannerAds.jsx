import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
// import { useState } from 'react';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const ManageBannerAds = () => {
    const queryClient = useQueryClient();

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['banner-ads'],
        queryFn: async () => {
        const res = await axiosSecure.get('https://ph-assignment-12-backend.vercel.app/admin/offer-requests');
        return res.data;
        }
    });

    const toggleMutation = useMutation({
        mutationFn: async ({ productId, isActive }) => {
            return await axiosSecure.patch(
            `https://ph-assignment-12-backend.vercel.app/admin/offer-requests/${productId}`,
            { isActive }
            );
        },
        onSuccess: () => queryClient.invalidateQueries(['banner-ads']),
        });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Manage Banner Advertisements</h2>
        <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
            <thead>
                <tr>
                <th>Image</th>
                <th>Medicine Name</th>
                <th>Description</th>
                <th>Seller Email</th>
                <th>Show in Slider</th>
                </tr>
            </thead>
            <tbody>
                {ads.map((ad) => (
                <tr key={ad._id}>
                    <td>
                    <img src={ad.image} alt="med" className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td>{ad.name}</td>
                    <td>{ad.description}</td>
                    <td>{ad.sellerEmail}</td>
                    <td>
                    <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={ad.isActive}
                        onChange={() =>
                            toggleMutation.mutate({ productId: ad.productId, isActive: !ad.isActive })
                        }
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ManageBannerAds;
