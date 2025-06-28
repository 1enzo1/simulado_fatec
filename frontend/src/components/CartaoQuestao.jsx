import React from 'react';

function CartaoQuestao({ questao, respostaSelecionada, onSelecaoResposta }) {
  if (!questao) return null;

  const { numero, textoBase, enunciado, alternativas } = questao;

  const renderTextoBase = () => {
    if (!textoBase) return null;
    // Trata descrições de imagem e parágrafos
    const partes = textoBase.split('\n').map(part => part.trim()).filter(part => part.length > 0);
    return partes.map((parte, index) => {
      if (parte.startsWith('*[Descrição da imagem:') || parte.startsWith('*[Imagem:')) {
        return (
          <p key={`tb-img-${index}`} className="italic text-sm text-gray-600 bg-gray-100 p-2 my-2 rounded border border-gray-300">
            {parte.replace(/\*\[|\]\*/g, '')} {/* Remove marcadores de descrição */}
          </p>
        );
      }
      return <p key={`tb-p-${index}`} className="mb-2 text-gray-700">{parte}</p>;
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-sky-700 mb-1">
        Questão {numero}
      </h2>

      {textoBase && (
        <div className="mb-4 p-3 bg-slate-50 rounded border border-slate-200 text-sm">
          {renderTextoBase()}
        </div>
      )}

      <p className="text-gray-800 mb-5 text-base leading-relaxed">{enunciado}</p>

      <div className="space-y-3">
        {alternativas.map((alt) => (
          <label
            key={alt.letra}
            className={`flex items-center p-3 rounded-md border-2 transition-all duration-150 ease-in-out cursor-pointer
              ${respostaSelecionada === alt.letra
                ? 'bg-sky-100 border-sky-500 ring-2 ring-sky-500'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400'
              }`}
          >
            <input
              type="radio"
              name={`questao_${numero}`}
              value={alt.letra}
              checked={respostaSelecionada === alt.letra}
              onChange={() => onSelecaoResposta(numero, alt.letra)}
              className="form-radio h-5 w-5 text-sky-600 focus:ring-sky-500 mr-3 shrink-0"
            />
            <span className="font-medium text-gray-800">{alt.letra})</span>
            <span className="ml-2 text-gray-700 flex-1">{alt.texto}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CartaoQuestao;
