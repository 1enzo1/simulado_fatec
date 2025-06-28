import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

function TelaDeResultados() {
  const location = useLocation();
  const { idProva } = useParams();
  const [calculado, setCalculado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [resultadosDetalhados, setResultadosDetalhados] = useState([]);

  // Dados passados via `navigate` state
  const { respostasUsuario, prova } = location.state || {};

  useEffect(() => {
    if (prova && respostasUsuario && !calculado) {
      let acertos = 0;
      const detalhados = prova.questoes.map(q => {
        const respostaUsuario = respostasUsuario[q.numero];
        const acertou = respostaUsuario === q.respostaCorreta;
        if (acertou) {
          acertos++;
        }
        return {
          ...q,
          respostaUsuario,
          acertou
        };
      });
      setPontuacao(acertos);
      setResultadosDetalhados(detalhados);
      setCalculado(true);
    }
  }, [prova, respostasUsuario, calculado]);

  if (!prova || !respostasUsuario) {
    return (
      <div className="text-center mt-10 p-4">
        <p className="text-xl text-red-600 font-semibold">Erro: Dados do resultado não encontrados.</p>
        <p className="text-gray-600">Isso pode acontecer se você acessou esta página diretamente.</p>
        <Link to="/" className="mt-4 inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition-colors">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  const totalQuestoes = prova.questoes.length;

  return (
    <div className="max-w-4xl mx-auto mt-5 p-4 sm:p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-sky-800 mb-4 text-center">Resultados do Simulado</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6 text-center">{prova.nome}</h2>

      <div className="bg-sky-100 p-6 rounded-lg shadow-md mb-8 text-center">
        <p className="text-2xl sm:text-3xl font-bold text-sky-700">
          Você acertou {pontuacao} de {totalQuestoes} questões!
        </p>
        <p className="text-lg text-sky-600">
          ({((pontuacao / totalQuestoes) * 100).toFixed(1)}%)
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-10 border-b pb-2">Detalhes das Respostas:</h3>
      <div className="space-y-6">
        {resultadosDetalhados.map((item, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md border-l-4 ${item.acertou ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
            <p className="text-sm font-semibold text-gray-500 mb-1">Questão {item.numero} ({item.disciplina})</p>
            <p className="text-gray-800 mb-2 font-medium">{item.enunciado}</p>

            <div className="text-sm space-y-1 mb-3">
              <p><strong>Sua resposta:</strong> <span className={`font-semibold ${item.acertou ? 'text-green-700' : 'text-red-700'}`}>
                {item.respostaUsuario ? `${item.respostaUsuario})` : 'Não respondida'}
                {item.respostaUsuario && ` ${item.alternativas.find(a => a.letra === item.respostaUsuario)?.texto}`}
              </span>
              {item.acertou && <span className="text-green-600 font-bold ml-2"> (Correta!)</span>}
              {!item.acertou && item.respostaUsuario && <span className="text-red-600 font-bold ml-2"> (Incorreta)</span>}
            </p>
            {!item.acertou && (
              <p><strong>Resposta correta:</strong> <span className="font-semibold text-green-700">
                {item.respostaCorreta}) {item.alternativas.find(a => a.letra === item.respostaCorreta)?.texto}
              </span></p>
            )}
            </div>

            <details className="mt-2 text-sm">
              <summary className="font-semibold text-sky-600 hover:text-sky-700 cursor-pointer">
                Ver Explicação {item.notaInconsistencia && <span className="text-orange-500 font-bold text-xs ml-1">(Nota!)</span>}
              </summary>
              <div className="mt-2 p-3 bg-gray-100 rounded border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">{item.explicacao}</p>
                {item.notaInconsistencia && (
                  <p className="mt-2 text-xs text-orange-600 border-t border-orange-200 pt-2">
                    <strong className="font-bold">Nota sobre a questão:</strong> {item.notaInconsistencia}
                  </p>
                )}
              </div>
            </details>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 ease-in-out shadow-md hover:shadow-lg"
        >
          Fazer Outro Simulado
        </Link>
      </div>
    </div>
  );
}

export default TelaDeResultados;
