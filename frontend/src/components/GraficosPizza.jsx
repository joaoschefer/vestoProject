import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "./GraficosPizza.css";

const coresGasto = ["#ff6b6b", "#ffa726", "#ab47bc", "#29b6f6"]
const coresInvest = ["#66bb6a", "#42a5f5", "#ef5350", "#ffca28"]

const dadosGastos = [
    { name: "Alimentação", value: 600 },
    { name: "Transporte", value: 300 },
    { name: "Moradia", value: 500 },
    { name: "Lazer", value: 400 },
];

const dadosInvestimentos = [
  { name: "Renda Fixa", value: 200 },
  { name: "Ações", value: 150 },
  { name: "Fundos", value: 100 },
  { name: "Criptomoedas", value: 50 },
];

function GraficosPizza() {
    return (
        <div className="graficos-container">
            <div className="grafico">
                <h3>Distribuição dos Gastos</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={dadosGastos} dataKey="value" nameKey="name" outerRadius={100} label>
                            {dadosGastos.map((_, index) => (
                                <Cell key={index} fill={coresGasto[index % coresGasto.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grafico">
                <h3>Distribuição dos Investimentos</h3>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={dadosInvestimentos}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                    >
                    {dadosInvestimentos.map((_, index) => (
                        <Cell key={index} fill={coresInvest[index % coresInvest.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default GraficosPizza;
