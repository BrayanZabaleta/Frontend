
import { useEffect, useState } from "react";
import {
  ChartNoAxesCombined,
  MapPin,
  House,
  DollarSign,
  TrendingUp,
  Search,
  BarChart3,
  RefreshCw
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function CompararPrecios({ setActivePage }) {
  const [estimaciones, setEstimaciones] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarEstimaciones();
  }, []);

  const cargarEstimaciones = () => {
    const datos = JSON.parse(
      localStorage.getItem("smartrent_estimaciones") || "[]"
    );

    setEstimaciones(datos);
  };

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(valor);

  // Obtener ciudades registradas
  const ciudades = [
    "Todas",
    ...new Set(estimaciones.map((item) => item.ciudad))
  ];

  // Filtrar estimaciones por ciudad
  const filtradas = estimaciones.filter((item) => {
    const coincideCiudad =
      ciudadSeleccionada === "Todas" ||
      item.ciudad === ciudadSeleccionada;

    const coincideBusqueda =
      `${item.barrio} ${item.tipo}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    return coincideCiudad && coincideBusqueda;
  });

  // Agrupar estimaciones por barrio y ciudad
  const grupos = Object.values(
    filtradas.reduce((acumulador, item) => {
      const clave = `${item.ciudad}-${item.barrio}`;

      if (!acumulador[clave]) {
        acumulador[clave] = {
          barrio: item.barrio,
          ciudad: item.ciudad,
          precios: [],
          viviendas: 0
        };
      }

      acumulador[clave].precios.push(Number(item.precio));
      acumulador[clave].viviendas += 1;

      return acumulador;
    }, {})
  ).map((grupo) => {
    const promedio =
      grupo.precios.reduce((total, precio) => total + precio, 0) /
      grupo.precios.length;

    return {
      ...grupo,
      promedio: Math.round(promedio),
      minimo: Math.min(...grupo.precios),
      maximo: Math.max(...grupo.precios)
    };
  }).sort((a, b) => b.promedio - a.promedio);

  const totalViviendas = filtradas.length;

  const promedioGeneral = totalViviendas > 0
    ? filtradas.reduce((total, item) => total + Number(item.precio), 0) /
      totalViviendas
    : 0;

  const precioMayor = grupos.length > 0
    ? Math.max(...grupos.map((item) => item.maximo))
    : 0;

  const precioMenor = grupos.length > 0
    ? Math.min(...grupos.map((item) => item.minimo))
    : 0;

  const datosGrafica = grupos.map((item) => ({
    zona: item.barrio.length > 15
      ? item.barrio.substring(0, 15) + "..."
      : item.barrio,
    promedio: item.promedio,
    ciudad: item.ciudad
  }));

  return (
    <div className="p-5 md:p-8 space-y-7">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
            <ChartNoAxesCombined size={18} />
            ANÁLISIS INMOBILIARIO
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Comparación de precios
          </h1>

          <p className="text-slate-500 mt-2">
            Analiza y compara los precios estimados de las viviendas
            registradas por diferentes zonas.
          </p>
        </div>

        <button
          onClick={cargarEstimaciones}
          className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700"
        >
          <RefreshCw size={17} />
          Actualizar datos
        </button>
      </div>

      {/* Aviso de datos */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-800">
          <strong>Nota:</strong> los valores presentados provienen de
          las estimaciones simuladas guardadas en el historial.
          No representan precios reales del mercado inmobiliario.
        </p>
      </div>

      {/* Filtro */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-slate-800 mb-4">
          Filtros de comparación
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Seleccionar ciudad
            </label>

            <select
              value={ciudadSeleccionada}
              onChange={(e) => setCiudadSeleccionada(e.target.value)}
              className="w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Buscar barrio o tipo de vivienda
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-5 text-slate-400"
              />

              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Ej. Cabecera, apartamento..."
                className="w-full mt-2 pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="bg-blue-100 text-blue-600 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
            <House size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Viviendas comparadas
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-1">
            {totalViviendas}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="bg-emerald-100 text-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
            <DollarSign size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Precio promedio
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-1">
            {formatoPrecio(promedioGeneral)}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="bg-purple-100 text-purple-600 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Precio más alto
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-1">
            {formatoPrecio(precioMayor)}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="bg-orange-100 text-orange-600 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Precio más bajo
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-1">
            {formatoPrecio(precioMenor)}
          </h2>
        </div>

      </div>

      {/* Gráfica */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Promedio de precios por barrio
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Comparación de los valores estimados agrupados por zona.
          </p>
        </div>

        {grupos.length === 0 ? (
          <div className="text-center py-16">
            <BarChart3
              size={45}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="font-bold text-slate-700">
              No hay datos para comparar
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Realiza varias estimaciones en diferentes barrios
              para visualizar la comparación.
            </p>

            <button
              onClick={() => setActivePage("Nueva estimación")}
              className="mt-5 bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-emerald-700"
            >
              Registrar vivienda
            </button>
          </div>
        ) : (
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosGrafica}
                margin={{ top: 10, right: 20, left: 15, bottom: 35 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="zona"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  tickFormatter={(value) =>
                    `$${(value / 1000000).toFixed(1)}M`
                  }
                  tick={{ fontSize: 11 }}
                />

                <Tooltip
                  formatter={(value) => [
                    formatoPrecio(value),
                    "Precio promedio"
                  ]}
                  labelFormatter={(label) => `Zona: ${label}`}
                />

                <Bar
                  dataKey="promedio"
                  fill="#059669"
                  radius={[7, 7, 0, 0]}
                  maxBarSize={65}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Tabla de comparación */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            Detalle comparativo por zona
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Resumen de los registros agrupados por barrio y ciudad.
          </p>
        </div>

        {grupos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[650px]">

              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Zona</th>
                  <th className="px-5 py-4">Viviendas</th>
                  <th className="px-5 py-4">Precio mínimo</th>
                  <th className="px-5 py-4">Precio promedio</th>
                  <th className="px-5 py-4">Precio máximo</th>
                </tr>
              </thead>

              <tbody>
                {grupos.map((grupo) => (
                  <tr
                    key={`${grupo.ciudad}-${grupo.barrio}`}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {grupo.barrio}
                      </p>

                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={13} />
                        {grupo.ciudad}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {grupo.viviendas}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatoPrecio(grupo.minimo)}
                    </td>

                    <td className="px-5 py-4 font-bold text-emerald-600">
                      {formatoPrecio(grupo.promedio)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatoPrecio(grupo.maximo)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500 py-8">
            Todavía no hay registros disponibles para comparar.
          </p>
        )}

      </div>

      <p className="text-xs text-slate-400 text-center">
        SmartRent AI · Grupo 3 · Comparación basada en estimaciones simuladas
      </p>

    </div>
  );
}

export default CompararPrecios;
