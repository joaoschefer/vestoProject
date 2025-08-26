import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./GraficosPizza.css";

const coresGasto = ["#ff6b6b", "#ffa726", "#ab47bc", "#29b6f6", "#26a69a", "#7e57c2", "#8d6e63", "#78909c"];
const coresInvest = ["#66bb6a", "#42a5f5", "#ef5350", "#ffca28", "#8d6e63", "#7e57c2", "#26a69a", "#29b6f6"];

function classificarInvestimentoPorDescricao(descricao = "") {
  const d = descricao.toLowerCase();
  if (/(renda\s*f(i|í)xa|cdb|tesouro|lci|lca|lft|lt(n|n))/i.test(d)) return "Renda Fixa";
  if (/(a(ç|c)ões|acao|stock|b3)/i.test(d)) return "Ações";
  if (/(fii|fundo imobili(á|a)rio|fundo)/i.test(d)) return "Fundos";
  if (/(cripto|bitcoin|btc|ethereum|eth|solana|sol|bnb)/i.test(d)) return "Criptomoedas";
  return "Outros";
}

function somarPorChave(itens, chaveFn) {
  return itens.reduce((acc, t) => {
    const k = chaveFn(t);
    const v = Number(t?.valor || 0);
    if (!k || !isFinite(v)) return acc;
    acc[k] = (acc[k] || 0) + v;
    return acc;
  }, {});
}

function GraficosPizza({ transacoes = [] }) {
  const dadosGastos = useMemo(() => {
    const despesas = transacoes.filter((t) => t?.tipo === "despesa");
    const mapa = somarPorChave(despesas, (t) => t?.categoria || "Outros");
    return Object.entries(mapa)
      .map(([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [transacoes]);

  const dadosInvestimentos = useMemo(() => {
    const inv = transacoes.filter(
      (t) =>
        t?.tipo === "ganho" &&
        (t?.categoria || "").toLowerCase() === "investimentos"
    );

    const mapa = somarPorChave(inv, (t) => classificarInvestimentoPorDescricao(t?.descricao));

    return Object.entries(mapa)
      .map(([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [transacoes]);

  const formatterBRL = (v) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);

  const renderVazio = (texto) => (
    <div style={{ textAlign: "center", padding: 16, opacity: 0.8 }}>
      {texto}
    </div>
  );

  return (
    <div className="graficos-container">
      <div className="grafico">
        <h3>Distribuição dos Gastos</h3>
        <ResponsiveContainer width="100%" height={300}>
          {dadosGastos.length === 0 ? (
            renderVazio("Sem dados de gastos para exibir.")
          ) : (
            <PieChart>
              <Pie
                data={dadosGastos}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${formatterBRL(value)}`}
              >
                {dadosGastos.map((_, index) => (
                  <Cell
                    key={`gasto-${index}`}
                    fill={coresGasto[index % coresGasto.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatterBRL(v)} />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grafico">
        <h3>Distribuição dos Investimentos</h3>
        <ResponsiveContainer width="100%" height={300}>
          {dadosInvestimentos.length === 0 ? (
            renderVazio("Sem dados de investimentos para exibir.")
          ) : (
            <PieChart>
              <Pie
                data={dadosInvestimentos}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${formatterBRL(value)}`}
              >
                {dadosInvestimentos.map((_, index) => (
                  <Cell
                    key={`inv-${index}`}
                    fill={coresInvest[index % coresInvest.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatterBRL(v)} />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GraficosPizza;
