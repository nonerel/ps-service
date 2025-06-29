
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Equipment } from "@/pages/StageDesigner";
import { Search, Volume2, Video, Lightbulb, Building2, Zap } from "lucide-react";

interface EquipmentPanelProps {
  onEquipmentSelect: (equipment: Equipment, position: [number, number, number]) => void;
}

// Mock data per le attrezzature
const mockEquipment: Equipment[] = [
  // Audio
  {
    id: "audio-1",
    name: "Line Array L-Acoustics",
    category: "audio",
    model: "K2",
    available: 8,
    dimensions: { width: 1.2, height: 0.8, depth: 0.6 },
    color: "#1e40af"
  },
  {
    id: "audio-2", 
    name: "Subwoofer",
    category: "audio",
    model: "SB28",
    available: 4,
    dimensions: { width: 1.4, height: 0.9, depth: 0.8 },
    color: "#1e40af"
  },
  {
    id: "audio-3",
    name: "Monitor Palco",
    category: "audio", 
    model: "X15",
    available: 6,
    dimensions: { width: 0.8, height: 0.5, depth: 0.6 },
    color: "#1e40af"
  },
  
  // Video
  {
    id: "video-1",
    name: "LED Wall",
    category: "video",
    model: "P3.9",
    available: 12,
    dimensions: { width: 1.0, height: 1.0, depth: 0.2 },
    color: "#dc2626"
  },
  {
    id: "video-2",
    name: "Proiettore",
    category: "video",
    model: "20K Lumens",
    available: 3,
    dimensions: { width: 0.8, height: 0.4, depth: 1.2 },
    color: "#dc2626"
  },
  
  // Luci
  {
    id: "lights-1",
    name: "Moving Head",
    category: "lights",
    model: "Spot 600W",
    available: 16,
    dimensions: { width: 0.4, height: 0.6, depth: 0.4 },
    color: "#ca8a04"
  },
  {
    id: "lights-2",
    name: "LED Par",
    category: "lights", 
    model: "RGBA 18x10W",
    available: 24,
    dimensions: { width: 0.3, height: 0.3, depth: 0.3 },
    color: "#ca8a04"
  },
  {
    id: "lights-3",
    name: "Blinder",
    category: "lights",
    model: "4x650W",
    available: 8,
    dimensions: { width: 1.0, height: 0.3, depth: 0.3 },
    color: "#ca8a04"
  },
  
  // Strutture
  {
    id: "struct-1",
    name: "Truss Quadra",
    category: "structures",
    model: "40x40cm",
    available: 20,
    dimensions: { width: 2.0, height: 0.4, depth: 0.4 },
    color: "#16a34a"
  },
  {
    id: "struct-2",
    name: "Torre Americana",
    category: "structures",
    model: "5m",
    available: 6,
    dimensions: { width: 1.5, height: 5.0, depth: 1.5 },
    color: "#16a34a"
  },
  
  // Generatori
  {
    id: "power-1",
    name: "Generatore",
    category: "generators",
    model: "100kVA",
    available: 2,
    dimensions: { width: 2.5, height: 1.5, depth: 1.2 },
    color: "#7c2d12"
  }
];

const categories = [
  { id: "audio", name: "Audio", icon: Volume2, color: "bg-blue-100 text-blue-800" },
  { id: "video", name: "Video", icon: Video, color: "bg-red-100 text-red-800" },
  { id: "lights", name: "Luci", icon: Lightbulb, color: "bg-yellow-100 text-yellow-800" },
  { id: "structures", name: "Strutture", icon: Building2, color: "bg-green-100 text-green-800" },
  { id: "generators", name: "Generatori", icon: Zap, color: "bg-orange-100 text-orange-800" }
];

export function EquipmentPanel({ onEquipmentSelect }: EquipmentPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEquipment = mockEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEquipmentClick = (equipment: Equipment) => {
    // Posizione di default al centro del palco
    const defaultPosition: [number, number, number] = [0, 1, 0];
    onEquipmentSelect(equipment, defaultPosition);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Attrezzature Disponibili</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cerca attrezzature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
            <TabsTrigger value="all">Tutte</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-8"
                >
                  <category.icon className="h-3 w-3 mr-1" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <ScrollArea className="h-[400px] px-4">
            <div className="space-y-2">
              {filteredEquipment.map((equipment) => {
                const category = categories.find(c => c.id === equipment.category);
                return (
                  <Card 
                    key={equipment.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleEquipmentClick(equipment)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {category?.icon && <category.icon className="h-4 w-4" />}
                            <h4 className="font-medium text-sm">{equipment.name}</h4>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{equipment.model}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {equipment.dimensions.width}×{equipment.dimensions.height}×{equipment.dimensions.depth}m
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={equipment.available > 0 ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {equipment.available > 0 ? `${equipment.available} disp.` : "Non disp."}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {filteredEquipment.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nessuna attrezzatura trovata</p>
                <p className="text-sm mt-1">Prova a modificare i filtri di ricerca</p>
              </div>
            )}
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
