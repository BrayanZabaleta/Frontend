import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Estimacion from "./pages/Estimacion";
import Historial from "./pages/Historial";
import CompararPrecios from "./pages/CompararPrecios";
import Resultados from "./pages/Resultados";
import Proyecto from "./pages/Proyecto";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1 min-w-0">
        <Header />

        {activePage === "Dashboard" && (
          <Dashboard setActivePage={setActivePage} />
        )}

        {activePage === "Nueva estimación" && (
          <Estimacion setActivePage={setActivePage} />
        )}

        {activePage === "Historial" && (
          <Historial setActivePage={setActivePage} />
        )}

        {activePage === "Comparar precios" && (
          <CompararPrecios setActivePage={setActivePage} />
        )}

        {activePage === "Resultados" && (
          <Resultados setActivePage={setActivePage} />
        )}

        {activePage === "Proyecto" && (
          <Proyecto setActivePage={setActivePage} />
        )}
      </main>
    </div>
  );
}

export default App;