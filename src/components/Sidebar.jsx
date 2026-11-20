import {
  LayoutDashboard,
  Calculator,
  History,
  Scale,
  BarChart3,
  Info,
  Building2,
} from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    {
      id: "Dashboard",
      name: "Panel principal",
      icon: LayoutDashboard,
    },
    {
      id: "Nueva estimación",
      name: "Nueva estimación",
      icon: Calculator,
    },
    {
      id: "Historial",
      name: "Historial",
      icon: History,
    },
    {
      id: "Comparar precios",
      name: "Comparar precios",
      icon: Scale,
    },
    {
      id: "Resultados",
      name: "Resultados",
      icon: BarChart3,
    },
    {
      id: "Proyecto",
      name: "Proyecto",
      icon: Info,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Logo / Título del sistema */}
      <div className="h-20 px-6 border-b border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
          <Building2 size={22} />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800 leading-tight">
            ArriendosApp
          </h1>
          <p className="text-xs text-slate-500">Gestión & Estimación</p>
        </div>
      </div>

      {/* Opciones del menú */}
      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              <IconComponent size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;