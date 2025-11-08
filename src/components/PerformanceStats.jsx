import React from 'react';

const PerformanceStats = ({ loadTime, requestCount }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-2xl z-50">
      <h3 className="text-lg font-bold border-b border-gray-700 pb-2 mb-2">Estadísticas de Rendimiento</h3>
      <div className="text-sm">
        <p>
          <strong>Tiempo de carga:</strong> {loadTime ? `${loadTime.toFixed(2)} ms` : 'Calculando...'}
        </p>
        <p>
          <strong>Peticiones a la API:</strong> {requestCount}
        </p>
      </div>
    </div>
  );
};

export default PerformanceStats;