import React from 'react';

function BarraDeProgresso({ atual, total }) {
  if (total === 0) return null;
  const progressoPercentual = (atual / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6 shadow-inner overflow-hidden">
      <div
        className="bg-sky-600 h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progressoPercentual}%` }}
        role="progressbar"
        aria-valuenow={progressoPercentual}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="sr-only">{progressoPercentual.toFixed(0)}% Completo</span>
      </div>
    </div>
  );
}

export default BarraDeProgresso;
