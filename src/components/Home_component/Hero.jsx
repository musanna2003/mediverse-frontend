import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate("/shop", { state: { search: query } });
    }
  };

  return (
    <div
      className="hero h-[89vh]"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/TBCbvHRp/pharma.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Your Trusted Online Pharmacy</h1>
          <p className="mb-5">
            Find genuine medicines, health products, and essentials delivered to your
            doorstep with ease. Fast, reliable, and affordable healthcare starts here.
          </p>

          {/* Search Box */}
          <div className="join w-full mb-5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for medicines..."
              className="input bg-base-100/30 backdrop-blur-xl border border-base-content/10 shadow-xl rounded-l-4xl input-bordered join-item w-full"
            />
            <button
              onClick={handleSearch}
              className="btn rounded-r-4xl btn-primary join-item"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
