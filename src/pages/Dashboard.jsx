import React from 'react';
import "./Dashboard.css";

import Sidebar from '../components/Sidebar';

function Dashboard() {
    return (
        <div>
            <Sidebar />
            <div className="main-content">
                <h1>Bem-vindo ao Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;
