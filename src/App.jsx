import { useState } from "react";
import VentaForm from "./components/VentaForm";
import GastoForm from "./components/GastoForm";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Resumen from "./components/Resumen";
console.log("DB:", db);


function App() {
  const [ventas, setVentas] = useState([]);
  const [gastos, setGastos] = useState([]);
  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ventas"));

        const ventasFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVentas(ventasFirebase);
      } catch (error) {
        console.error("Error trayendo ventas:", error);
      }
    };

    obtenerVentas();
  }, []);


  useEffect(() => {
    const obtenerGastos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gastos"));

        const gastosFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGastos(gastosFirebase);
      } catch (error) {
        console.error("Error trayendo gastos:", error);
      }
    };

    obtenerGastos();
  }, []);

  //gastos de hoy

  const totalVentas = ventas.reduce((acc, venta) => {
    return acc + venta.precio * venta.cantidad;
  }, 0);

  const totalGastos = gastos.reduce((acc, gasto) => {
    return acc + gasto.monto;
  }, 0);
  console.log("TEST FIREBASE");

  const hoy = new Date().toLocaleDateString();

  const ventasHoy = ventas.filter(
    (v) => v.fecha && v.fecha.split(",")[0] === hoy
  );

  const totalVentasHoy = ventasHoy.reduce(
    (acc, v) => acc + v.precio * v.cantidad,
    0
  );

  const ticketPromedioHoy =
    ventasHoy.length > 0
      ? totalVentasHoy / ventasHoy.length
      : 0;

  const productosHoy = {};

  ventasHoy.forEach((v) => {
    if (!productosHoy[v.producto]) {
      productosHoy[v.producto] = 0;
    }
    productosHoy[v.producto] += v.cantidad;
  });

  const productoMasVendido = Object.entries(productosHoy).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const cantidadVentasHoy = ventasHoy.reduce(
    (acc, v) => acc + v.cantidad,
    0
  );



  const gastosHoy = gastos.filter(
    (g) => g.fecha && g.fecha.split(",")[0] === hoy
  );

  const totalGastosHoy = gastosHoy.reduce(
    (acc, g) => acc + g.monto,
    0
  );

  const gananciaHoy = totalVentasHoy - totalGastosHoy;

  //gasto semanal
  const ahora = new Date();
  const inicioSemana = new Date();
  inicioSemana.setDate(ahora.getDate() - ahora.getDay());

  const ventasSemana = ventas.filter(
    (v) => v.timestamp && v.timestamp >= inicioSemana.getTime()
  );

  const cantidadVentasSemana = ventasSemana.reduce(
    (acc, v) => acc + v.cantidad,
    0
  );

  const totalVentasSemana = ventasSemana.reduce(
    (acc, v) => acc + v.precio * v.cantidad,
    0
  );

  const gastosSemana = gastos.filter(
    (g) => g.timestamp && g.timestamp >= inicioSemana.getTime()
  );

  const totalGastosSemana = gastosSemana.reduce(
    (acc, g) => acc + g.monto,
    0
  );

  const gananciaSemana = totalVentasSemana - totalGastosSemana;

  //ganancia mensual
  const ahora2 = new Date();
  const inicioMes = new Date(ahora2.getFullYear(), ahora2.getMonth(), 1);

  const ventasMes = ventas.filter(
    (v) => v.timestamp && v.timestamp >= inicioMes.getTime()
  );

  const cantidadVentasMes = ventasMes.reduce(
    (acc, v) => acc + v.cantidad,
    0
  );

  const totalVentasMes = ventasMes.reduce(
    (acc, v) => acc + v.precio * v.cantidad,
    0
  );

  const gastosMes = gastos.filter(
    (g) => g.timestamp && g.timestamp >= inicioMes.getTime()
  );

  const totalGastosMes = gastosMes.reduce(
    (acc, g) => acc + g.monto,
    0
  );

  const gananciaMes = totalVentasMes - totalGastosMes;

  return (
    <div style={{ padding: "20px" }}>



      <h1>Control de Ventas</h1>

      <VentaForm
        onAgregarVenta={async (venta) => {
          console.log("INTENTANDO GUARDAR:", venta);

          try {
            const docRef = await addDoc(collection(db, "ventas"), venta);
            console.log("GUARDADO OK:", docRef.id);

            setVentas((prev) => [...prev, venta]);
          } catch (e) {
            console.error("ERROR FIREBASE:", e);
          }
        }}

      />
      <GastoForm
        onAgregarGasto={async (gasto) => {
          console.log("GUARDANDO GASTO:", gasto);

          try {
            const docRef = await addDoc(collection(db, "gastos"), gasto);
            console.log("GASTO OK:", docRef.id);

            setGastos((prev) => [...prev, gasto]);
          } catch (e) {
            console.error("ERROR GASTO:", e);
          }
        }}
      />


      <h2>Total vendido: ${totalVentas}</h2>
      <h2>Total gastos: ${totalGastos}</h2>
      <h2>Ganancia: ${totalVentas - totalGastos}</h2>

      <Resumen
        totalVentasHoy={totalVentasHoy}
        totalGastosHoy={totalGastosHoy}
        gananciaHoy={gananciaHoy}
        cantidadVentasHoy={cantidadVentasHoy}
        ticketPromedioHoy={ticketPromedioHoy}
        productoMasVendido={productoMasVendido}

        totalVentasSemana={totalVentasSemana}
        totalGastosSemana={totalGastosSemana}
        gananciaSemana={gananciaSemana}
        cantidadVentasSemana={cantidadVentasSemana}

        totalVentasMes={totalVentasMes}
        totalGastosMes={totalGastosMes}
        gananciaMes={gananciaMes}
        cantidadVentasMes={cantidadVentasMes}
      />

      <hr />

      <h2>Ultimas ventas</h2>
      <ul>
        {[...ventas]
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          .slice(0, 10)
          .map((venta, index) => (
            <li key={index}>
              {venta.producto} - ${venta.precio} x {venta.cantidad} | {venta.fecha}
            </li>

          ))}

      </ul>



      <h2>Ultimos gastos</h2>

      <ul>
        {[...gastos]
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          .slice(0, 10)
          .map((gasto, index) => (
            <li key={index}>
              {gasto.descripcion} - ${gasto.monto} | {gasto.fecha}
            </li>
          ))}
      </ul>

    </div>
  );
}

export default App;