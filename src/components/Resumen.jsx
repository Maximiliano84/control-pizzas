function Resumen({
    totalVentasHoy,
    totalGastosHoy,
    gananciaHoy,
    cantidadVentasHoy,
    ticketPromedioHoy,
    productoMasVendido,

    totalVentasSemana,
    totalGastosSemana,
    gananciaSemana,
    cantidadVentasSemana,

    totalVentasMes,
    totalGastosMes,
    gananciaMes,
    cantidadVentasMes,
}) {
    return (
        <div>
            <h2>HOY</h2>
            <p>Ventas: ${totalVentasHoy}</p>
            <p>Gastos: ${totalGastosHoy}</p>
            <p>Ganancia: ${gananciaHoy}</p>
            <p>Pizzas vendidas: {cantidadVentasHoy}</p>
            <p>Ticket promedio: ${Math.round(ticketPromedioHoy)}</p>
            <p>
                Producto más vendido:{" "}
                {productoMasVendido ? productoMasVendido[0] : "N/A"}
            </p>

            <h2>SEMANA</h2>
            <p>Ventas: ${totalVentasSemana}</p>
            <p>Gastos: ${totalGastosSemana}</p>
            <p>Ganancia: ${gananciaSemana}</p>
            <p>Pizzas vendidas: {cantidadVentasSemana}</p>

            <h2>MES</h2>
            <p>Ventas: ${totalVentasMes}</p>
            <p>Gastos: ${totalGastosMes}</p>
            <p>Ganancia: ${gananciaMes}</p>
            <p>Pizzas vendidas: {cantidadVentasMes}</p>
        </div>
    );
}

export default Resumen;