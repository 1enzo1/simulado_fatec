import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProvaDetalhes } from '../services/api';
import CartaoQuestao from '../components/CartaoQuestao';
import Navegacao from '../components/Navegacao';
import BarraDeProgresso from '../components/BarraDeProgresso';

function PaginaSimulado() {
  const { idProva } = useParams();
  const navigate = useNavigate();
  const [prova, setProva] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [questaoAtualIdx, setQuestaoAtualIdx] = useState(0);
  const [respostasUsuario, setRespostasUsuario] = useState({}); // formato: { "01": "A", "02": "C", ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDetalhesProva = async () => {
      try {
        setLoading(true);
        const data = await fetchProvaDetalhes(idProva);
        setProva(data);
        setQuestoes(data.questoes || []);
        // Inicializa as respostas do usuário como um objeto vazio ou com nulls
        const respostasIniciais = (data.questoes || []).reduce((acc, q) => {
          acc[q.numero] = null;
          return acc;
        }, {});
        setRespostasUsuario(respostasIniciais);
        setError(null);
      } catch (err) {
        setError(`Falha ao carregar os detalhes da prova ${idProva}. Verifique a API e o ID da prova.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (idProva) {
      carregarDetalhesProva();
    }
  }, [idProva]);

  const handleSelecaoResposta = (numeroQuestao, alternativa) => {
    setRespostasUsuario(prev => ({
      ...prev,
      [numeroQuestao]: alternativa
    }));
  };

  const proximaQuestao = () => {
    if (questaoAtualIdx < questoes.length - 1) {
      setQuestaoAtualIdx(prev => prev + 1);
    }
  };

  const questaoAnterior = () => {
    if (questaoAtualIdx > 0) {
      setQuestaoAtualIdx(prev => prev - 1);
    }
  };

  const finalizarSimulado = () => {
    // Lógica para finalizar e navegar para a tela de resultados
    // Passando o estado das respostas e os detalhes da prova para a próxima tela
    navigate(`/resultados/${idProva}`, { state: { respostasUsuario, prova } });
    console.log("Simulado finalizado!", respostasUsuario);
  };


  if (loading) {
    return <div className="text-center mt-10"><p className="text-xl">Carregando simulado...</p></div>;
  }

  if (error) {
    return <div className="text-center mt-10 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
        <p className="font-bold">Erro!</p>
        <p>{error}</p>
      </div>;
  }

  if (!prova || questoes.length === 0) {
    return <div className="text-center mt-10"><p>Prova não encontrada ou sem questões.</p></div>;
  }

  const questaoAtual = questoes[questaoAtualIdx];

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <h1 className="text-3xl font-bold text-sky-800 mb-2 text-center">{prova.nome}</h1>
      <p className="text-sm text-gray-600 mb-2 text-center">Questão {questaoAtualIdx + 1} de {questoes.length}</p>

      <BarraDeProgresso atual={questaoAtualIdx + 1} total={questoes.length} />

      <CartaoQuestao
        key={questaoAtual.numero} // Garante que o componente remonte se a questão mudar de forma inesperada
        questao={questaoAtual}
        respostaSelecionada={respostasUsuario[questaoAtual.numero]}
        onSelecaoResposta={handleSelecaoResposta}
      />

      <Navegacao
        onAnterior={questaoAnterior}
        onProxima={proximaQuestao}
        onFinalizar={finalizarSimulado}
        temAnterior={questaoAtualIdx > 0}
        temProxima={questaoAtualIdx < questoes.length - 1}
        ultimaQuestao={questaoAtualIdx === questoes.length - 1}
      />
    </div>
  );
}

export default PaginaSimulado;
