// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePlan from './components/CreatePlan';
import SubscriptionPage from './components/SubscriptionPage';

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
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<CreatePlan />} />
                <Route path="/subscribe" element={<SubscriptionPage />} />
            </Routes>
        </Router>
    );
};

export default App;
