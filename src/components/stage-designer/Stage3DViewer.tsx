
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Text, Box } from '@react-three/drei';
import * as THREE from 'three';
import { StageConfig, PlacedEquipment, Equipment } from '@/pages/StageDesigner';

interface Stage3DViewerProps {
  stageConfig: StageConfig;
  placedEquipment: PlacedEquipment[];
  selectedEquipment: string | null;
  onEquipmentSelect: (id: string) => void;
  onEquipmentPlace: (equipment: Equipment, position: [number, number, number]) => void;
}

function StageBox({ config }: { config: StageConfig }) {
  return (
    <group>
      {/* Palco principale */}
      <Box 
        args={[config.width, config.depth, config.height]} 
        position={[0, config.depth / 2, 0]}
      >
        <meshLambertMaterial color="#8B4513" />
      </Box>
      
      {/* Griglia sul palco */}
      <Grid
        args={[config.width, config.height]}
        position={[0, config.depth + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#666666"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#444444"
        fadeDistance={50}
        fadeStrength={1}
        infiniteGrid={false}
      />
      
      {/* Etichette dimensioni */}
      <Text
        position={[0, config.depth + 0.5, -config.height / 2 - 1]}
        fontSize={0.5}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        {config.width}m × {config.height}m
      </Text>
    </group>
  );
}

function EquipmentMesh({ 
  equipment, 
  isSelected, 
  onClick 
}: { 
  equipment: PlacedEquipment; 
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={equipment.position}>
      <Box 
        ref={meshRef}
        args={[equipment.dimensions.width, equipment.dimensions.height, equipment.dimensions.depth]}
        onClick={onClick}
      >
        <meshLambertMaterial 
          color={isSelected ? "#ff6b6b" : equipment.color}
          transparent={isSelected}
          opacity={isSelected ? 0.8 : 1}
        />
      </Box>
      
      {/* Etichetta attrezzatura */}
      <Text
        position={[0, equipment.dimensions.height / 2 + 0.3, 0]}
        fontSize={0.3}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        billboard
      >
        {equipment.name}
      </Text>
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
}

export function Stage3DViewer({
  stageConfig,
  placedEquipment,
  selectedEquipment,
  onEquipmentSelect,
  onEquipmentPlace
}: Stage3DViewerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleStageClick = (event: any) => {
    if (isDragging) return;
    
    const point = event.point;
    const stageY = stageConfig.depth;
    
    // Verifica se il click è sul palco
    if (point.y >= stageY - 0.1 && point.y <= stageY + 0.1) {
      // Qui potresti implementare il posizionamento diretto delle attrezzature
      console.log('Click sul palco:', point);
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ fov: 60, position: [15, 10, 15] }}
        style={{ background: '#f8fafc' }}
      >
        <CameraController />
        
        {/* Illuminazione */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        {/* Controlli */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          onStart={() => setIsDragging(true)}
          onEnd={() => setIsDragging(false)}
        />
        
        {/* Palco */}
        <StageBox config={stageConfig} />
        
        {/* Attrezzature posizionate */}
        {placedEquipment.map((equipment, index) => (
          <EquipmentMesh
            key={`${equipment.id}-${index}`}
            equipment={equipment}
            isSelected={selectedEquipment === `${equipment.id}-${index}`}
            onClick={() => onEquipmentSelect(`${equipment.id}-${index}`)}
          />
        ))}
        
        {/* Piano di riferimento */}
        <Grid
          args={[50, 50]}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#e2e8f0"
          sectionSize={10}
          sectionThickness={1}
          sectionColor="#cbd5e1"
          fadeDistance={30}
          fadeStrength={1}
          infiniteGrid={true}
        />
      </Canvas>
    </div>
  );
}
