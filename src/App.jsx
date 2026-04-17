import { useState } from "react";
import VentaForm from "./components/VentaForm";
import GastoForm from "./components/GastoForm";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
console.log("DB:", db);

  
function App(){
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


 

 const totalVentas = ventas.reduce((acc, venta) => {
  return acc + venta.precio * venta.cantidad;
}, 0);

const totalGastos = gastos.reduce((acc, gasto) => {
  return acc + gasto.monto;
}, 0);
console.log("TEST FIREBASE");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Control de Ventas</h1>
      <h2>Total vendido: ${totalVentas}</h2>
<h2>Total gastos: ${totalGastos}</h2>
<h2>Ganancia: ${totalVentas - totalGastos}</h2>

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
  onAgregarGasto={(gasto) => setGastos([...gastos, gasto])}
/>

      <hr />

      <h2>Historial de ventas</h2>
      

      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>
            {venta.producto} - ${venta.precio} x {venta.cantidad} | {venta.fecha}
          </li>
          
        ))}
        
      </ul>
      <h2>Historial de gastos</h2>

<ul>
  {gastos.map((gasto, index) => (
    <li key={index}>
      {gasto.descripcion} - ${gasto.monto} | {gasto.fecha}
    </li>
  ))}
</ul>
      
    </div>
  );
}

export default App;