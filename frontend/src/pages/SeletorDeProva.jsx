import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProvasDisponiveis } from '../services/api';

function SeletorDeProva() {
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarProvas = async () => {
      try {
        setLoading(true);
        const data = await fetchProvasDisponiveis();
        setProvas(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar as provas. Verifique se o backend está rodando e acessível.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    carregarProvas();
  }, []);

  if (loading) {
    return <div className="text-center mt-10"><p className="text-xl">Carregando provas...</p></div>;
  }

  if (error) {
    return <div className="text-center mt-10 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
        <p className="font-bold">Erro!</p>
        <p>{error}</p>
      </div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">Selecione o Simulado</h1>
      {provas.length > 0 ? (
        <ul className="space-y-4">
          {provas.map((prova) => (
            <li key={prova.id}>
              <Link
                to={`/simulado/${prova.id}`}
                className="block w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {prova.nome}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">Nenhuma prova disponível no momento.</p>
      )}
    </div>
  );
}

export default SeletorDeProva;
