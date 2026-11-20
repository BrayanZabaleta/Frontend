
import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Panel principal
        </h2>

        <p className="text-sm text-slate-500">
          Sistema de estimación de arrendamientos
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-slate-500">
          <Search size={21} />
        </button>

        <button className="relative text-slate-500">
          <Bell size={21} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            BZ
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Brayan Zabaleta
            </p>

            <p className="text-xs text-slate-500">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
