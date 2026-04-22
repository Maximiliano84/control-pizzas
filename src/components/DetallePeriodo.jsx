import React from "react";

function DetallePeriodo({ ventas = [], gastos = [], tipo, volver }) {
    const ahora = new Date();

    // 🔥 FUNCION FILTRO AUTOMÁTICO
    const filtrar = (item) => {
        if (!item.timestamp) return false;

        const f = new Date(item.timestamp);

        // 👉 HOY
        if (tipo === "hoy") {
            return f.toDateString() === ahora.toDateString();
        }

        // 👉 SEMANA ACTUAL
        if (tipo === "semana") {
            const inicio = new Date(ahora);
            inicio.setDate(ahora.getDate() - ahora.getDay());

            const fin = new Date(inicio);
            fin.setDate(inicio.getDate() + 6);

            return f >= inicio && f <= fin;
        }

        // 👉 MES ACTUAL
        if (tipo === "mes") {
            return (
                f.getMonth() === ahora.getMonth() &&
                f.getFullYear() === ahora.getFullYear()
            );
        }

        return false;
    };

    const ventasFiltradas = ventas.filter(filtrar);
    const gastosFiltrados = gastos.filter(filtrar);

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

            <h2>Detalle ({tipo})</h2>

            {/* 🔥 GANANCIA GRANDE */}
            <div style={{ textAlign: "center", margin: "20px 0" }}>
                <h3>Ganancia</h3>
                <h1
                    className={
                        totalVentas - totalGastos > 0
                            ? "positivo"
                            : totalVentas - totalGastos < 0
                                ? "negativo"
                                : "neutro"
                    }
                >
                    ${totalVentas - totalGastos}
                </h1>
            </div>

            <p>Pizzas vendidas: {pizzas}</p>
            <p>Ventas: ${totalVentas}</p>
            <p>Gastos: ${totalGastos}</p>

            <hr />

            {/* 🔥 VENTAS */}
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
                                        ${v.precio} x {v.cantidad} = $
                                        {v.precio * v.cantidad}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <hr />

            {/* 🔥 GASTOS */}
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
    );
}

export default DetallePeriodo;