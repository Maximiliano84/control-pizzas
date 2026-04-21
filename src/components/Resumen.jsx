function Resumen({
    totalVentasHoy,
    totalGastosHoy,
    gananciaHoy,

    totalVentasSemana,
    totalGastosSemana,
    gananciaSemana,

    totalVentasMes,
    totalGastosMes,
    gananciaMes,
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
            <div className={`card ${getColor(gananciaHoy)}`}>
                <h3>Hoy</h3>
                <p>Ventas: ${totalVentasHoy}</p>
                <p>Gastos: ${totalGastosHoy}</p>

                <h2 className={getColor(gananciaHoy)}>
                    ${gananciaHoy}
                </h2>
            </div>

            {/* SEMANA */}
            <div className={`card ${getColor(gananciaSemana)}`}>
                <h3>Semana</h3>
                <p>Ventas: ${totalVentasSemana}</p>
                <p>Gastos: ${totalGastosSemana}</p>

                <h2 className={getColor(gananciaSemana)}>
                    ${gananciaSemana}
                </h2>
            </div>

            {/* MES */}
            <div className={`card ${getColor(gananciaMes)}`}>
                <h3>Mes</h3>
                <p>Ventas: ${totalVentasMes}</p>
                <p>Gastos: ${totalGastosMes}</p>

                <h2 className={getColor(gananciaMes)}>
                    ${gananciaMes}
                </h2>
            </div>
        </div>
    );
}

export default Resumen;