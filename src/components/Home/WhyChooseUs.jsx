import React from 'react';
import {
  FaHeadset,
  FaTruck,
  FaCheckCircle,
  FaStoreAlt,
  FaUndo,
  FaTags,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaHeadset className="text-3xl text-primary" />,
    title: '24/7 Customer Support',
    description: 'Always ready to help with your queries and issues.',
  },
  {
    icon: <FaTruck className="text-3xl text-success" />,
    title: 'Fast & Secure Delivery',
    description: 'Receive your medicines on time, every time.',
  },
  {
    icon: <FaCheckCircle className="text-3xl text-accent" />,
    title: 'Authentic Medicines',
    description: 'We guarantee original and quality-checked products.',
  },
  {
    icon: <FaStoreAlt className="text-3xl text-warning" />,
    title: 'Registered Pharmacies',
    description: 'All vendors are verified and government-approved.',
  },
  {
    icon: <FaUndo className="text-3xl text-error" />,
    title: 'Easy Returns & Refunds',
    description: 'Hassle-free return and refund policy.',
  },
  {
    icon: <FaTags className="text-3xl text-info" />,
    title: 'Transparent Pricing',
    description: 'No hidden charges. What you see is what you pay.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-200 shadow-md p-4 hover:shadow-lg flex flex-col items-center transition"
          >
            <div className="flex items-center gap-4 mb-3">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
