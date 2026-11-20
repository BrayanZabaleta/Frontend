
import { useState } from "react";
import {
  MapPin,
  House,
  BedDouble,
  Bath,
  Ruler,
  Car,
  Sofa,
  Trees,
  Calculator,
  Sparkles,
  Building2
} from "lucide-react";

function Estimacion({ setActivePage }) {
  const [form, setForm] = useState({
    ciudad: "Bucaramanga",
    barrio: "",
    tipo: "Apartamento",
    area: "",
    habitaciones: "2",
    banos: "1",
    antiguedad: "5",
    parqueadero: "No",
    amoblado: "No",
    balcon: false,
    terraza: false,
    zonasComunes: false
  });

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

    setResultado(null);
    setError("");
  };

  const calcularPrecio = (e) => {
    e.preventDefault();

    if (!form.barrio.trim() || !form.area || !form.antiguedad) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    const area = Number(form.area);
    const antiguedad = Number(form.antiguedad);

    if (area <= 0 || antiguedad < 0) {
      setError("El área debe ser mayor a cero y la antigüedad no puede ser negativa.");
      return;
    }

    // Simulación ilustrativa. No representa un modelo de IA entrenado.
    let precio = area * 11000;
    precio += Number(form.habitaciones) * 75000;
    precio += Number(form.banos) * 50000;

    if (form.tipo === "Casa") precio *= 1.12;
    if (form.tipo === "Apartaestudio") precio *= 0.85;

    if (form.parqueadero === "Sí") precio += 120000;
    if (form.amoblado === "Sí") precio += 180000;
    if (form.balcon) precio += 50000;
    if (form.terraza) precio += 70000;
    if (form.zonasComunes) precio += 80000;

    precio *= Math.max(0.85, 1 - antiguedad * 0.005);

    
const precioFinal = Math.round(precio / 10000) * 10000;

setResultado(precioFinal);
setError("");

// Crear registro de la estimación
const nuevaEstimacion = {
  id: Date.now(),
  ciudad: form.ciudad,
  barrio: form.barrio,
  tipo: form.tipo,
  area: Number(form.area),
  habitaciones: Number(form.habitaciones),
  banos: Number(form.banos),
  antiguedad: Number(form.antiguedad),
  parqueadero: form.parqueadero,
  amoblado: form.amoblado,
  balcon: form.balcon,
  terraza: form.terraza,
  zonasComunes: form.zonasComunes,
  precio: precioFinal,
  fecha: new Date().toLocaleString("es-CO")
};

// Obtener historial existente
const historial = JSON.parse(
  localStorage.getItem("smartrent_estimaciones") || "[]"
);

// Guardar nueva estimación
localStorage.setItem(
  "smartrent_estimaciones",
  JSON.stringify([nuevaEstimacion, ...historial])
);

  };

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(valor);

  const inputClass =
    "w-full mt-2 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-700";

  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <div className="p-5 md:p-8 space-y-6">

      <div>
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
          <Sparkles size={17} />
          INTELIGENCIA ARTIFICIAL INMOBILIARIA
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Nueva estimación
        </h1>

        <p className="text-slate-500 mt-2">
          Registra las características de la vivienda para conocer
          su posible precio mensual de arrendamiento.
        </p>
      </div>

      <form onSubmit={calcularPrecio} className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-7 shadow-sm">

          <section>
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="text-emerald-600" />
              <h2 className="font-bold text-lg text-slate-800">
                Ubicación del inmueble
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Ciudad *</label>
                <select name="ciudad" value={form.ciudad} onChange={handleChange} className={inputClass}>
                  <option>Bucaramanga</option>
                  <option>Floridablanca</option>
                  <option>Girón</option>
                  <option>Piedecuesta</option>
                  <option>Pamplona</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Barrio o zona *</label>
                <input
                  name="barrio"
                  value={form.barrio}
                  onChange={handleChange}
                  placeholder="Ej. Cabecera del Llano"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <div className="flex items-center gap-2 mb-5">
              <House className="text-emerald-600" />
              <h2 className="font-bold text-lg text-slate-800">
                Características físicas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Tipo de vivienda</label>
                <select name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Apartaestudio</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Área en metros cuadrados *</label>
                <div className="relative">
                  <Ruler size={18} className="absolute left-3 top-5 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="Ej. 85"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Habitaciones</label>
                <div className="relative">
                  <BedDouble size={18} className="absolute left-3 top-5 text-slate-400" />
                  <select name="habitaciones" value={form.habitaciones} onChange={handleChange} className={`${inputClass} pl-10`}>
                    {[0, 1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Baños</label>
                <div className="relative">
                  <Bath size={18} className="absolute left-3 top-5 text-slate-400" />
                  <select name="banos" value={form.banos} onChange={handleChange} className={`${inputClass} pl-10`}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Antigüedad (años) *</label>
                <input
                  type="number"
                  min="0"
                  name="antiguedad"
                  value={form.antiguedad}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="text-emerald-600" />
              <h2 className="font-bold text-lg text-slate-800">
                Servicios y características adicionales
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>¿Tiene parqueadero?</label>
                <select name="parqueadero" value={form.parqueadero} onChange={handleChange} className={inputClass}>
                  <option>No</option>
                  <option>Sí</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>¿Está amoblado?</label>
                <select name="amoblado" value={form.amoblado} onChange={handleChange} className={inputClass}>
                  <option>No</option>
                  <option>Sí</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { name: "balcon", label: "Balcón", icon: House },
                { name: "terraza", label: "Terraza", icon: House },
                { name: "zonasComunes", label: "Zonas comunes", icon: Trees }
              ].map(item => {
                const Icon = item.icon;

                return (
                  <label key={item.name} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-emerald-50 transition">
                    <input
                      type="checkbox"
                      name={item.name}
                      checked={form[item.name]}
                      onChange={handleChange}
                      className="w-4 h-4 accent-emerald-600"
                    />
                    <Icon size={19} className="text-emerald-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <Calculator size={20} />
            Calcular precio de arrendamiento
          </button>
        </div>

        <div className="space-y-5">
          <div className="bg-[#102B46] rounded-2xl p-6 text-white">
            <Sparkles className="text-emerald-400 mb-4" size={30} />

            <h2 className="text-xl font-bold mb-2">
              Estimación inteligente
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              El sistema considera las características físicas
              y de ubicación del inmueble para generar un
              valor de referencia.
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs text-slate-400">
                VARIABLE OBJETIVO
              </p>
              <p className="font-semibold mt-1">
                Precio mensual de arrendamiento
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3">
              Resultado de la estimación
            </h3>

            {resultado === null ? (
              <div className="text-center py-8">
                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calculator size={28} className="text-slate-400" />
                </div>

                <p className="text-sm text-slate-500">
                  Completa el formulario y calcula el precio de tu vivienda.
                </p>
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="text-sm text-slate-500 mb-2">
                  Precio mensual simulado
                </p>

                <h2 className="text-3xl font-bold text-emerald-600">
                  {formatoPrecio(resultado)}
                </h2>

                <p className="text-xs text-slate-400 mt-3">
                  {form.ciudad} · {form.barrio}
                </p>

                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 mt-5 text-xs text-left">
                  Este resultado es una simulación académica.
                  Todavía no corresponde a una predicción de un
                  modelo de IA entrenado.
                </div>

                <div className="space-y-3 mt-5">
  <button
    type="button"
    onClick={() => setActivePage("Resultados")}
    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold"
  >
    Ver informe detallado
  </button>

  <button
    type="button"
    onClick={() => setActivePage("Historial")}
    className="w-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-3 rounded-xl font-semibold"
  >
    Ir al historial
  </button>
</div>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5">
            <h3 className="font-semibold text-emerald-900 text-sm">
              Consejo
            </h3>
            <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
              Ingresa información precisa de la vivienda para
              obtener una simulación más coherente.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Estimacion;
