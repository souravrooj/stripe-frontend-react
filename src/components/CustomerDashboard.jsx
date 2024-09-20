import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [email, setEmail] = useState('');
    const [portalUrl, setPortalUrl] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (email) {
            const fetchSubscriptions = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/api/user/${email}`);
                    setSubscriptions(response.data.subscriptions);
                    setPortalUrl(response.data.portalUrl);
                } catch (error) {
                    console.error('Error fetching subscriptions:', error);
                }
            };

            fetchSubscriptions();
        }
    }, [email]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setEmail(email.trim());
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Your Subscriptions</h1>
                <form onSubmit={handleEmailSubmit} className="mb-6 flex justify-center">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-1/2 px-4 py-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="ml-2 bg-blue-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200">
                        Fetch Subscriptions
                    </button>
                </form>
                {subscriptions.length === 0 ? (
                    <p className="text-center text-gray-600">You have no subscriptions.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subscriptions.map(subscription => (
                            <div key={subscription.id} className="border rounded-lg p-6 shadow-lg bg-white transition-transform transform hover:scale-105">
                                <h2 className="text-2xl font-semibold mb-2 text-blue-600">{subscription.plan.nickname}</h2>
                                <p className="text-gray-700">Status: <span className="font-medium">{subscription.status}</span></p>
                                <p className="text-gray-700">Created On: <span className="font-medium">{new Date(subscription.created * 1000).toLocaleDateString()}</span></p>
                                <p className="text-gray-700">Next Billing: <span className="font-medium">{new Date(subscription.current_period_end * 1000).toLocaleDateString()}</span></p>
                                <p className="text-gray-700">Subscription ID: <span className="font-medium">{subscription.id}</span></p>
                            </div>
                        ))}
                    </div>
                )}
                {portalUrl && (
                    <div className="mt-6 text-center">
                        <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-blue-600 transition duration-200">
                            Manage Your Subscriptions
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
