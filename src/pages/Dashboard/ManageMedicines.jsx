import React from 'react';
import ProductTable from '../../components/ProductTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../../Context/useAuth';

const ManageMedicines = () => {
    const queryClient = useQueryClient();
    const {user} = useAuth();

    const fetchMedicines = async () => {
        const params = { sellerEmail: user.email};
        const res = await axios.get('http://localhost:3000/products', { params });
        return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines,
    });

    const handleDeleteProduct = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/products/${id}`);
            console.log(res.data)
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
