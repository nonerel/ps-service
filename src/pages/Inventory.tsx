
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter,
  Plus,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle
} from "lucide-react";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const equipment = [
    {
      id: 1,
      name: "Mixer Yamaha M7CL-48",
      category: "Audio",
      model: "M7CL-48",
      serialNumber: "YM001234",
      status: "disponibile",
      warehouse: "Milano Centro",
      lastMaintenance: "15/02/2024",
      nextEvent: null,
      value: "€12,500"
    },
    {
      id: 2,
      name: "Proiettore LED Christie 4K",
      category: "Video",
      model: "Christie DWU850-GS",
      serialNumber: "CH005678",
      status: "in-uso",
      warehouse: "Milano Centro",
      lastMaintenance: "10/01/2024",
      nextEvent: "Festival Musica 2024",
      value: "€35,000"
    },
    {
      id: 3,
      name: "Casse Line Array JBL VTX",
      category: "Audio",
      model: "VTX V25-II",
      serialNumber: "JBL001122",
      status: "manutenzione",
      warehouse: "Deposito Bergamo",
      lastMaintenance: "01/03/2024",
      nextEvent: null,
      value: "€8,900"
    },
    {
      id: 4,
      name: "Generatore Honda 5KW",
      category: "Energia",
      model: "EU5000iS",
      serialNumber: "HD787654",
      status: "prenotato",
      warehouse: "Milano Centro",
      lastMaintenance: "20/02/2024",
      nextEvent: "Corporate Meeting TechCorp",
      value: "€4,200"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponibile":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Disponibile</Badge>;
      case "in-uso":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />In Uso</Badge>;
      case "prenotato":
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />Prenotato</Badge>;
      case "manutenzione":
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Manutenzione</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Audio":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Video":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Luci":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Energia":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-600">Gestione completa delle attrezzature</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Aggiungi Attrezzatura
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cerca per nome, modello, seriale..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le categorie</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="luci">Luci</SelectItem>
                  <SelectItem value="energia">Energia</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="disponibile">Disponibile</SelectItem>
                  <SelectItem value="in-uso">In Uso</SelectItem>
                  <SelectItem value="prenotato">Prenotato</SelectItem>
                  <SelectItem value="manutenzione">Manutenzione</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {equipment.map((item) => (
              <Card key={item.id} className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <Badge className={`${getCategoryColor(item.category)} border`}>
                          {item.category}
                        </Badge>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mt-3">
                        <div>
                          <p><strong>Modello:</strong> {item.model}</p>
                          <p><strong>Seriale:</strong> {item.serialNumber}</p>
                        </div>
                        <div>
                          <p><strong>Magazzino:</strong> {item.warehouse}</p>
                          <p><strong>Valore:</strong> {item.value}</p>
                        </div>
                        <div>
                          <p><strong>Ultima manutenzione:</strong> {item.lastMaintenance}</p>
                          {item.nextEvent && (
                            <p><strong>Prossimo evento:</strong> {item.nextEvent}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm">
                        Dettagli
                      </Button>
                      <Button variant="outline" size="sm">
                        Modifica
                      </Button>
                      {item.status === "disponibile" && (
                        <Button size="sm">
                          Prenota
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">1,124</p>
            <p className="text-sm text-gray-600">Disponibili</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">75</p>
            <p className="text-sm text-gray-600">In Uso</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">25</p>
            <p className="text-sm text-gray-600">Prenotati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-600">Manutenzione</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
