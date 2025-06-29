
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { StageConfig, Equipment, PlacedEquipment } from '@/pages/StageDesigner';
import { EquipmentNode } from './EquipmentNode';
import { StageNode } from './StageNode';

interface InteractiveCanvasProps {
  stageConfig: StageConfig;
  placedEquipment: PlacedEquipment[];
  selectedEquipment: string | null;
  onEquipmentSelect: (id: string) => void;
  onEquipmentPlace: (equipment: Equipment, position: [number, number, number]) => void;
  onEquipmentMove: (id: string, position: [number, number, number]) => void;
}

const nodeTypes: NodeTypes = {
  equipment: EquipmentNode,
  stage: StageNode,
};

export function InteractiveCanvas({
  stageConfig,
  placedEquipment,
  selectedEquipment,
  onEquipmentSelect,
  onEquipmentPlace,
  onEquipmentMove
}: InteractiveCanvasProps) {
  // Converti le attrezzature in nodi
  const equipmentNodes = placedEquipment.map((equipment, index) => ({
    id: `${equipment.id}-${index}`,
    type: 'equipment',
    position: { 
      x: equipment.position[0] * 50 + 400, // Scala e centra
      y: equipment.position[2] * 50 + 300 
    },
    data: { 
      equipment,
      isSelected: selectedEquipment === `${equipment.id}-${index}`,
      onSelect: () => onEquipmentSelect(`${equipment.id}-${index}`)
    },
  }));

  // Nodo del palco
  const stageNode = {
    id: 'stage',
    type: 'stage',
    position: { x: 300, y: 200 },
    data: { stageConfig },
    draggable: false,
    selectable: false,
  };

  const initialNodes = [stageNode, ...equipmentNodes];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Gestione del drop di nuove attrezzature
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const equipmentData = event.dataTransfer.getData('application/json');
      if (!equipmentData) return;

      try {
        const equipment = JSON.parse(equipmentData) as Equipment;
        const position = { x: event.clientX - 250, y: event.clientY - 100 };
        
        // Converti posizione canvas in coordinate palco
        const stageX = (position.x - 400) / 50;
        const stageZ = (position.y - 300) / 50;
        
        onEquipmentPlace(equipment, [stageX, 1, stageZ]);
      } catch (error) {
        console.error('Errore nel parsing dei dati del drag:', error);
      }
    },
    [onEquipmentPlace],
  );

  // Aggiorna le posizioni quando i nodi vengono spostati
  const handleNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.type === 'equipment') {
        const stageX = (node.position.x - 400) / 50;
        const stageZ = (node.position.y - 300) / 50;
        onEquipmentMove(node.id, [stageX, 1, stageZ]);
      }
    },
    [onEquipmentMove],
  );

  // Aggiorna i nodi quando cambiano le attrezzature
  React.useEffect(() => {
    const newEquipmentNodes = placedEquipment.map((equipment, index) => ({
      id: `${equipment.id}-${index}`,
      type: 'equipment',
      position: { 
        x: equipment.position[0] * 50 + 400,
        y: equipment.position[2] * 50 + 300 
      },
      data: { 
        equipment,
        isSelected: selectedEquipment === `${equipment.id}-${index}`,
        onSelect: () => onEquipmentSelect(`${equipment.id}-${index}`)
      },
    }));

    const updatedStageNode = {
      id: 'stage',
      type: 'stage',
      position: { x: 300, y: 200 },
      data: { stageConfig },
      draggable: false,
      selectable: false,
    };

    setNodes([updatedStageNode, ...newEquipmentNodes]);
  }, [placedEquipment, selectedEquipment, stageConfig, onEquipmentSelect, setNodes]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={handleNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
