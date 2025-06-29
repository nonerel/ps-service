
import React, { useRef, useState, useCallback } from 'react';
import { StageConfig, PlacedEquipment, Equipment } from '@/pages/StageDesigner';

interface Stage2DViewerProps {
  stageConfig: StageConfig;
  placedEquipment: PlacedEquipment[];
  selectedEquipment: string | null;
  onEquipmentSelect: (id: string) => void;
  onEquipmentPlace: (equipment: Equipment, position: [number, number, number]) => void;
  onEquipmentMove: (id: string, position: [number, number, number]) => void;
}

export function Stage2DViewer({
  stageConfig,
  placedEquipment,
  selectedEquipment,
  onEquipmentSelect,
  onEquipmentPlace,
  onEquipmentMove
}: Stage2DViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedEquipmentId, setDraggedEquipmentId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Calcola le dimensioni dinamiche basate sulla configurazione del palco
  const getStageDisplaySize = () => {
    const baseWidth = 400;
    const baseHeight = 300;
    const aspectRatio = stageConfig.width / stageConfig.height;
    
    let displayWidth = baseWidth;
    let displayHeight = baseHeight;
    
    if (aspectRatio > 1) {
      displayHeight = baseWidth / aspectRatio;
    } else {
      displayWidth = baseHeight * aspectRatio;
    }
    
    return {
      width: Math.max(displayWidth, 200),
      height: Math.max(displayHeight, 150),
      stageWidth: Math.max(displayWidth * 0.75, 200),
      stageHeight: Math.max(displayHeight * 0.75, 150)
    };
  };

  const { width: containerWidth, height: containerHeight, stageWidth, stageHeight } = getStageDisplaySize();
  const stageX = (containerWidth - stageWidth) / 2;
  const stageY = (containerHeight - stageHeight) / 2;

  const handleStageClick = (event: React.MouseEvent) => {
    if (isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Converti coordinate schermo in coordinate palco
    const stageX_pos = ((x - stageX) / stageWidth) * stageConfig.width - stageConfig.width / 2;
    const stageZ_pos = ((y - stageY) / stageHeight) * stageConfig.height - stageConfig.height / 2;
    
    console.log('Click sul palco:', { x: stageX_pos, z: stageZ_pos });
  };

  const getEquipmentPosition = (equipment: PlacedEquipment) => {
    const screenX = ((equipment.position[0] + stageConfig.width / 2) / stageConfig.width) * stageWidth + stageX;
    const screenY = ((equipment.position[2] + stageConfig.height / 2) / stageConfig.height) * stageHeight + stageY;
    return { x: screenX, y: screenY };
  };

  const handleEquipmentMouseDown = (equipmentId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const equipment = placedEquipment.find((eq, index) => `${eq.id}-${index}` === equipmentId);
    if (!equipment) return;
    
    const position = getEquipmentPosition(equipment);
    setDragOffset({
      x: event.clientX - rect.left - position.x,
      y: event.clientY - rect.top - position.y
    });
    
    setDraggedEquipmentId(equipmentId);
    setIsDragging(true);
    onEquipmentSelect(equipmentId);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !draggedEquipmentId || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - dragOffset.x;
    const y = event.clientY - rect.top - dragOffset.y;
    
    // Converti in coordinate palco
    const stageX_pos = ((x - stageX) / stageWidth) * stageConfig.width - stageConfig.width / 2;
    const stageZ_pos = ((y - stageY) / stageHeight) * stageConfig.height - stageConfig.height / 2;
    
    // Limita alle dimensioni del palco
    const clampedX = Math.max(-stageConfig.width / 2, Math.min(stageConfig.width / 2, stageX_pos));
    const clampedZ = Math.max(-stageConfig.height / 2, Math.min(stageConfig.height / 2, stageZ_pos));
    
    onEquipmentMove(draggedEquipmentId, [clampedX, 1, clampedZ]);
  }, [isDragging, draggedEquipmentId, dragOffset, stageX, stageY, stageWidth, stageHeight, stageConfig, onEquipmentMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggedEquipmentId(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Gestione drag & drop da attrezzature esterne
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const equipmentData = event.dataTransfer.getData('application/json');
    
    if (!equipmentData || !canvasRef.current) return;
    
    try {
      const equipment = JSON.parse(equipmentData) as Equipment;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Verifica se il drop è sul palco
      if (x >= stageX && x <= stageX + stageWidth && y >= stageY && y <= stageY + stageHeight) {
        const stageX_pos = ((x - stageX) / stageWidth) * stageConfig.width - stageConfig.width / 2;
        const stageZ_pos = ((y - stageY) / stageHeight) * stageConfig.height - stageConfig.height / 2;
        
        onEquipmentPlace(equipment, [stageX_pos, 1, stageZ_pos]);
      }
    } catch (error) {
      console.error('Errore nel parsing dei dati del drag:', error);
    }
  };

  // Aggiungi event listeners per il mouse
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
      <div 
        ref={canvasRef}
        className="relative bg-white border-2 border-gray-300 rounded-lg shadow-lg"
        style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
        onClick={handleStageClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Palco */}
        <div 
          className="absolute bg-amber-200 border-2 border-amber-400 rounded"
          style={{
            left: `${stageX}px`,
            top: `${stageY}px`,
            width: `${stageWidth}px`,
            height: `${stageHeight}px`
          }}
        >
          {/* Griglia del palco */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox={`0 0 ${stageWidth} ${stageHeight}`}
          >
            {/* Linee verticali */}
            {Array.from({ length: Math.ceil(stageConfig.width) + 1 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={(i / stageConfig.width) * stageWidth}
                y1={0}
                x2={(i / stageConfig.width) * stageWidth}
                y2={stageHeight}
                stroke="#d97706"
                strokeWidth="1"
              />
            ))}
            {/* Linee orizzontali */}
            {Array.from({ length: Math.ceil(stageConfig.height) + 1 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={(i / stageConfig.height) * stageHeight}
                x2={stageWidth}
                y2={(i / stageConfig.height) * stageHeight}
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
          const isBeingDragged = draggedEquipmentId === equipmentId;
          
          return (
            <div
              key={equipmentId}
              className={`absolute cursor-move transition-all transform -translate-x-1/2 -translate-y-1/2 ${
                isSelected ? 'scale-110 ring-2 ring-blue-500' : 'hover:scale-105'
              } ${isBeingDragged ? 'opacity-75 z-10' : ''}`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${Math.max(20, (equipment.dimensions.width / stageConfig.width) * stageWidth * 0.8)}px`,
                height: `${Math.max(20, (equipment.dimensions.depth / stageConfig.height) * stageHeight * 0.8)}px`,
                backgroundColor: equipment.color,
                borderRadius: '4px',
                border: '2px solid rgba(0,0,0,0.2)'
              }}
              onMouseDown={(e) => handleEquipmentMouseDown(equipmentId, e)}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDragging) {
                  onEquipmentSelect(equipmentId);
                }
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap bg-white px-1 rounded shadow">
                {equipment.name}
              </div>
            </div>
          );
        })}

        {/* Indicatore di drop zone */}
        <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow">
          📦 Trascina qui le attrezzature
        </div>

        {/* Legenda */}
        <div className="absolute -right-40 top-0 bg-white p-3 rounded-lg border shadow-sm">
          <h4 className="font-semibold text-sm mb-2">Vista 2D</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div>• Trascina per spostare</div>
            <div>• Drop per posizionare</div>
            <div>• Clicca per selezionare</div>
            <div>• Griglia: 1m × 1m</div>
          </div>
        </div>
      </div>
    </div>
  );
}
