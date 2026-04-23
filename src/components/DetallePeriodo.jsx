import React from "react";
import { useState } from "react";

function DetallePeriodo({ ventas = [], gastos = [], tipo, volver }) {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(
        new Date().toISOString().split("T")[0]
    );



    // 🔥 FUNCION FILTRO AUTOMÁTICO
    const filtrar = (item) => {
        if (!item.timestamp && !item.fecha) return false;

        const f = item.timestamp
            ? new Date(item.timestamp)
            : new Date(item.fecha);

        const [year, month, day] = fechaSeleccionada.split("-");
        const base = new Date(year, month - 1, day);

        // 🔥 HOY (según fecha elegida)
        if (tipo === "hoy") {
            const inicio = new Date(base);
            inicio.setHours(0, 0, 0, 0);

            const fin = new Date(base);
            fin.setHours(23, 59, 59, 999);

            return f >= inicio && f <= fin;
        }

        // 🔥 SEMANA
        if (tipo === "semana") {
            const inicio = new Date(base);
            inicio.setDate(base.getDate() - base.getDay());
            inicio.setHours(0, 0, 0, 0);

            const fin = new Date(inicio);
            fin.setDate(inicio.getDate() + 6);
            fin.setHours(23, 59, 59, 999);

            return f >= inicio && f <= fin;
        }

        // 🔥 MES
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

    return (
        <div className="container">
            <button onClick={volver}>⬅ Volver</button>

            <h2>Detalle ({tipo})</h2>
            <input
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
            />

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