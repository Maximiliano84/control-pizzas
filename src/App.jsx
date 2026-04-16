import { useState } from "react";

function App() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [ventas, setVentas] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaVenta = {
      producto,
      precio: Number(precio),
      cantidad: Number(cantidad),
      fecha: new Date().toLocaleString(),
    };

    setVentas([...ventas, nuevaVenta]);

    setProducto("");
    setPrecio("");
    setCantidad("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Control de Ventas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <br /><br />

        <button type="submit">Guardar venta</button>
      </form>

      <hr />

      <h2>Historial de ventas</h2>

      <ul>
        {ventas.map((venta, index) => (
          <li key={index}>
            {venta.producto} - ${venta.precio} x {venta.cantidad} | {venta.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;