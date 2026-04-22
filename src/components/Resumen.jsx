function Resumen({
    totalVentasHoy,
    totalGastosHoy,
    gananciaHoy,
    cantidadVentasHoy,
    onSeleccionar,

    totalVentasSemana,
    totalGastosSemana,
    gananciaSemana,
    cantidadVentasSemana,


    totalVentasMes,
    totalGastosMes,
    gananciaMes,
    cantidadVentasMes,

}) {
    // 🔥 función para colores (PRO)
    const getColor = (valor) => {
        const num = Number(valor);

        if (isNaN(num)) return "neutro"; // por si viene mal
        if (Math.abs(num) < 0.01) return "neutro"; // 🔥 trata casi 0 como 0
        if (num > 0) return "positivo";
        return "negativo";
    };

    return (
        <div className="grid">
            {/* HOY */}
            <div className="card1" onClick={() => onSeleccionar("hoy")}>
                <h3>Hoy</h3>

                <h1 className={getColor(gananciaHoy)}>
                    ${gananciaHoy}
                </h1>

                <p>{cantidadVentasHoy} pizzas</p>
                <p>Gastos: ${totalGastosHoy}</p>
                <p>Ventas: ${totalVentasHoy} </p>
            </div>

            {/* SEMANA */}
            <div className="card1" onClick={() => onSeleccionar("semana")}>
                <h3>Semana</h3>
                <p>Pizzas: {cantidadVentasSemana}</p>
                <p>Ventas: ${totalVentasSemana}</p>
                <p>Gastos: ${totalGastosSemana}</p>
                <p className={getColor(gananciaSemana)}>
                    Ganancia: ${gananciaSemana}
                </p>
            </div>

            {/* MES */}
            <div className="card1" onClick={() => onSeleccionar("mes")}>
                <h3>Mes</h3>
                <p>Pizzas: {cantidadVentasMes}</p>
                <p>Ventas: ${totalVentasMes}</p>
                <p>Gastos: ${totalGastosMes}</p>
                <p className={getColor(gananciaMes)}>
                    Ganancia: ${gananciaMes}
                </p>
            </div>
        </div>
    );
}

export default Resumen;