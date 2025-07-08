import React from 'react';
import { FaCartShopping } from "react-icons/fa6";

const Card = ({medicine}) => {
    const { name, description, image, price } = medicine;
    return (
        <div className="card w-full bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition">
            <figure>
                <img src={image} alt={name} className="h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{name}</h2>
                <p className="text-sm text-gray-600">
                {description.length > 80 ? description.slice(0, 80) + '...' : description}
                </p>
                <div className="flex justify-between items-center mt-3">
                <p className="text-primary font-bold text-lg">৳{price}</p>
                
                </div>
                <button className="btn btn-sm btn-primary">
                    <FaCartShopping className="mr-1" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;