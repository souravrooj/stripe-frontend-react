// src/components/SuccessPage.jsx
import React from 'react';

const SuccessPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-green-100">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Subscription Successful!</h1>
                <p className="text-gray-700 mb-4">
                    Thank you for subscribing! Your subscription is now active.
                </p>
                <p className="text-gray-500">You will receive a confirmation email shortly.</p>
                <a href="/subscribe" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
                    Back to Subscription Page
                </a>
            </div>
        </div>
    );
};

export default SuccessPage;
