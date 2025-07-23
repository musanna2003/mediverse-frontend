import React from 'react';

const Hero = ({ img, txt }) => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${img})`, // ✅ Use template literal to inject the prop
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{txt}</h1>
                    <p className="mb-5"></p> {/* ✅ Use the txt prop here */}
                </div>
            </div>
        </div>
    );
};

export default Hero;