
import {
  Sparkles,
  Target,
  BrainCircuit,
  Database,
  Code2,
  MapPin,
  House,
  BedDouble,
  Bath,
  Ruler,
  Car,
  Users,
  ArrowRight
} from "lucide-react";

function Proyecto({ setActivePage }) {
  const variables = [
    { nombre: "Área del inmueble", icono: Ruler },
    { nombre: "Habitaciones", icono: BedDouble },
    { nombre: "Número de baños", icono: Bath },
    { nombre: "Ubicación o zona", icono: MapPin },
    { nombre: "Tipo de vivienda", icono: House },
    { nombre: "Antigüedad", icono: Database },
    { nombre: "Parqueadero y amoblado", icono: Car }
  ];

  const tecnologias = [
    { nombre: "React", descripcion: "Construcción de la interfaz de usuario." },
    { nombre: "Tailwind CSS", descripcion: "Diseño visual y estilos." },
    { nombre: "JavaScript", descripcion: "Lógica e interactividad del frontend." },
    { nombre: "Python", descripcion: "Procesamiento de datos y desarrollo del modelo predictivo." },
    { nombre: "Machine Learning", descripcion: "Modelos de regresión para estimar precios." }
  ];

  return (
    <div className="p-5 md:p-8 space-y-7">

      <div>
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
          <Sparkles size={18} />
          CONOCE NUESTRO PROYECTO
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Acerca de SmartRent AI
        </h1>

        <p className="text-slate-500 mt-2">
          Inteligencia artificial aplicada a la estimación
          de precios de arrendamiento de viviendas.
        </p>
      </div>

      <div className="bg-[#102B46] rounded-2xl p-7 md:p-10 text-white">
        <div className="max-w-3xl">
          <span className="text-emerald-300 font-semibold text-sm">
            PROYECTO DE INTELIGENCIA ARTIFICIAL PREDICTIVA
          </span>

          <h2 className="text-2xl md:text-4xl font-bold mt-4 leading-tight">
            SmartRent AI: estimación inteligente del precio de arrendamiento
          </h2>

          <p className="text-slate-300 mt-5 leading-relaxed">
            Un sistema diseñado para analizar las características
            de una vivienda y estimar su posible precio mensual
            de arrendamiento mediante técnicas de aprendizaje
            automático y modelos de regresión.
          </p>

          <button
            onClick={() => setActivePage("Nueva estimación")}
            className="mt-7 bg-emerald-500 hover:bg-emerald-600 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            Probar el sistema
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Target size={25} />
          </div>

          <h3 className="font-bold text-lg text-slate-800">
            Problema identificado
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mt-3">
            Determinar el precio adecuado de arrendamiento
            de una vivienda es complejo porque depende de
            diferentes características físicas, servicios
            y condiciones de ubicación.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <BrainCircuit size={25} />
          </div>

          <h3 className="font-bold text-lg text-slate-800">
            Objetivo del sistema
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mt-3">
            Desarrollar un sistema predictivo capaz de
            estimar el valor mensual del alquiler a partir
            de las características de cada inmueble.
          </p>
        </div>

      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-xl text-slate-800 mb-2">
          Variables utilizadas
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Características consideradas para describir cada vivienda.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {variables.map((variable) => {
            const Icon = variable.icono;

            return (
              <div
                key={variable.nombre}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl"
              >
                <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg">
                  <Icon size={20} />
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {variable.nombre}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-4 bg-emerald-50 rounded-xl">
          <p className="text-sm text-emerald-800">
            <strong>Variable objetivo:</strong> precio mensual
            del arrendamiento de la vivienda.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Database className="text-emerald-600" size={25} />

          <div>
            <h2 className="font-bold text-xl text-slate-800">
              Funcionamiento del sistema
            </h2>

            <p className="text-sm text-slate-500">
              Proceso general de estimación predictiva.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            ["01", "Ingreso de datos", "El usuario registra las características del inmueble."],
            ["02", "Procesamiento", "Se organizan y preparan los atributos de la vivienda."],
            ["03", "Modelo predictivo", "Un modelo de regresión analiza los datos y genera una estimación."],
            ["04", "Resultado", "El sistema presenta el precio mensual estimado."]
          ].map((paso) => (
            <div key={paso[0]} className="bg-slate-50 rounded-xl p-5">
              <span className="text-emerald-600 font-bold text-2xl">
                {paso[0]}
              </span>

              <h3 className="font-bold text-slate-800 mt-3">
                {paso[1]}
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {paso[2]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <Code2 className="text-emerald-600" size={25} />

          <h2 className="font-bold text-xl text-slate-800">
            Tecnologías del proyecto
          </h2>
        </div>

        <div className="space-y-4">
          {tecnologias.map((tecnologia) => (
            <div key={tecnologia.nombre} className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-800">
                {tecnologia.nombre}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {tecnologia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <Users className="text-emerald-600" size={25} />

          <h2 className="font-bold text-xl text-slate-800">
            Integrantes del Grupo 3
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Daniel Felipe Luna",
            "Natalia Sofia Niño",
            "Brayan Gabriel Zabaleta"
          ].map((nombre, index) => (
            <div key={nombre} className="bg-slate-50 rounded-xl p-5">
              <div className="bg-emerald-100 text-emerald-700 w-11 h-11 rounded-full flex items-center justify-center font-bold mb-3">
                {nombre.split(" ").map(p => p[0]).slice(0, 2).join("")}
              </div>

              <p className="font-semibold text-slate-800">
                {nombre}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Integrante {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center">
        SmartRent AI · Proyecto de curso · Grupo 3
      </p>

    </div>
  );
}

export default Proyecto;
