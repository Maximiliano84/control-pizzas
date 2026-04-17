import { useState } from "react";

function VentaForm({ onAgregarVenta }) {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("FORM SUBMIT");

    const nuevaVenta = {
      producto,
      precio: Number(precio),
      cantidad: Number(cantidad),
      fecha: new Date().toLocaleString(),
    };

    onAgregarVenta(nuevaVenta);

    setProducto("");
    setPrecio("");
    setCantidad("");
  };

  return (
    <div>
      <h2>Cargar Venta</h2>

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
    </div>
  );
}

export default VentaForm;