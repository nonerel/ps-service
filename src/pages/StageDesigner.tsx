
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Stage2DViewer } from "@/components/stage-designer/Stage2DViewer";
import { EquipmentPanel } from "@/components/stage-designer/EquipmentPanel";
import { ProjectPanel } from "@/components/stage-designer/ProjectPanel";
import { Save, Download, Ruler } from "lucide-react";
import { toast } from "sonner";

export interface StageConfig {
  width: number;
  height: number;
  depth: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  model: string;
  available: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  color: string;
}

export interface PlacedEquipment extends Equipment {
  position: [number, number, number];
  rotation: [number, number, number];
  quantity: number;
}

const StageDesigner = () => {
  const [stageConfig, setStageConfig] = useState<StageConfig>({
    width: 12,
    height: 8,
    depth: 1
  });
  
  const [placedEquipment, setPlacedEquipment] = useState<PlacedEquipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("Nuovo Progetto");

  const handleStageConfigChange = (field: keyof StageConfig, value: number) => {
    setStageConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEquipmentPlace = (equipment: Equipment, position: [number, number, number]) => {
    if (equipment.available <= 0) {
      toast.error("Attrezzatura non disponibile");
      return;
    }

    const newPlacedEquipment: PlacedEquipment = {
      ...equipment,
      position,
      rotation: [0, 0, 0],
      quantity: 1
    };
    
    setPlacedEquipment(prev => [...prev, newPlacedEquipment]);
    toast.success(`${equipment.name} aggiunto al progetto`);
  };

  const handleEquipmentRemove = (id: string) => {
    setPlacedEquipment(prev => prev.filter((eq, index) => `${eq.id}-${index}` !== id));
    setSelectedEquipment(null);
    toast.success("Attrezzatura rimossa dal progetto");
  };

  const handleSaveProject = () => {
    const projectData = {
      name: projectName,
      stage: stageConfig,
      equipment: placedEquipment,
      created: new Date().toISOString()
    };
    
    localStorage.setItem(`stage-project-${Date.now()}`, JSON.stringify(projectData));
    toast.success("Progetto salvato con successo");
  };

  const handleExportProject = () => {
    const projectData = {
      name: projectName,
      stage: stageConfig,
      equipment: placedEquipment,
      created: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}_stage_design.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Progetto esportato");
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Pannello Laterale */}
      <div className="w-80 flex flex-col gap-4">
        {/* Configurazione Palco */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Configurazione Palco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nome Progetto</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Inserisci nome progetto"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Larghezza (m)</Label>
                <Input
                  id="width"
                  type="number"
                  value={stageConfig.width}
                  onChange={(e) => handleStageConfigChange('width', parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="1"
                  max="50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Profondità (m)</Label>
                <Input
                  id="height"
                  type="number"
                  value={stageConfig.height}
                  onChange={(e) => handleStageConfigChange('height', parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="1"
                  max="50"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSaveProject} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Salva
              </Button>
              <Button onClick={handleExportProject} variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs per Attrezzature e Progetto */}
        <Tabs defaultValue="equipment" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="equipment">Attrezzature</TabsTrigger>
            <TabsTrigger value="project">Progetto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="equipment" className="flex-1">
            <EquipmentPanel onEquipmentSelect={handleEquipmentPlace} />
          </TabsContent>
          
          <TabsContent value="project" className="flex-1">
            <ProjectPanel 
              placedEquipment={placedEquipment}
              onEquipmentRemove={handleEquipmentRemove}
              selectedEquipment={selectedEquipment}
              onEquipmentSelect={setSelectedEquipment}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Visualizzatore 2D */}
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Visualizzazione 2D - {projectName}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">
                Palco: {stageConfig.width}m × {stageConfig.height}m
              </Badge>
              <Badge variant="outline">
                Attrezzature: {placedEquipment.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100%-120px)] p-4">
            <Stage2DViewer
              stageConfig={stageConfig}
              placedEquipment={placedEquipment}
              selectedEquipment={selectedEquipment}
              onEquipmentSelect={setSelectedEquipment}
              onEquipmentPlace={handleEquipmentPlace}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StageDesigner;
