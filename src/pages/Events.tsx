
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Users, Package, Plus, Filter } from "lucide-react";

export default function Events() {
  const events = [
    {
      id: 1,
      name: "Festival della Musica 2024",
      client: "Comune di Milano",
      type: "Festival",
      date: "15-17 Marzo 2024",
      location: "Parco Lambro, Milano",
      status: "in-corso",
      priority: "high",
      equipment: 45,
      crew: 8,
      budget: "€25,000",
      progress: 75
    },
    {
      id: 2,
      name: "Corporate Meeting Q1",
      client: "TechCorp S.r.l.",
      type: "Corporate",
      date: "22 Marzo 2024",
      location: "Hotel Marriott, Milano",
      status: "preparazione",
      priority: "medium",
      equipment: 12,
      crew: 3,
      budget: "€8,500",
      progress: 40
    },
    {
      id: 3,
      name: "Matrimonio Villa dei Fiori",
      client: "Famiglia Rossi",
      type: "Cerimonia",
      date: "25 Marzo 2024",
      location: "Villa dei Fiori, Como",
      status: "completato",
      priority: "low",
      equipment: 8,
      crew: 2,
      budget: "€4,200",
      progress: 100
    },
    {
      id: 4,
      name: "Tour Concerti Primavera",
      client: "Music Events Ltd",
      type: "Tour",
      date: "1-15 Aprile 2024",
      location: "Multiple Venues",
      status: "pianificazione",
      priority: "high",
      equipment: 120,
      crew: 15,
      budget: "€85,000",
      progress: 15
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
      case "pianificazione":
        return <Badge className="bg-purple-100 text-purple-800">Pianificazione</Badge>;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Festival":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Corporate":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Cerimonia":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "Tour":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventi</h1>
          <p className="text-gray-600">Gestione e pianificazione eventi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Evento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <CalendarIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">18</p>
            <p className="text-sm text-gray-600">Eventi Attivi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">285</p>
            <p className="text-sm text-gray-600">Attrezzature Impegnate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">28</p>
            <p className="text-sm text-gray-600">Tecnici Assegnati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-8 w-8 text-purple-500 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold">€</div>
            <p className="text-2xl font-bold text-gray-900">€122K</p>
            <p className="text-sm text-gray-600">Valore Eventi Attivi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id} className={`border-l-4 ${getPriorityColor(event.priority)} hover:shadow-md transition-shadow`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
                    <Badge className={`${getTypeColor(event.type)} border`}>
                      {event.type}
                    </Badge>
                    {getStatusBadge(event.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <strong>Cliente:</strong> {event.client}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <strong>Data:</strong> {event.date}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <strong>Attrezzature:</strong> {event.equipment} pezzi
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Budget:</strong> {event.budget}</p>
                      <p><strong>Crew:</strong> {event.crew} tecnici</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Progresso</span>
                      <span className="text-gray-600">{event.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${event.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-32">
                  <Button variant="outline" size="sm" className="w-full">
                    Dettagli
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Timeline
                  </Button>
                  <Button size="sm" className="w-full">
                    Gestisci
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
