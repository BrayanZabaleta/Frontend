
import { useEffect, useState } from "react";
import {
  Sparkles,
  House,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Car,
  Sofa,
  Trees,
  CalendarDays,
  TrendingUp,
  ArrowRight,
  Calculator,
  History,
  CheckCircle2,
  Building2
} from "lucide-react";

function Resultados({ setActivePage }) {
  const [inmueble, setInmueble] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(
      localStorage.getItem("smartrent_estimaciones") || "[]"
    );

    if (datos.length > 0) {
      setInmueble(datos[0]);
    }
  }, []);

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(valor || 0);

  if (!inmueble) {
    return (
      <div className="p-5 md:p-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <Calculator size={45} className="mx-auto text-slate-300 mb-4" />

          <h2 className="text-xl font-bold text-slate-800">
            No hay resultados disponibles
          </h2>

          <p className="text-slate-500 mt-2 mb-6">
            Primero debes realizar una estimación de una vivienda.
          </p>

          <button
            onClick={() => setActivePage("Nueva estimación")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Crear estimación
          </button>
        </div>
      </div>
    );
  }

  const caracteristicas = [
    {
      nombre: "Habitaciones",
      valor: `${inmueble.habitaciones} habitaciones`,
      icono: BedDouble
    },
    {
      nombre: "Baños",
      valor: `${inmueble.banos} baños`,
      icono: Bath
    },
    {
      nombre: "Área",
      valor: `${inmueble.area} m²`,
      icono: Ruler
    },
    {
      nombre: "Antigüedad",
      valor: `${inmueble.antiguedad} años`,
      icono: Building2
    },
    {
      nombre: "Parqueadero",
      valor: inmueble.parqueadero || "No registrado",
      icono: Car
    },
    {
      nombre: "Amoblado",
      valor: inmueble.amoblado || "No registrado",
      icono: Sofa
    }
  ];

  const adicionales = [
    { nombre: "Balcón", activo: inmueble.balcon },
    { nombre: "Terraza", activo: inmueble.terraza },
    { nombre: "Zonas comunes", activo: inmueble.zonasComunes }
  ];

  return (
    <div className="p-5 md:p-8 space-y-7">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
            <Sparkles size={18} />
            INFORME DE VALORACIÓN INMOBILIARIA
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Resultado de la estimación
          </h1>

          <p className="text-slate-500 mt-2">
            Consulta el resumen de la vivienda y su valor mensual estimado.
          </p>
        </div>

        <button
          onClick={() => setActivePage("Nueva estimación")}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          <Calculator size={18} />
          Nueva estimación
        </button>
      </div>

      {/* Precio principal */}
      <div className="bg-[#102B46] rounded-2xl p-7 md:p-9 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold">
            <TrendingUp size={19} />
            VALOR MENSUAL ESTIMADO
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mt-5">
            {formatoPrecio(inmueble.precio)}
          </h2>

          <p className="text-slate-300 mt-3">
            Precio de referencia mensual para el arrendamiento.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">
              {inmueble.tipo}
            </span>

            <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">
              {inmueble.area} m²
            </span>

            <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">
              {inmueble.habitaciones} habitaciones
            </span>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full border-[35px] border-white/5" />
        <div className="absolute right-20 -top-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Aviso académico */}
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Sparkles size={21} className="text-amber-600 shrink-0" />

        <div>
          <h3 className="text-sm font-bold text-amber-900">
            Resultado de simulación académica
          </h3>

          <p className="text-sm text-amber-800 mt-1">
            Este valor se calcula mediante una fórmula ilustrativa
            implementada en el frontend. No corresponde todavía
            a una predicción de un modelo de Inteligencia Artificial
            entrenado con datos reales.
          </p>
        </div>
      </div>

      {/* Información del inmueble */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
              <House size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg text-slate-800">
                Información del inmueble
              </h2>

              <p className="text-sm text-slate-500">
                Características registradas para la valoración.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={17} />
              Ubicación
            </div>

            <h3 className="text-lg font-bold text-slate-800 mt-2">
              {inmueble.barrio}
            </h3>

            <p className="text-sm text-slate-500">
              {inmueble.ciudad}, Colombia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caracteristicas.map((item) => {
              const Icon = item.icono;

              return (
                <div
                  key={item.nombre}
                  className="flex items-center gap-3 border-b border-slate-100 pb-4"
                >
                  <div className="bg-slate-100 text-slate-600 p-3 rounded-xl">
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      {item.nombre}
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {item.valor}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7">
            <h3 className="font-bold text-slate-800 mb-4">
              Características adicionales
            </h3>

            <div className="flex flex-wrap gap-3">
              {adicionales.map((item) => (
                <span
                  key={item.nombre}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                    item.activo
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {item.nombre}: {item.activo ? "Sí" : "No"}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen lateral */}
        <div className="space-y-5">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-slate-800 mb-5">
              Resumen de valoración
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-slate-500">
                  Tipo de inmueble
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {inmueble.tipo}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  Superficie
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {inmueble.area} metros cuadrados
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  Ubicación
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {inmueble.ciudad}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  Fecha de estimación
                </p>

                <p className="font-semibold text-slate-800 mt-1 flex items-center gap-2">
                  <CalendarDays size={16} />
                  {inmueble.fecha}
                </p>
              </div>

            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-emerald-700 mb-3">
              <Sparkles size={20} />
              <h3 className="font-bold">Análisis del sistema</h3>
            </div>

            <p className="text-sm text-emerald-900 leading-relaxed">
              Se registraron las características físicas,
              ubicación y servicios adicionales del inmueble.
              Estas variables forman parte de los atributos
              definidos para el proyecto SmartRent AI.
            </p>
          </div>

        </div>
      </div>

      {/* Acciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <button
          onClick={() => setActivePage("Historial")}
          className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 p-4 rounded-xl font-semibold"
        >
          <History size={19} />
          Consultar historial
          <ArrowRight size={17} />
        </button>

        <button
          onClick={() => setActivePage("Nueva estimación")}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-semibold"
        >
          <Calculator size={19} />
          Realizar otra estimación
          <ArrowRight size={17} />
        </button>

      </div>

      <p className="text-xs text-slate-400 text-center">
        SmartRent AI · Grupo 3 · Informe de estimación inmobiliaria
      </p>

    </div>
  );
}

export default Resultados;
