
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q16b4AP8Blv4RX0JKUBAE3RZTGkkUkkIZgYB7LDb4hPVnzDlJDIEHaplQBdrzGYICqFLHSJnAAo0vyt9qcPXvZF008fmYLkDM');

const SubscriptionPage = () => {
    const [plans, setPlans] = useState([]);
    
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchPlans = async () => {
            console.log("API URL:", apiUrl); // Log the API URL
            try {
                const response = await fetch(`${apiUrl}/api/plans`); // Your API endpoint
                const data = await response.json();
                setPlans(data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, []);

    const handleSubscription = async (planId) => {
        const stripe = await stripePromise;

        // Create Checkout Session
        const response = await fetch(`${apiUrl}/api/checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planId }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <div>
            <h1>Subscribe to a Plan</h1>
            {plans.map(plan => (
                <div key={plan.id} style={{ marginBottom: '20px' }}>
                    <h2>{plan.name}</h2>
                    <p>Price: ${plan.amount / 100} {plan.interval}</p>
                    <button onClick={() => handleSubscription(plan.stripePlanId)}>
                        Subscribe
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SubscriptionPage;
