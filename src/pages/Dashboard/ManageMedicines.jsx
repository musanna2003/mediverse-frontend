import React from 'react';
import ProductTable from '../../components/ProductTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import useAuth from '../../Context/useAuth';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const ManageMedicines = () => {
    const queryClient = useQueryClient();
    const {user} = useAuth();

    const fetchMedicines = async () => {
        const params = { sellerEmail: user.email};
        const res = await axiosSecure.get('https://ph-assignment-12-backend.vercel.app/products', { params });
        return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines,
    });

    const handleDeleteProduct = async (id) => {
        try {
            const res = await axiosSecure.delete(`https://ph-assignment-12-backend.vercel.app/products/${id}`);
            if (res.data?.deletedId) {
                toast.success('Product deleted successfully!');
                queryClient.refetchQueries(['medicines']);
            } else {
                toast.error('Failed to delete product!');
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error('Error deleting product!');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div>
            <ProductTable products={data} onDelete={handleDeleteProduct} role={"seller"} />
        </div>
    );
};

export default ManageMedicines;
