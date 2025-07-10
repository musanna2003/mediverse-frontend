import React from 'react';
import CountUp from 'react-countup';
import { FaPills, FaUsers, FaStore } from 'react-icons/fa';

const StatisticSection = () => {
  const stats = [
    {
      title: 'Medicines',
      icon: <FaPills className="text-primary text-4xl" />,
      value: 1250,
    },
    {
      title: 'Customers',
      icon: <FaUsers className="text-success text-4xl" />,
      value: 3200,
    },
    {
      title: 'Shops Registered',
      icon: <FaStore className="text-warning text-4xl" />,
      value: 210,
    },
  ];

  return (
    <div className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Our Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card bg-base-100 shadow-md border border-base-200">
            <div className="card-body items-center text-center">
              {stat.icon}
              <h3 className="text-2xl font-semibold mt-2">{stat.title}</h3>
              <p className="text-4xl font-bold text-accent mt-1">
                <CountUp end={stat.value} duration={2} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticSection;
