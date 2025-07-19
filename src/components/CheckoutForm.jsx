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
    console.log(cartItems)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        try {
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
            const orderDate = new Date();

            const orders = cartItems.map(item => ({
            userEmail: user.email,
            sellerEmail : item.sellerEmail,
            productId: item._id,
            productName: item.name,
            qty: item.qty,
            price: item.price,
            subtotal: item.price * item.qty,
            paymentId,
            orderDate
            }));

            // ✅ Save all orders
            await axios.post('http://localhost:3000/orders', orders);

            // ✅ Clear cart
            await axios.delete('http://localhost:3000/cart', {
            params: { email: user.email }
            });

            // ✅ Redirect to invoice
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
