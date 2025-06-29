import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Calendar, 
  Warehouse, 
  Users, 
  FileText,
  Zap,
  Volume2,
  Video,
  Lightbulb,
  Building2,
  Layers3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Eventi", url: "/events", icon: Calendar },
  { title: "Magazzini", url: "/warehouses", icon: Warehouse },
  { title: "Stage Designer", url: "/stage-designer", icon: Layers3 },
];

const categoryItems = [
  { title: "Audio", url: "/inventory/audio", icon: Volume2 },
  { title: "Video", url: "/inventory/video", icon: Video },
  { title: "Luci", url: "/inventory/lights", icon: Lightbulb },
  { title: "Strutture", url: "/inventory/structures", icon: Building2 },
  { title: "Generatori", url: "/inventory/generators", icon: Zap },
];

const managementItems = [
  { title: "Clienti", url: "/clients", icon: Users },
  { title: "Documenti", url: "/documents", icon: FileText },
];

export function AppSidebar() {
  const getNavClass = (isActive: boolean) =>
    isActive 
      ? "bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-700" 
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/88e9a791-bf35-443c-bce5-7fcd400eefc9.png" 
            alt="PS Service Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principale</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => getNavClass(isActive)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categorie</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => getNavClass(isActive)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestione</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => getNavClass(isActive)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
