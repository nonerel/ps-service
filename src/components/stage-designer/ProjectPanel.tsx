
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlacedEquipment } from "@/pages/StageDesigner";
import { Trash2, Package, MapPin, RotateCw } from "lucide-react";

interface ProjectPanelProps {
  placedEquipment: PlacedEquipment[];
  onEquipmentRemove: (id: string) => void;
  selectedEquipment: string | null;
  onEquipmentSelect: (id: string) => void;
}

export function ProjectPanel({
  placedEquipment,
  onEquipmentRemove,
  selectedEquipment,
  onEquipmentSelect
}: ProjectPanelProps) {
  const totalEquipment = placedEquipment.length;
  const categories = [...new Set(placedEquipment.map(eq => eq.category))];

  const formatPosition = (position: [number, number, number]) => {
    return `${position[0].toFixed(1)}, ${position[1].toFixed(1)}, ${position[2].toFixed(1)}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'audio': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'lights': return 'bg-yellow-100 text-yellow-800';
      case 'structures': return 'bg-green-100 text-green-800';
      case 'generators': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'audio': return 'Audio';
      case 'video': return 'Video';
      case 'lights': return 'Luci';
      case 'structures': return 'Strutture';
      case 'generators': return 'Generatori';
      default: return category;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Progetto Corrente
        </CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline">
            {totalEquipment} Attrezzature
          </Badge>
          <Badge variant="outline">
            {categories.length} Categorie
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {placedEquipment.length === 0 ? (
          <div className="text-center py-8 px-4 text-gray-500">
            <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Nessuna attrezzatura nel progetto</p>
            <p className="text-sm mt-1">Seleziona le attrezzature dal pannello a sinistra</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-2 p-4">
              {placedEquipment.map((equipment, index) => {
                const equipmentId = `${equipment.id}-${index}`;
                const isSelected = selectedEquipment === equipmentId;
                
                return (
                  <Card 
                    key={equipmentId}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => onEquipmentSelect(equipmentId)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-sm">{equipment.name}</h4>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getCategoryColor(equipment.category)}`}
                            >
                              {getCategoryName(equipment.category)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>Pos: {formatPosition(equipment.position)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <RotateCw className="h-3 w-3" />
                              <span>Rot: {formatPosition(equipment.rotation)}</span>
                            </div>
                            <div>
                              <span>Dimensioni: {equipment.dimensions.width}×{equipment.dimensions.height}×{equipment.dimensions.depth}m</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEquipmentRemove(equipmentId);
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        )}
        
        {placedEquipment.length > 0 && (
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Riepilogo:</span>
                <div className="text-gray-600 mt-1">
                  {categories.map(category => (
                    <div key={category} className="flex justify-between">
                      <span>{getCategoryName(category)}:</span>
                      <span>{placedEquipment.filter(eq => eq.category === category).length}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Controlli:</span>
                <div className="mt-1 space-y-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    disabled={!selectedEquipment}
                  >
                    Modifica Posizione
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    disabled={!selectedEquipment}
                  >
                    Ruota Elemento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
