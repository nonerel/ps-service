
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlacedEquipment } from '@/pages/StageDesigner';

interface EquipmentNodeProps {
  data: {
    equipment: PlacedEquipment;
    isSelected: boolean;
    onSelect: () => void;
  };
}

export function EquipmentNode({ data }: EquipmentNodeProps) {
  const { equipment, isSelected, onSelect } = data;

  return (
    <div
      className={`px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
          : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
      }`}
      style={{
        backgroundColor: isSelected ? undefined : equipment.color + '20',
        minWidth: Math.max(80, equipment.dimensions.width * 20),
        minHeight: Math.max(40, equipment.dimensions.depth * 20),
      }}
      onClick={onSelect}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-gray-600"
      />
      
      <div className="text-center">
        <div className="font-semibold text-sm text-gray-800">
          {equipment.name}
        </div>
        <div className="text-xs text-gray-600">
          {equipment.model}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {equipment.dimensions.width}×{equipment.dimensions.depth}m
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-gray-600"
      />
      
      <Handle
        type="source"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-gray-600"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-gray-600"
      />
    </div>
  );
}
