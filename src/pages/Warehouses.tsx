
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Warehouse, 
  MapPin, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Users,
  Truck
} from "lucide-react";

export default function Warehouses() {
  const warehouses = [
    {
      id: 1,
      name: "Milano Centro",
      address: "Via Torino 45, Milano",
      manager: "Marco Rossi",
      capacity: "1200 pezzi",
      currentStock: 845,
      utilizzo: 70,
      categories: ["Audio", "Video", "Luci"],
      status: "attivo",
      lastInventory: "01/03/2024"
    },
    {
      id: 2,
      name: "Deposito Bergamo",
      address: "Via Industriale 12, Bergamo",
      manager: "Laura Bianchi",
      capacity: "800 pezzi",
      currentStock: 652,
      utilizzo: 82,
      categories: ["Strutture", "Generatori"],
      status: "attivo",
      lastInventory: "28/02/2024"
    },
    {
      id: 3,
      name: "Hub Logistico Sud",
      address: "Via Roma 88, Napoli",
      manager: "Giuseppe Verde",
      capacity: "1500 pezzi",
      currentStock: 423,
      utilizzo: 28,
      categories: ["Audio", "Video", "Luci", "Strutture"],
      status: "espansione",
      lastInventory: "25/02/2024"
    }
  ];

  const recentMovements = [
    {
      id: 1,
      type: "uscita",
      item: "Mixer Yamaha M7CL",
      warehouse: "Milano Centro",
      destination: "Festival Musica 2024",
      date: "14/03/2024",
      operator: "Marco Rossi"
    },
    {
      id: 2,
      type: "rientro",
      item: "Proiettore Christie 4K",
      warehouse: "Deposito Bergamo",
      destination: "Corporate Event",
      date: "13/03/2024",
      operator: "Laura Bianchi"
    },
    {
      id: 3,
      type: "trasferimento",
      item: "Casse Line Array x4",
      warehouse: "Milano Centro → Hub Sud",
      destination: "Riequilibrio stock",
      date: "12/03/2024",
      operator: "Sistema Automatico"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "attivo":
        return <Badge className="bg-green-100 text-green-800">Attivo</Badge>;
      case "espansione":
        return <Badge className="bg-blue-100 text-blue-800">In Espansione</Badge>;
      case "manutenzione":
        return <Badge className="bg-orange-100 text-orange-800">Manutenzione</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "uscita":
        return <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <Truck className="h-4 w-4 text-red-600" />
        </div>;
      case "rientro":
        return <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Package className="h-4 w-4 text-green-600" />
        </div>;
      case "trasferimento":
        return <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </div>;
      default:
        return <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <Package className="h-4 w-4 text-gray-600" />
        </div>;
    }
  };

  const getUtilizationColor = (utilizzo: number) => {
    if (utilizzo >= 80) return "text-red-600 bg-red-100";
    if (utilizzo >= 60) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Magazzini</h1>
          <p className="text-gray-600">Gestione sedi e movimentazione stock</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Magazzino
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Warehouse className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Magazzini Attivi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">1,920</p>
            <p className="text-sm text-gray-600">Pezzi Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">127</p>
            <p className="text-sm text-gray-600">Movimenti Oggi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Alert Capacità</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Sedi Operative</h2>
          {warehouses.map((warehouse) => (
            <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{warehouse.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {warehouse.address}
                    </p>
                  </div>
                  {getStatusBadge(warehouse.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600"><strong>Manager:</strong> {warehouse.manager}</p>
                    <p className="text-gray-600"><strong>Capacità:</strong> {warehouse.capacity}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Stock attuale:</strong> {warehouse.currentStock} pezzi</p>
                    <p className="text-gray-600"><strong>Ultimo inventario:</strong> {warehouse.lastInventory}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Utilizzo Capacità</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUtilizationColor(warehouse.utilizzo)}`}>
                      {warehouse.utilizzo}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        warehouse.utilizzo >= 80 ? 'bg-red-500' : 
                        warehouse.utilizzo >= 60 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${warehouse.utilizzo}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Categorie:</p>
                  <div className="flex flex-wrap gap-1">
                    {warehouse.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Package className="h-3 w-3 mr-1" />
                    Inventario
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-3 w-3 mr-1" />
                    Staff
                  </Button>
                  <Button size="sm">
                    Gestisci
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Movimenti Recenti</span>
                <Button variant="outline" size="sm">Vedi Tutti</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getMovementIcon(movement.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{movement.item}</p>
                      <p className="text-xs text-gray-600">{movement.warehouse}</p>
                      <p className="text-xs text-gray-500">{movement.destination}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{movement.date}</span>
                        <span className="text-xs text-gray-500">{movement.operator}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
