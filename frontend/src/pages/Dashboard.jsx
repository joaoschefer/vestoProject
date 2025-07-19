import React from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GraficosPizza from "../components/GraficosPizza";

function Dashboard() {
  const dados = {
    ganhos: 3500,
    gastos: 1800,
    investimentos: 500,
  };

  const saldo = dados.ganhos - dados.gastos;

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="dashboard">
          <h1>Bem-vindo ao Dashboard</h1>
          <div className="cards">
            <div className="card ganho">
              <h2>Ganhos</h2>
              <p>R$ {dados.ganhos.toFixed(2)}</p>
            </div>
            <div className="card gasto">
              <h2>Gastos</h2>
              <p>R$ {dados.gastos.toFixed(2)}</p>
            </div>
            <div className="card saldo">
              <h2>Saldo</h2>
              <p>R$ {saldo.toFixed(2)}</p>
            </div>
            <div className="card investimento">
              <h2>Investimentos</h2>
              <p>R$ {dados.investimentos.toFixed(2)}</p>
            </div>
          </div>
          <GraficosPizza />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
