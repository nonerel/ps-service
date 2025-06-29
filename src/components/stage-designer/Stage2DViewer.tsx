
import React from 'react';
import { StageConfig, PlacedEquipment, Equipment } from '@/pages/StageDesigner';
import { InteractiveCanvas } from './InteractiveCanvas';

interface Stage2DViewerProps {
  stageConfig: StageConfig;
  placedEquipment: PlacedEquipment[];
  selectedEquipment: string | null;
  onEquipmentSelect: (id: string) => void;
  onEquipmentPlace: (equipment: Equipment, position: [number, number, number]) => void;
  onEquipmentMove: (id: string, position: [number, number, number]) => void;
}

export function Stage2DViewer(props: Stage2DViewerProps) {
  return (
    <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden">
      <InteractiveCanvas {...props} />
    </div>
  );
}
