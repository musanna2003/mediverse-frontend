import React from 'react';
import ProductTable from '../../components/ProductTable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ManageMedicines = () => {

    const fetchMedicines = async () => {
        const params = {};
        params.sellerEmail = "john@email.com";
        const res = await axios.get('http://localhost:3000/products', { params });
        return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['medicines'], // refetches on any change
        queryFn: fetchMedicines,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div>
            {/* 🧾 Product Table */}
            <ProductTable products={data} role={"seller"} />
        </div>
    );
};

export default ManageMedicines;