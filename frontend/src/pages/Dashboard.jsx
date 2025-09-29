import React, { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GraficosPizza from "../components/GraficosPizza";

const API_URL = "http://localhost:8000/api/transacoes/";

function Dashboard() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        setLoading(true);
        setErro("");
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error(`Falha ao buscar: ${resp.status}`);
        const data = await resp.json();
        setTransacoes(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErro("Não foi possivel carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransacoes();
  }, []);

  const formatarBRL = (v) =>
    new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"})
      .format(Number(v || 0));

  const { ganhos, gastos, investimentos, saldo } = useMemo(() => {
    const soma = (arr) => 
      arr.reduce((acc, t) => acc + Number(t?.valor || 0), 0);

    const ganhosArr = transacoes.filter((t) => t.tipo === "ganho");
    const gastosArr = transacoes.filter((t) => t.tipo === "despesa");
    const investimentosArr = ganhosArr.filter(
      (t) => (t.categoria || "").toLowerCase() === "investimentos"
    );

    const totalGanhos = soma(ganhosArr);
    const totalGastos = soma(gastosArr);
    const totalInvest = soma(investimentosArr);

    return {
      ganhos: totalGanhos,
      gastos: totalGastos,
      investimentos: totalInvest,
      saldo: totalGanhos - totalGastos,
    };
  }, [transacoes]);

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="dashboard">
          <h1>Bem-vindo ao Dashboard</h1>

          {loading && <p>Carregando...</p>}
          {erro && <p style={{ color: "red" }}>{erro}</p>}

          {!loading && !erro && (
            <>
              <div className="cards">
                <div className="card ganho">
                  <h2>Ganhos</h2>
                  <p>{formatarBRL(ganhos)}</p>
                </div>
                <div className="card gasto">
                  <h2>Gastos</h2>
                  <p>{formatarBRL(gastos)}</p>
                </div>
                <div className="card saldo">
                  <h2>Saldo</h2>
                  <p>{formatarBRL(saldo)}</p>
                </div>
                <div className="card investimento">
                  <h2>Investimentos</h2>
                  <p>{formatarBRL(investimentos)}</p>
                </div>
              </div>

              <GraficosPizza transacoes={transacoes} />
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Dashboard;
