
import { useRef, useState } from 'react';
import { StageConfig, PlacedEquipment, Equipment } from '@/pages/StageDesigner';

interface Stage2DViewerProps {
  stageConfig: StageConfig;
  placedEquipment: PlacedEquipment[];
  selectedEquipment: string | null;
  onEquipmentSelect: (id: string) => void;
  onEquipmentPlace: (equipment: Equipment, position: [number, number, number]) => void;
}

export function Stage2DViewer({
  stageConfig,
  placedEquipment,
  selectedEquipment,
  onEquipmentSelect,
  onEquipmentPlace
}: Stage2DViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStageClick = (event: React.MouseEvent) => {
    if (isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Converti coordinate schermo in coordinate palco
    const stageX = ((x - 50) / 300) * stageConfig.width - stageConfig.width / 2;
    const stageZ = ((y - 50) / 200) * stageConfig.height - stageConfig.height / 2;
    
    console.log('Click sul palco:', { x: stageX, z: stageZ });
  };

  const getEquipmentPosition = (equipment: PlacedEquipment) => {
    // Converti coordinate palco in coordinate schermo
    const screenX = ((equipment.position[0] + stageConfig.width / 2) / stageConfig.width) * 300 + 50;
    const screenY = ((equipment.position[2] + stageConfig.height / 2) / stageConfig.height) * 200 + 50;
    return { x: screenX, y: screenY };
  };

  return (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
      <div 
        ref={canvasRef}
        className="relative bg-white border-2 border-gray-300 rounded-lg shadow-lg"
        style={{ width: '400px', height: '300px' }}
        onClick={handleStageClick}
      >
        {/* Palco */}
        <div 
          className="absolute bg-amber-200 border-2 border-amber-400 rounded"
          style={{
            left: '50px',
            top: '50px',
            width: '300px',
            height: '200px'
          }}
        >
          {/* Griglia del palco */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 300 200"
          >
            {/* Linee verticali */}
            {Array.from({ length: 7 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 50}
                y1={0}
                x2={i * 50}
                y2={200}
                stroke="#d97706"
                strokeWidth="1"
              />
            ))}
            {/* Linee orizzontali */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 50}
                x2={300}
                y2={i * 50}
                stroke="#d97706"
                strokeWidth="1"
              />
            ))}
          </svg>
          
          {/* Etichetta dimensioni */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
            {stageConfig.width}m × {stageConfig.height}m
          </div>
        </div>

        {/* Attrezzature posizionate */}
        {placedEquipment.map((equipment, index) => {
          const equipmentId = `${equipment.id}-${index}`;
          const position = getEquipmentPosition(equipment);
          const isSelected = selectedEquipment === equipmentId;
          
          return (
            <div
              key={equipmentId}
              className={`absolute cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 ${
                isSelected ? 'scale-110 ring-2 ring-blue-500' : 'hover:scale-105'
              }`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${Math.max(20, equipment.dimensions.width * 20)}px`,
                height: `${Math.max(20, equipment.dimensions.depth * 20)}px`,
                backgroundColor: equipment.color,
                borderRadius: '4px',
                border: '2px solid rgba(0,0,0,0.2)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onEquipmentSelect(equipmentId);
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap bg-white px-1 rounded shadow">
                {equipment.name}
              </div>
            </div>
          );
        })}

        {/* Legenda */}
        <div className="absolute -right-32 top-0 bg-white p-3 rounded-lg border shadow-sm">
          <h4 className="font-semibold text-sm mb-2">Vista 2D</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div>• Clicca per selezionare</div>
            <div>• Palco: marrone</div>
            <div>• Griglia: 1m × 1m</div>
          </div>
        </div>
      </div>
    </div>
  );
}
