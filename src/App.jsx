// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePlan from './components/CreatePlan';
import SubscriptionPage from './components/SubscriptionPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import CustomerDashboard from './components/CustomerDashboard';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Create Plan</Link>
                    </li>
                    <li>
                        <Link to="/subscribe">Subscribe</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<CreatePlan />} />
                <Route path="/subscribe" element={<SubscriptionPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="/dashboard" element={<CustomerDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
