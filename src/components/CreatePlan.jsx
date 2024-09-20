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
        <div>
            <h1>Create Subscription Plan</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Plan Name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount ($)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                </select>
                <button type="submit">Create Plan</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreatePlan;
