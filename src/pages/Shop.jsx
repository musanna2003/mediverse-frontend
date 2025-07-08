import ProductTable from '../components/ProductTable';
import React, { useState } from 'react';
import { FaSortAmountDownAlt } from 'react-icons/fa';

const Shop = () => {
    const products = [
        {
            id: 1,
            name: 'Napa Extra 500mg',
            category: 'Pain Relief',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2FIMG-20231023-WA0193.jpg&w=640&q=100',
            price: 10,
            stock: 50,
        },
        {
            id: 2,
            name: 'Napa Extra 500mg',
            category: 'Pain Relief',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2FIMG-20231023-WA0193.jpg&w=640&q=100',
            price: 10,
            stock: 50,
        },
        {
            id: 3,
            name: 'Napa Extra 500mg',
            category: 'Pain Relief',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2FIMG-20231023-WA0193.jpg&w=640&q=100',
            price: 10,
            stock: 50,
        },
        {
            id: 4,
            name: 'Napa Extra 500mg',
            category: 'Pain Relief',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2FIMG-20231023-WA0193.jpg&w=640&q=100',
            price: 10,
            stock: 50,
        },
        // more products...
        ];

        const [searchTerm, setSearchTerm] = useState('');
        const [sortOrder, setSortOrder] = useState('');
        const [selectedCategory, setSelectedCategory] = useState('');
        console.log(sortOrder)
        const categories = ['All', ...new Set(products.map(p => p.category || 'Unknown'))];

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* 🔍 Filters and Sorting */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                {/* Search bar */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Handle your search logic here if needed (searchTerm is already being updated)
                        console.log("Searching for:", searchTerm);
                    }}
                    className="flex w-full md:max-w-md"
                    >
                    <input
                        type="text"
                        placeholder="Search medicine..."
                        className="input input-bordered rounded-r-none w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
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
            <ProductTable products={products} />
        </div>
    );
};

export default Shop;