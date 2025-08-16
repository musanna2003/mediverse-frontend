import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const CategoryCardSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://ph-assignment-12-backend.vercel.app/admin/categories')
      .then((res) => {
        setCategories(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading categories...</div>;
  }

  return (
    <section className="py-10 px-4 md:px-10 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="card w-full bg-base-200 shadow-lg border hover:shadow-xl hover:scale-[1.02] transition duration-300 rounded-2xl"
            onClick={() => navigate('/shop', { state: { category: category.name } })}
          >
            <div className="card-body items-center text-center p-4">
              <div className="mb-4 w-24 h-24 rounded-full overflow-hidden shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="card-title text-lg font-semibold">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCardSection;

