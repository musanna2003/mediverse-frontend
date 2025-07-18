import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51RlXSMRR38pwOg3putQIGmYn0VIlvjM5WXm54efcMzsuZI2fP1JpruowquP64yhAYufiY55d4ASmxqkSeA2cAMCf00WbUBhQOL'); // ✅ replace with your real key

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.items || [];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>

      {/* 🔹 Order Summary Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-left">
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price (৳)</th>
              <th>Total (৳)</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{(item.qty * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🔸 Total & Divider */}
        <div className="mt-2 border-t pt-4 text-right font-semibold">
          Total: ৳{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* 🔹 Stripe Payment Form */}
      <Elements stripe={stripePromise}>
        <CheckoutForm
          cartItems={cartItems}
          totalAmount={totalAmount}
          onSuccess={(paymentId) =>
            navigate('/invoice', {
              state: { cartItems, totalAmount, paymentId },
            })
          }
        />
      </Elements>
    </div>
  );
};

export default CheckoutPage;

