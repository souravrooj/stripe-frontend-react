import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Ensure the correct Stripe public key
const stripePromise = loadStripe('pk_test_51Q16b4AP8Blv4RX0JKUBAE3RZTGkkUkkIZgYB7LDb4hPVnzDlJDIEHaplQBdrzGYICqFLHSJnAAo0vyt9qcPXvZF008fmYLkDM');

const SubscriptionPage = () => {
    const [plans, setPlans] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Ensure the correct backend URL is set
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Fallback to localhost

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/plans`);
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, [apiUrl]);

    const handleSubscription = async (e) => {
        e.preventDefault();
        if (!selectedPlan || !email) return;

        const stripe = await stripePromise;

        try {
            const { data: session } = await axios.post(`${apiUrl}/api/checkout-session`, {
                planId: selectedPlan,
                customerEmail: email
            });

            // Redirect to checkout
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Subscribe to a Plan</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="border rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                        <p className="text-gray-600 mb-4">
                            ${plan.amount / 100} / {plan.interval}
                        </p>
                        <button 
                            onClick={() => setSelectedPlan(plan.stripePlanId)}
                            className={`w-full py-2 px-4 rounded ${
                                selectedPlan === plan.stripePlanId
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {selectedPlan === plan.stripePlanId ? 'Selected' : 'Select'}
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubscription} className="mt-8 max-w-md mx-auto">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
                <button
                    type="submit"
                    disabled={!selectedPlan || !email}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default SubscriptionPage;
