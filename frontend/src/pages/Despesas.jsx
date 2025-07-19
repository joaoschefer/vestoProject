import React, { useState, useEffect } from "react";
import "./Despesas.css"

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Despesas() {

    const [transacoes, setTransacoes] = useState([]);

    const [novaTransacao, setNovaTransacao] = useState({
        tipo: "despesa",
        valor: "",
        data: "",
        descricao: "",
        categoria: "",
        metodoPagamento: "",
    });

    const [categoriasDespesa, setCategoriasDespesa] = useState([
        "Alimentação",
        "Transporte",
        "Moradia",
        "Lazer",
        "Educação",
        "Saúde",
        "Contas Fixas",
        "Outros"
    ]);

    const [categoriasGanho, setCategoriasGanho] = useState([
        "Salário",
        "Freelance",
        "Investimentos",
        "Presente",
        "Vendas",
        "Outros Ganhos"
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovaTransacao({ ...novaTransacao, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!novaTransacao.valor || !novaTransacao.data || !novaTransacao.categoria || !novaTransacao.tipo) {
            alert("Por favor, preencha o valor, data, tipo e categoria da transação.");
            return;
        }

        setTransacoes([...transacoes, { ...novaTransacao, id: Date.now() }]);

        setNovaTransacao({
            tipo: "despesa",
            valor: "",
            data: "",
            descricao: "",
            categoria: "",
            metodoPagamento: "",
        })
    };

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pr-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    };

    const categoriasDisponiveis = novaTransacao.tipo === "despesa" ? categoriasDespesa : categoriasGanho;

    return(
        <>
            <Header />
            <div className="layout">
                <Sidebar />
                <main className="despesas-content">
                    <h1>Movimentações Financeiras</h1>

                    <section className="adicionar-transacao">
                        <h2>Registrar Nova Movimentação</h2>
                        <form onSubmit={handleSubmit} className="transacao-form">
                            <div className="form-group">
                                <label htmlFor="tipo">Tipo de Transação:</label>
                                <select id="tipo" name="tipo" value={novaTransacao.tipo} onChange={handleChange} required>
                                    <option value="despesa">Despesas</option>
                                    <option value="ganho">Ganho (Receita)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="valor">Valor (R$):</label>
                                <input type="number" id="valor" name="valor" value={novaTransacao.valor} onChange={handleChange} step="0.01" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="data">Data:</label>
                                <input
                                    type="date"
                                    id="data"
                                    name="data"
                                    value={novaTransacao.data}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição:</label>
                                <input
                                    type="text"
                                    id="descricao"
                                    name="descricao"
                                    value={novaTransacao.descricao}
                                    onChange={handleChange}
                                    placeholder="Ex: Jantar na pizzaria / Salário mensal"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="categoria">Categoria:</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={novaTransacao.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categoriasDisponiveis.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="metodoPagamento">Método:</label>
                                <select
                                    id="metodoPagamento"
                                    name="metodoPagamento"
                                    value={novaTransacao.metodoPagamento}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione um método</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                    <option value="Pix">Pix</option>
                                    <option value="Boleto">Boleto</option>
                                    <option value="Transferência Bancária">Transferência Bancária</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <button type="submit" className="btn-adicionar">Adicionar Movimentação</button>        
                        </form>
                    </section>

                    <section className="lista-transacoes">
                        <h2>Histórico de Movimentações</h2>
                        {transacoes.length === 0 ? (
                            <p>Nenhuma movimentação registrada ainda.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Tipo</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Método</th>
                                        <th>Valor</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transacoes.map((transacao) => (
                                        <tr key={transacao.id}>
                                            <td>{transacao.data}</td>
                                            <td>
                                                <span className={`tipo-tag ${transacao.tipo}`}>
                                                    {transacao.tipo === 'despesa' ? 'Despesa' : 'Ganho'}
                                                </span>
                                            </td>
                                            <td>{transacao.descricao || '-'}</td>
                                            <td>{transacao.categoria}</td>
                                            <td>{transacao.metodoPagamento || '-'}</td>
                                            <td className={transacao.tipo === 'despesa' ? 'valor-despesa' : 'valor-ganho'}>
                                                {formatarMoeda(transacao.valor)}
                                            </td>
                                            <td>
                                                <button className="btn-action">Editar</button>
                                                <button className="btn-action btn-delete">Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
}

export default Despesas;