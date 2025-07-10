import React from 'react';
import { FaCapsules, FaSyringe, FaTablets, FaPills, FaHeart } from 'react-icons/fa';
import { FaKitMedical } from "react-icons/fa6";


const categories = [
  { id: 1, name: 'Capsules', icon: <FaCapsules className="text-4xl text-primary" />, count: 120 },
  { id: 2, name: 'Injections', icon: <FaSyringe className="text-4xl text-primary" />, count: 45 },
  { id: 3, name: 'Tablets', icon: <FaTablets className="text-4xl text-primary" />, count: 200 },
  { id: 4, name: 'Heart Care', icon: <FaHeart className="text-4xl text-primary" />, count: 32 },
  { id: 5, name: 'First Aid', icon: <FaKitMedical className="text-4xl text-primary" />, count: 58 },
  { id: 6, name: 'Pain Relief', icon: <FaPills className="text-4xl text-primary" />, count: 90 },
];

const CategoryCardSection = () => {
  return (
    <section className="py-10 px-4 md:px-10 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
        {categories.map(category => (
          <div key={category.id} className="card shadow-md bg-base-200 hover:shadow-lg transition duration-300">
            <div className="card-body items-center text-center">
              <div className="mb-4">{category.icon}</div>
              <h3 className="card-title">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} Medicines</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCardSection;
