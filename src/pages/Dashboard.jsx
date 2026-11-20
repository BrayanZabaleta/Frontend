
import {
  House,
  DollarSign,
  Calculator,
  TrendingUp,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";

const Dashboard = ({ setActivePage }) => {
  const stats = [
    {
      title: "Viviendas analizadas",
      value: "1.250",
      description: "Registros de ejemplo",
      icon: House,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Precio promedio",
      value: "$950.000",
      description: "Valor mensual simulado",
      icon: DollarSign,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Estimaciones",
      value: "86",
      description: "Consultas de ejemplo",
      icon: Calculator,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Zonas registradas",
      value: "12",
      description: "Zonas de ejemplo",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="p-8 space-y-8">

      <section className="bg-gradient-to-r from-[#102B46] to-[#176B67] rounded-2xl p-8 text-white">
        <p className="text-emerald-300 text-sm font-medium mb-2">
          INTELIGENCIA ARTIFICIAL INMOBILIARIA
        </p>

        <h1 className="text-3xl font-bold mb-3">
          Bienvenido a SmartRent AI
        </h1>

        <p className="text-slate-200 max-w-xl mb-6">
          Descubre cuánto podría costar el arrendamiento
          de una vivienda mediante nuestro sistema
          de estimación inteligente.
        </p>

        <button
          onClick={() => setActivePage("Nueva estimación")}
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
        >
          Nueva estimación
          <ArrowRight size={18} />
        </button>
      </section>

      <section>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Resumen general
            </h2>
            <p className="text-sm text-slate-500">
              Indicadores ilustrativos del sistema
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight className="text-slate-400" size={20} />
                </div>

                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {stat.value}
                </h3>

                <p className="text-xs text-slate-400 mt-2">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-2">
            ¿Cómo funciona SmartRent AI?
          </h2>

          <p className="text-sm text-slate-500 mb-5">
            El sistema analiza las características de una
            vivienda para estimar su precio de arrendamiento.
          </p>

          <div className="space-y-4">
            {[
              ["01", "Registrar vivienda", "Ingresar sus características físicas."],
              ["02", "Analizar información", "Procesar los datos mediante un modelo predictivo."],
              ["03", "Obtener estimación", "Consultar el precio mensual aproximado."]
            ].map(([number, title, description]) => (
              <div key={number} className="flex gap-4 items-center">
                <div className="bg-emerald-100 text-emerald-700 rounded-xl w-11 h-11 flex items-center justify-center font-bold">
                  {number}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-700">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-2">
            Comienza ahora
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            Registra las características de un inmueble y
            descubre su valor estimado de arrendamiento.
          </p>

          <div className="bg-emerald-50 rounded-xl p-5 mb-5">
            <Calculator size={32} className="text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-800">
              Estimación de precios
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Área, habitaciones, ubicación y otras características.
            </p>
          </div>

          <button
            onClick={() => setActivePage("Nueva estimación")}
            className="w-full bg-[#102B46] hover:bg-[#1b4263] text-white py-3 rounded-xl font-semibold transition"
          >
            Calcular arrendamiento
          </button>
        </div>
      </section>

      <p className="text-xs text-slate-400 text-center">
        SmartRent AI · Grupo 3 · Prototipo académico con datos simulados
      </p>

    </div>
  );
};

export default Dashboard;
