
import React from 'react';
import { StageConfig } from '@/pages/StageDesigner';

interface StageNodeProps {
  data: {
    stageConfig: StageConfig;
  };
}

export function StageNode({ data }: StageNodeProps) {
  const { stageConfig } = data;

  return (
    <div 
      className="bg-amber-200 border-4 border-amber-400 rounded-lg relative"
      style={{
        width: `${stageConfig.width * 50 + 40}px`,
        height: `${stageConfig.height * 50 + 40}px`,
      }}
    >
      {/* Griglia del palco */}
      <svg 
        className="absolute inset-2 w-full h-full opacity-30"
        viewBox={`0 0 ${stageConfig.width * 50} ${stageConfig.height * 50}`}
      >
        {/* Linee verticali ogni metro */}
        {Array.from({ length: Math.ceil(stageConfig.width) + 1 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1={0}
            x2={i * 50}
            y2={stageConfig.height * 50}
            stroke="#d97706"
            strokeWidth="1"
          />
        ))}
        {/* Linee orizzontali ogni metro */}
        {Array.from({ length: Math.ceil(stageConfig.height) + 1 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 50}
            x2={stageConfig.width * 50}
            y2={i * 50}
            stroke="#d97706"
            strokeWidth="1"
          />
        ))}
      </svg>
      
      {/* Etichette */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow">
        Palco: {stageConfig.width}m × {stageConfig.height}m
      </div>
      
      <div className="absolute top-2 left-2 text-xs text-amber-800 font-medium">
        🎭 STAGE
      </div>
    </div>
  );
}
