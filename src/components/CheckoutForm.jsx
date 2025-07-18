import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import useAuth from '../Context/useAuth';

const CheckoutForm = ({ cartItems, totalAmount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        try {
            // ✅ Create payment intent
            const { data: clientSecret } = await axios.post('http://localhost:3000/create-payment-intent', {
            amount: totalAmount,
            });

            const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
            });

            if (result.error) {
            setError(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
            const paymentId = result.paymentIntent.id;

            // ✅ Save the order to your database
            await axios.post('http://localhost:3000/orders', {
                userEmail: user.email, // make sure `user` is available in your context or props
                items: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                subtotal: item.price * item.qty
                })),
                totalAmount,
                paymentId
            });

            // ✅ Clear the cart (optional, recommended)
            await axios.delete('http://localhost:3000/cart', {
                params: { email: user.email }
            });

            // ✅ Navigate to the Invoice page
            onSuccess(paymentId);
            }
        } catch (err) {
            console.error(err);
            setError('Payment failed. Please try again.');
        }

        setLoading(false);
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <CardElement className="border p-4 rounded-md" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
