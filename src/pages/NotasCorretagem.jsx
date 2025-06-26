import React, { useState } from "react";
import "./NotasCorretagem.css";

export default function NotasCorretagem() {
  const [nota, setNota] = useState(null);
  const [erro, setErro] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/importar-nota", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.erro) {
        setErro("PDF não reconhecido.");
        setNota(null);
      } else {
        setNota(data);
        setErro("");
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao enviar o arquivo.");
    }
  };

  return (
    <section className="notas-corretagem">
      <h1>Cadastrar Nota de Corretagem</h1>

      <input type="file" accept=".pdf" onChange={handleFile} />

      {erro && <p className="erro">{erro}</p>}

      {nota && (
        <form className="form-corretagem">
          <div className="form-group">
            <label>Data da Nota:</label>
            <input type="date" value={nota.data || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Tipo de Operação:</label>
            <input type="text" value={nota.tipo || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Ativo:</label>
            <input type="text" value={nota.ativo || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Quantidade:</label>
            <input type="number" value={nota.quantidade || 0} readOnly />
          </div>

          <div className="form-group">
            <label>Preço por Ativo:</label>
            <input type="number" value={nota.preco || 0} readOnly />
          </div>

          <div className="form-group">
            <label>Taxas:</label>
            <input type="number" value={nota.taxas || 0} readOnly />
          </div>
        </form>
      )}
    </section>
  );
}
