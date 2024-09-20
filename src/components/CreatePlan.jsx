import React, { useState } from 'react';
import axios from 'axios';

const CreatePlan = () => {
    const [productName, setProductName] = useState('');
    const [planName, setPlanName] = useState('');
    const [amount, setAmount] = useState('');
    const [interval, setInterval] = useState('month');
    const [message, setMessage] = useState('');
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(`${apiUrl}/api/plans`, {
                productName,
                planName,
                amount: parseInt(amount) * 100, // Convert to cents
                interval,
            });
            setMessage(`Plan created successfully: ${response.data.name}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Create Subscription Plan</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Plan Name"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="number"
                        placeholder="Amount ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <select 
                        value={interval} 
                        onChange={(e) => setInterval(e.target.value)}
                        className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                    </select>
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Create Plan
                </button>
            </form>
            {message && (
                <p className={`mt-6 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CreatePlan;
