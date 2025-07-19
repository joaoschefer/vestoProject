import React from "react";
import "./Investimentos.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Investimentos() {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="investimentos">
          <h1>Página Principal de Investimentos</h1>
          <p>Gráficos, KPIs, resumo de carteira etc.</p>
        </main>
      </div>
    </>
  );
}

export default Investimentos;
