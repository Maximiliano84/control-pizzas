import { useState } from "react";

function Detalle({ ventas = [], gastos = [], filtro, volver }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  // 👉 pantalla inicial
  if (!fechaSeleccionada) {
    return (
      <div className="container">
        <button onClick={volver}>⬅ Volver</button>

        <h2>Detalle ({filtro})</h2>

        <input
          type="date"
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        />

        <p>Seleccioná una fecha para ver datos</p>
      </div>
    );
  }

  // 🔥 normalizamos fecha
  const fecha = new Date(fechaSeleccionada + "T00:00:00");

  // 🔥 FILTRO DE VENTAS
  const ventasFiltradas = ventas.filter((v) => {
    if (!v.timestamp) return false;

    const f = new Date(v.timestamp);

    if (filtro === "hoy") {
      return f.toDateString() === fecha.toDateString();
    }

    if (filtro === "mes") {
      return (
        f.getMonth() === fecha.getMonth() &&
        f.getFullYear() === fecha.getFullYear()
      );
    }

    if (filtro === "semana") {
      const inicioSemana = new Date(fecha);
      inicioSemana.setDate(fecha.getDate() - fecha.getDay());

      const finSemana = new Date(inicioSemana);
      finSemana.setDate(inicioSemana.getDate() + 6);

      return f >= inicioSemana && f <= finSemana;
    }

    return false;
  });

  // 🔥 FILTRO DE GASTOS
  const gastosFiltrados = gastos.filter((g) => {
    if (!g.timestamp) return false;

    const f = new Date(g.timestamp);

    return f.toDateString() === fecha.toDateString();
  });

  // 🔥 TOTALES
  const totalVentas = ventasFiltradas.reduce(
    (acc, v) => acc + v.precio * v.cantidad,
    0
  );

  const totalGastos = gastosFiltrados.reduce(
    (acc, g) => acc + g.monto,
    0
  );

  const pizzas = ventasFiltradas.reduce(
    (acc, v) => acc + v.cantidad,
    0
  );

  return (
    <div className="container">
      <button onClick={volver}>⬅ Volver</button>

      <h2>Detalle ({filtro})</h2>

      <input
        type="date"
        onChange={(e) => setFechaSeleccionada(e.target.value)}
      />

      <h3>Pizzas: {pizzas}</h3>
      <h3>Ventas: ${totalVentas}</h3>
      <h3>Gastos: ${totalGastos}</h3>
      <h3>Ganancia: ${totalVentas - totalGastos}</h3>

      <hr />

      {/* 🔥 LISTA DE VENTAS */}
      <h3>Ventas</h3>

      {ventasFiltradas.length === 0 ? (
        <p>No hay ventas</p>
      ) : (
        <div className="lista">
          {[...ventasFiltradas]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((v) => (
              <div className="item" key={v.id}>
                <div>
                  <strong>{v.producto}</strong>
                  <p>{v.fecha}</p>
                </div>

                <div className="item-right">
                  <p>
                    ${v.precio} x {v.cantidad}
                  </p>
                </div>
              </div>
            ))}
          <hr />

          <h3>Gastos</h3>

          {gastosFiltrados.length === 0 ? (
            <p>No hay gastos</p>
          ) : (
            <div className="lista">
              {[...gastosFiltrados]
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((g) => (
                  <div className="item" key={g.id}>
                    <div>
                      <strong>{g.descripcion}</strong>
                      <p>{g.fecha}</p>
                    </div>

                    <div className="item-right">
                      <p>${g.monto}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

      )}
    </div>
  );
}

export default Detalle;