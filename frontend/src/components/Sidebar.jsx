import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

function Sidebar() {

    const [openInv, setOpenInv] = useState(false);

    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/despesas">Despesas</Link></li>
                <li><Link to="/investimentos">Investimentos</Link></li>
                <li><Link to="/categorias">Categorias</Link></li>
                <li><Link to="/configuracoes">Configurações</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
