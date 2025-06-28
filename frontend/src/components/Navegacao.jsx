import React from 'react';

function Navegacao({ onAnterior, onProxima, onFinalizar, temAnterior, temProxima, ultimaQuestao }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-4 space-y-3 sm:space-y-0 sm:space-x-3">
      <button
        onClick={onAnterior}
        disabled={!temAnterior}
        className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-150 ease-in-out
                    ${temAnterior
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
      >
        &larr; Anterior
      </button>

      {!ultimaQuestao ? (
        <button
          onClick={onProxima}
          disabled={!temProxima}
          className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-150 ease-in-out
                      ${temProxima
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-sky-300 text-white cursor-not-allowed' // Mantém cor primária mas desabilitado
                      }`}
        >
          Próxima &rarr;
        </button>
      ) : (
        <button
          onClick={onFinalizar}
          className="w-full sm:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-colors duration-150 ease-in-out bg-green-500 text-white hover:bg-green-600"
        >
          Finalizar Simulado &#10004;
        </button>
      )}
    </div>
  );
}

export default Navegacao;
