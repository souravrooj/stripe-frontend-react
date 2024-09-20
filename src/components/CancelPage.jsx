// src/components/CancelPage.jsx
import React from 'react';

const CancelPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Subscription Canceled</h1>
                <p className="text-gray-700 mb-4">
                    Your subscription process has been canceled. 
                </p>
                <a href="/subscribe" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
                    Back to Subscription Page
                </a>
            </div>
        </div>
    );
};

export default CancelPage;
