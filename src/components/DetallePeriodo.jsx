import React, { useState } from "react";

function DetallePeriodo({ ventas = [], gastos = [], tipo, volver }) {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(
        new Date().toISOString().split("T")[0]
    );

    // 🔥 FILTRO
    const filtrar = (item) => {
        if (!item.timestamp && !item.fecha) return false;

        const f = new Date(item.timestamp || item.fecha);

        const [year, month, day] = fechaSeleccionada.split("-");
        const base = new Date(year, month - 1, day);

        if (tipo === "hoy") {
            const inicio = new Date(base);
            inicio.setHours(0, 0, 0, 0);

            const fin = new Date(base);
            fin.setHours(23, 59, 59, 999);

            return f >= inicio && f <= fin;
        }

        if (tipo === "semana") {
            const inicio = new Date(base);
            inicio.setDate(base.getDate() - base.getDay());
            inicio.setHours(0, 0, 0, 0);

            const fin = new Date(inicio);
            fin.setDate(inicio.getDate() + 6);
            fin.setHours(23, 59, 59, 999);

            return f >= inicio && f <= fin;
        }

        if (tipo === "mes") {
            const inicio = new Date(base.getFullYear(), base.getMonth(), 1);
            const fin = new Date(base.getFullYear(), base.getMonth() + 1, 0);

            inicio.setHours(0, 0, 0, 0);
            fin.setHours(23, 59, 59, 999);

            return f >= inicio && f <= fin;
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

    // 🔥 PRODUCTO MÁS VENDIDO
    const productos = {};

    ventasFiltradas.forEach((v) => {
        if (!productos[v.producto]) productos[v.producto] = 0;
        productos[v.producto] += v.cantidad;
    });

    const topProducto = Object.entries(productos).sort(
        (a, b) => b[1] - a[1]
    )[0];

    // 🔥 GANANCIA POR DÍA
    const gananciaPorDia = {};

    ventasFiltradas.forEach((v) => {
        const fecha = new Date(v.timestamp || v.fecha).toLocaleDateString();

        if (!gananciaPorDia[fecha]) gananciaPorDia[fecha] = 0;

        gananciaPorDia[fecha] += v.precio * v.cantidad;
    });

    gastosFiltrados.forEach((g) => {
        const fecha = new Date(g.timestamp || g.fecha).toLocaleDateString();

        if (!gananciaPorDia[fecha]) gananciaPorDia[fecha] = 0;

        gananciaPorDia[fecha] -= g.monto;
    });

    const mejorDia = Object.entries(gananciaPorDia).sort(
        (a, b) => b[1] - a[1]
    )[0];

    // 🔥 PROMEDIO DIARIO
    let diasPeriodo = 1;

    if (tipo === "semana") diasPeriodo = 7;

    if (tipo === "mes") {
        const base = new Date(fechaSeleccionada);
        diasPeriodo = new Date(
            base.getFullYear(),
            base.getMonth() + 1,
            0
        ).getDate();
    }

    const promedioDiario = totalVentas / diasPeriodo;

    // 🔥 PROMEDIO POR VENTA
    const promedioPorVenta =
        ventasFiltradas.length > 0
            ? pizzas / ventasFiltradas.length
            : 0;

    return (
        <div className="container">
            <button onClick={volver}>⬅ Volver</button>

            <h2>Detalle ({tipo})</h2>

            <input
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
            />

            {/* 🔥 GANANCIA */}
            <div className="resumen-dia">
                <h3>Ganancia</h3>
                <h1 className={totalVentas - totalGastos > 0 ? "positivo" : "negativo"}>
                    ${totalVentas - totalGastos}
                </h1>

                <div className="resumen-stats">
                    <div>
                        <span>Pizzas</span>
                        <strong>{pizzas}</strong>
                    </div>
                    <div>
                        <span>Ventas</span>
                        <strong>${totalVentas}</strong>
                    </div>
                    <div>
                        <span>Gastos</span>
                        <strong>${totalGastos}</strong>
                    </div>
                </div>
            </div>

            {/* 🔥 SOLO DETALLE EN HOY */}
            {tipo === "hoy" && (
                <>
                    <div className="grid-detalle">

                        {/* VENTAS */}
                        <div>
                            <h3>Ventas</h3>
                            {ventasFiltradas.length === 0 ? (
                                <p>No hay ventas</p>
                            ) : (
                                <div className="lista">
                                    {[...ventasFiltradas]
                                        .sort((a, b) => b.timestamp - a.timestamp)
                                        .map((v) => (
                                            <div className="venta-card" key={v.id}>
                                                <div className="venta-left">
                                                    <strong>{v.producto}</strong>
                                                    <span className="detalle">
                                                        ${v.precio} × {v.cantidad}
                                                    </span>
                                                </div>

                                                <div className="venta-total">
                                                    ${v.precio * v.cantidad}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* GASTOS */}
                        <div>
                            <h3>Gastos</h3>
                            {gastosFiltrados.length === 0 ? (
                                <p>No hay gastos</p>
                            ) : (
                                <div className="lista">
                                    {[...gastosFiltrados]
                                        .sort((a, b) => b.timestamp - a.timestamp)
                                        .map((g) => (
                                            <div className="gasto-card" key={g.id}>
                                                <span>{g.descripcion}</span>
                                                <strong>${g.monto}</strong>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                    </div>
                </>
            )}

            {/* 🔥 INSIGHTS SOLO SEMANA / MES */}
            {tipo !== "hoy" && (
                <div className="insights">
                    <h3>Insights</h3>

                    <p>
                        🏆 Producto más vendido:{" "}
                        {topProducto
                            ? `${topProducto[0]} (${topProducto[1]})`
                            : "-"}
                    </p>

                    <p>
                        📈 Mejor día:{" "}
                        {mejorDia
                            ? `${mejorDia[0]} ($${mejorDia[1]})`
                            : "-"}
                    </p>

                    <p>
                        📊 Promedio diario: ${Math.round(promedioDiario)}
                    </p>

                    <p>
                        🍕 Promedio por venta:{" "}
                        {promedioPorVenta.toFixed(1)} pizzas
                    </p>
                </div>
            )}
        </div>
    );
}

export default DetallePeriodo;