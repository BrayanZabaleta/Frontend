
import { useState, useEffect } from "react";
import {
  History,
  House,
  MapPin,
  Trash2,
  Search,
  Calculator,
  CalendarDays,
  DollarSign
} from "lucide-react";

function Historial({ setActivePage }) {
  const [estimaciones, setEstimaciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Cargar historial guardado
  useEffect(() => {
    const datos = JSON.parse(
      localStorage.getItem("smartrent_estimaciones") || "[]"
    );

    setEstimaciones(datos);
  }, []);

  // Eliminar una estimación
  const eliminarEstimacion = (id) => {
    const nuevosRegistros = estimaciones.filter(
      (item) => item.id !== id
    );

    setEstimaciones(nuevosRegistros);

    localStorage.setItem(
      "smartrent_estimaciones",
      JSON.stringify(nuevosRegistros)
    );
  };

  // Eliminar todo el historial
  const limpiarHistorial = () => {
    if (window.confirm("¿Deseas eliminar todo el historial?")) {
      setEstimaciones([]);
      localStorage.removeItem("smartrent_estimaciones");
    }
  };

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(valor);

  // Filtrar registros
  const filtradas = estimaciones.filter((item) =>
    `${item.ciudad} ${item.barrio} ${item.tipo}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-5 md:p-8 space-y-7">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
            <History size={18} />
            REGISTRO DE CONSULTAS
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Historial de estimaciones
          </h1>

          <p className="text-slate-500 mt-2">
            Consulta las valoraciones de viviendas realizadas anteriormente.
          </p>
        </div>

        <button
          onClick={() => setActivePage("Nueva estimación")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Calculator size={19} />
          Nueva estimación
        </button>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <House size={23} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total de estimaciones
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {estimaciones.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
              <DollarSign size={23} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Promedio de precios estimados
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {estimaciones.length > 0
                  ? formatoPrecio(
                      Math.round(
                        estimaciones.reduce(
                          (total, item) => total + item.precio,
                          0
                        ) / estimaciones.length
                      )
                    )
                  : "$0"}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">

          <div>
            <h2 className="font-bold text-lg text-slate-800">
              Consultas realizadas
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Registro de las viviendas analizadas.
            </p>
          </div>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Buscar por barrio o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full md:w-72 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {estimaciones.length === 0 ? (

          <div className="text-center py-16 px-5">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
              <History size={35} className="text-slate-400" />
            </div>

            <h3 className="text-lg font-bold text-slate-700">
              No hay estimaciones registradas
            </h3>

            <p className="text-sm text-slate-500 mt-2 mb-6">
              Cuando realices una estimación, aparecerá aquí.
            </p>

            <button
              onClick={() => setActivePage("Nueva estimación")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Realizar primera estimación
            </button>
          </div>

        ) : filtradas.length === 0 ? (

          <div className="text-center py-12 text-slate-500">
            No se encontraron resultados para esa búsqueda.
          </div>

        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[750px]">

              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-5 py-4">Inmueble</th>
                  <th className="px-5 py-4">Características</th>
                  <th className="px-5 py-4">Fecha</th>
                  <th className="px-5 py-4">Precio estimado</th>
                  <th className="px-5 py-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtradas.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">
                        {item.tipo}
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={13} />
                        {item.barrio}, {item.ciudad}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">
                        {item.area} m²
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.habitaciones} hab. · {item.banos} baños
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={15} />
                        {item.fecha}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-emerald-600">
                        {formatoPrecio(item.precio)}
                      </span>
                      <p className="text-xs text-slate-400">
                        Valor simulado
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => eliminarEstimacion(item.id)}
                        title="Eliminar estimación"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        {estimaciones.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">
              Mostrando {filtradas.length} de {estimaciones.length} registros
            </p>

            <button
              onClick={limpiarHistorial}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Eliminar todo el historial
            </button>
          </div>
        )}

      </div>

      <p className="text-xs text-slate-400 text-center">
        SmartRent AI · Grupo 3 · Historial de datos simulados
      </p>

    </div>
  );
}

export default Historial;
