import { useState } from "react";


function VentaForm({ onAgregarVenta }) {
  const [error, setError] = useState("");
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!producto || !precio || !cantidad) {
      setError("⚠️ Completá todos los campos");
      return;
    }

    const nuevaVenta = {
      producto,
      precio: Number(precio),
      cantidad: Number(cantidad),
      fecha: new Date().toLocaleString(),
      timestamp: Date.now(),
    };

    onAgregarVenta(nuevaVenta);

    setProducto("");
    setPrecio("");
    setCantidad("");
    setError("");
  };

  return (
    <div className="card">
      <h2>Cargar Venta</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />


        <button type="submit">Guardar venta</button>
      </form>
    </div>

  );
}

export default VentaForm;