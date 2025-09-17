import React, { useState, useEffect } from "react";
import "./Investimentos.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { listarInvestimentos, criarInvestimento } from "../services/api";

function Investimentos() {
  const [investimento, setInvestimento] = useState([]);

  const [novoInvestimento, setNovoInvestimento] = useState({
    tipo: "acao",
    ativo: "",
    valor: "",
    cotas: "",
    data: "",
  });

  const precisaCotas = novoInvestimento.tipo === "acao" || novoInvestimento.tipo === "fundoimobiliario";

  useEffect(() => {
    (async () => {
      try {
        const data = await listarInvestimentos();
        setInvestimento(data);
      } catch (e) {
        console.error(e);
        alert("Falha ao carregar investimentos");
      }
    })();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setNovoInvestimento((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!novoInvestimento.valor || Number(novoInvestimento.valor) <= 0) {
      alert("Informe um valor válido.");
      return;
    }
    if (!novoInvestimento.data) {
      alert("Informe a data.");
      return;
    }
    if (precisaCotas && (!novoInvestimento.cotas || Number(novoInvestimento.cotas) <= 0)) {
      alert("Para Ação/FII, informe a quantidade de cotas.");
      return;
    }

    const payload = {
      tipo: novoInvestimento.tipo,
      ativo: novoInvestimento.ativo,
      valor: novoInvestimento.valor,
      data: novoInvestimento.data,
      cotas: precisaCotas ? novoInvestimento.cotas : null,
    };

    try {
      const criado = await criarInvestimento(payload);
      setInvestimento((lista) => [criado, ...lista]);
      setNovoInvestimento((prev) => ({
        ...prev,
        valor: "",
        cotas: "",
        data: "",
      }));
    } catch (e) {
      console.error(e);
      alert("Falha ao salvar investimento. Verifique os campos.");
    }
  }

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="investimentos">
          <h1>Página Principal de Investimentos</h1>

          <form className="form-investimento" onSubmit={handleSubmit}>
            <label>
              Tipo
              <select name="tipo" value={novoInvestimento.tipo} onChange={handleChange}>
                <option value="acao">Ação</option>
                <option value="fundoimobiliario">Fundo Imobiliário</option>
                <option value="rendafixa">Renda Fixa</option>
                <option value="eua">Estados Unidos</option>
              </select>
            </label>

            <label>
              Ativo (sigla)
              <input
                type="text"
                name="ativo"
                value={novoInvestimento.ativo}
                onChange={handleChange}
                placeholder="Ex.: PETR4, VISC11"
                required
              />
            </label>

            <label>
              Valor (R$)
              <input
                type="number"
                name="valor"
                value={novoInvestimento.valor}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </label>

            <label>
              Cotas
              <input
                type="number"
                name="cotas"
                value={novoInvestimento.cotas}
                onChange={handleChange}
                step="0.01"
                min="0"
                disabled={!precisaCotas} // bloqueado para renda fixa e eua
              />
            </label>

            <label>
              Data
              <input
                type="date"
                name="data"
                value={novoInvestimento.data}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit">Salvar</button>
          </form>

          <ul style={{ marginTop: 16 }}>
            {investimento.map((inv) => (
              <li key={inv.id}>
                <strong>{inv.tipo}</strong> - {inv.atibo} - R$ {inv.valor}
                {inv.cotas !== null && inv.cotas !== "" ? ` - ${inv.cotas} cotas` : ""}
                {` — ${inv.data}`}
              </li>
            ))}
          </ul>

        </main>
      </div>
    </>
  );
}

export default Investimentos;
