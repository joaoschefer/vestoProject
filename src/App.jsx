import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from "./pages/Dashboard"
import Despesas from "./pages/Despesas";
import InvestimentosLayout from "./pages/InvestimentosLayout";
import Investimentos from "./pages/Investimentos";
import NotasCorretagem from "./pages/NotasCorretagem";
import Categorias from "./pages/Categorias";
import Configuracoes from "./pages/Configuracoes";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/despesas" element={<Despesas />} />

        <Route path="/investimentos" element={<InvestimentosLayout />}>
          <Route index element={<Investimentos />} />
          <Route path="notascorretagem" element={<NotasCorretagem />} />
        </Route>

        <Route path="/categorias" element={<Categorias />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </Router>
  );
}

export default App;
