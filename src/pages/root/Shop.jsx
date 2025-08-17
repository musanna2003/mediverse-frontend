import ProductTable from '../../components/ProductTable';
import React, { useEffect, useState } from 'react';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const Shop = () => {

    const location = useLocation();
    const cat = location.state?.category || 'All'; // default fallback
    const searchQuery = location.state?.search || "";
    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const [sortOrder, setSortOrder] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(cat);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://ph-assignment-12-backend.vercel.app/admin/categories')
        .then((res) => {
            setCategories(res.data || []);
        })
        .catch((err) => {
            console.error('Error fetching categories:', err);
        });
    }, []);

    //functions

    const fetchMedicines = async () => {
        const params = {};

        if (searchTerm) params.search = searchTerm;
        if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
        if (sortOrder === 'low') params.sort = 'price_asc';
        else if (sortOrder === 'high') params.sort = 'price_desc';

        const res = await axiosSecure.get('https://ph-assignment-12-backend.vercel.app/products', { params });
        return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['medicines', searchTerm, selectedCategory, sortOrder], // refetches on any change
        queryFn: fetchMedicines,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;




   

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* 🔍 Filters and Sorting */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                {/* Search bar */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const searchValue = e.target.search.value;
                        setSearchTerm(searchValue); // 🔄 Triggers TanStack Query refetch
                    }}
                    className="flex w-full md:max-w-md"
                    >
                    <input
                        type="text"
                        placeholder="Search medicine..."
                        className="input input-bordered rounded-r-none w-full"
                        name="search"
                    />
                    <button type="submit" className="btn btn-primary rounded-l-none">
                        Search
                    </button>
                </form>



                {/* Category dropdown */}
               <select
                    className="select select-bordered w-full md:max-w-xs"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                    <option value="All">All Categories</option>
                    {categories.map((cat, idx) => (
                        <option key={cat._id || idx} value={cat.name}>
                        {cat.name}
                        </option>
                    ))}
                </select>

                {/* Sort dropdown */}
                <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1 btn-outline">
                    <FaSortAmountDownAlt className="mr-2" />
                    Sort by Price
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
                >
                    <li><button onClick={() => setSortOrder('low')}>Low to High</button></li>
                    <li><button onClick={() => setSortOrder('high')}>High to Low</button></li>
                    <li><button onClick={() => setSortOrder('')}>Default</button></li>
                </ul>
                </div>
            </div>

            {/* 🧾 Product Table */}
            <ProductTable products={data} cat={cat} role={"user"} />
        </div>
    );
};

export default Shop;