import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import axios from 'axios';

interface Order {
    price: number,
    quantity: number,
}

export default function PaymentForm() {
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        let cart: Order[] = JSON.parse(localStorage.getItem('cart')) || [];
        setAmount(cart.reduce((total, item) => total + item.quantity * item.price, 0) * 100);
    }, [amount])
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create payment intent on backend
            const {data} = await axios.post('http://localhost:4000/create-payment-intent', {
                amount: amount,
                email: email,
                name: name,
                address: address,
            });

            const clientSecret = data.clientSecret;

            // Step 2: Confirm the payment with the Stripe client secret
            const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (stripeError) {
                setError(stripeError.message || 'An error occurred');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                alert('Payment succeeded!');
            }

        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Payment Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Amount Display (Read-Only) */}
                    <div>
                        <label htmlFor="amount" className="block text-gray-700">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            value={"$ " + (amount / 100).toFixed(2)}  // Displaying the amount in dollars with 2 decimal places
                            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Address Input */}
                    <div>
                        <label htmlFor="address" className="block text-gray-700">Shipping Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Card Element */}
                    <div>
                        <label className="block text-gray-700">Card Details</label>
                        <CardElement options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#333',
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSmoothing: 'antialiased',
                                    // border: '1px solid #ddd',
                                    padding: '12px',
                                    // borderRadius: '4px',
                                },
                            },
                        }}/>
                    </div>


                    {/* Error Message */}
                    {error && <div className="text-red-500 text-center">{error}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`w-full py-3 text-white font-semibold rounded-md transition duration-200 ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

