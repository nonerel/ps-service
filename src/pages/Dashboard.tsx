
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Package2
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Attrezzature Totali",
      value: "1,247",
      change: "+12%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Eventi Attivi",
      value: "18",
      change: "+5%",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "In Manutenzione",
      value: "23",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Ricavi Mensili",
      value: "€45,680",
      change: "+18%",
      icon: TrendingUp,
      color: "text-emerald-600"
    }
  ];

  const recentEvents = [
    {
      id: 1,
      name: "Festival della Musica 2024",
      client: "Comune di Milano",
      date: "15-17 Marzo",
      status: "in-corso",
      priority: "high",
      equipment: 45
    },
    {
      id: 2,
      name: "Corporate Meeting",
      client: "TechCorp S.r.l.",
      date: "22 Marzo",
      status: "preparazione",
      priority: "medium",
      equipment: 12
    },
    {
      id: 3,
      name: "Matrimonio Villa dei Fiori",
      client: "Famiglia Rossi",
      date: "25 Marzo",
      status: "completato",
      priority: "low",
      equipment: 8
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-corso":
        return <Badge className="bg-blue-100 text-blue-800">In Corso</Badge>;
      case "preparazione":
        return <Badge className="bg-orange-100 text-orange-800">Preparazione</Badge>;
      case "completato":
        return <Badge className="bg-green-100 text-green-800">Completato</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-orange-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Panoramica delle attività e performance</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Nuovo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change} dal mese scorso</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Eventi Recenti</span>
              <Button variant="outline" size="sm">Vedi Tutti</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className={`p-4 border-l-4 ${getPriorityColor(event.priority)} bg-white rounded-r-lg shadow-sm`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{event.name}</h3>
                    {getStatusBadge(event.status)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Cliente:</strong> {event.client}</p>
                    <p><strong>Data:</strong> {event.date}</p>
                    <p><strong>Attrezzature:</strong> {event.equipment} pezzi</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stato Inventario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Disponibile</span>
                </div>
                <span className="font-semibold text-green-600">1,124</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">In Uso</span>
                </div>
                <span className="font-semibold text-orange-600">100</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Manutenzione</span>
                </div>
                <span className="font-semibold text-red-600">23</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attività Recenti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Package2 className="h-4 w-4 text-blue-500" />
                  <span>Mixer Yamaha M7 restituito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>Proiettore LED in manutenzione</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Evento matrimonio completato</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
