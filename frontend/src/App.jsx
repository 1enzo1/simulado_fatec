import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SeletorDeProva from './pages/SeletorDeProva';
import PaginaSimulado from './pages/PaginaSimulado';
import TelaDeResultados from './pages/TelaDeResultados';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <header className="bg-sky-700 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold hover:text-sky-200 transition-colors">
              Simulado FATEC Interativo
            </Link>
            {/* Podemos adicionar outros links de navegação aqui se necessário */}
          </nav>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<SeletorDeProva />} />
            <Route path="/simulado/:idProva" element={<PaginaSimulado />} />
            <Route path="/resultados/:idProva" element={<TelaDeResultados />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          <p>&copy; {new Date().getFullYear()} Jules - Assistente de Codificação. Todos os direitos reservados (simuladamente).</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
