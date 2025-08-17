import axios from 'axios';
import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify';
import useAuth from '../Context/useAuth';

const Card = ({medicine}) => {
    const {user} = useAuth();
    const addToCart = async (email, p_id, qty = 1) => {
        
        try {
        const res = await axios.post('https://ph-assignment-12-backend.vercel.app/cart', {
            email,
            p_id,
            qty
        });
        
        toast.success('✅ Added to cart:', res.data)
        } catch (error) {
        console.error('❌ Failed to add to cart:', error);
        toast.error('❌ Failed to add to cart:', error);
        }
    };
    const { name, description, image, price } = medicine;

    return (
        <div className="card w-full min-h-100 bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition">
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
                <button className="btn btn-sm btn-primary"
                        onClick={()=>addToCart(user.email, medicine._id, 1)}>
                    <FaCartShopping className="mr-1" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;