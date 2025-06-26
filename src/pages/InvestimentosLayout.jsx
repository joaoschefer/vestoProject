import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Investimentos() {
    return(
        <>
            <Header />
            <div className="layout">
                <Sidebar />
                <main className="investimentos">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Investimentos;