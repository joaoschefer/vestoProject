import React, { useState } from "react";
import "./Investimentos.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Investimentos() {
  const [modalAberto, setModalAberto] = useState(null);

  const [form, setForm] = useState({
    ativo: "",
    valor: "",
    quantidade: "",
    data: "",
  });

  function calcularTotal() {
    const valor = parseFloat(form.valor) || 0;
    const qtd = parseFloat(form.quantidade) || 0;
    return (valor * qtd).toFixed(2);
  }

  function abrirModal(tipo) {
    setModalAberto(tipo);
  }

  function fecharModal() {
    setModalAberto(null);
    setForm({ ativo: "", valor: "", quantidade: "", data: "" });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      tipo: modalAberto,
      ativo: form.ativo,
      valor: form.valor,
      quantidade: form.quantidade || null,
      total: calcularTotal(),
      data: form.data,
    };

    try {
      const resp = await fetch("http://localhost:8000/api/investimentos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        fecharModal();
      } else {
        alert("Erro ao salvar investimento");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  }

  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="investimentos">
          <h1>Investimentos</h1>

          <div className="botoes-investimentos">
            <button onClick={() => abrirModal("br")}>Bolsa BR</button>
            <button onClick={() => abrirModal("eua")}>EUA</button>
            <button onClick={() => abrirModal("cripto")}>Cripto</button>
          </div>

          {modalAberto && (
            <div className="modal-overlay" onClick={fecharModal}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>
                  {modalAberto === "br" && "Bolsa Brasileira"}
                  {modalAberto === "eua" && "Investimentos EUA"}
                  {modalAberto === "cripto" && "Criptomoedas"}
                </h2>

                <form className="form-investimento" onSubmit={handleSubmit}>
                  {modalAberto === "br" && (
                    <>
                      <label>
                        Ativo (B3)
                        <input
                          name="ativo"
                          type="text"
                          placeholder="Ex: PETR4"
                          value={form.ativo}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Valor por ativo
                        <input
                          name="valor"
                          type="number"
                          step="0.01"
                          value={form.valor}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Quantidade
                        <input
                          name="quantidade"
                          type="number"
                          step="1"
                          value={form.quantidade}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Total gasto
                        <input 
                          type="text"
                          value={calcularTotal()}
                          disabled
                        />
                      </label>
                    </>
                  )}

                  {modalAberto === "eua" && (
                    <>
                      <label>
                        Ativo (EUA)
                        <input
                          name="ativo"
                          type="text"
                          placeholder="Ex: AAPL"
                          value={form.ativo}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Valor em dólar
                        <input
                          name="valor"
                          type="number"
                          step="0.01"
                          value={form.valor}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Quantidade
                        <input
                          name="quantidade"
                          type="number"
                          step="1"
                          value={form.quantidade}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Total gasto
                        <input
                          type="text"
                          value={calcularTotal()}
                          disabled
                        />
                      </label>
                    </>
                  )}

                  {modalAberto === "cripto" && (
                    <>
                      <label>
                        Criptomoeda
                        <input
                          name="ativo"
                          type="text"
                          placeholder="Ex: BTC"
                          value={form.ativo}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Valor investido
                        <input
                          name="valor"
                          type="number"
                          step="0.01"
                          value={form.valor}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label>
                        Quantidade
                        <input
                          name="quantidade"
                          type="number"
                          step="0.000001"
                          value={form.quantidade}
                          onChange={handleChange}
                        />
                      </label>
                    </>
                  )}

                  <label>
                    Data
                    <input
                      name="data"
                      type="date"
                      value={form.data}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <div className="modal-actions">
                    <button type="button" onClick={fecharModal}>
                      Cancelar
                    </button>
                    <button type="submit">Salvar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Investimentos;
