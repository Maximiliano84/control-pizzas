import { useState } from "react";
import { useRef } from "react";

const PRODUCTOS = [
  { nombre: "Margarita", precio: 5000 },
  { nombre: "Napolitana", precio: 5500 },
  { nombre: "Fugazzeta", precio: 6000 },
  { nombre: "Calabresa", precio: 6200 },
  { nombre: "Especial", precio: 7000 },
  { nombre: "Otro", precio: null },
];

function VentaForm({ onAgregarVenta }) {
  const [error, setError] = useState("");
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [esManual, setEsManual] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const cantidadRef = useRef(null);
  const productoRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!producto || precio === "" || !cantidad) {
      setError("⚠️ Completá todos los campos");
      return;
    }

    // VALIDACIÓN REAL
    if (
      !producto ||
      precio === "" ||
      !cantidad ||
      Number(precio) <= 0 ||
      Number(cantidad) <= 0
    ) {
      setError("⚠️ Revisá los datos");
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

    // 🔥 limpiar correctamente
    setProducto("");
    setPrecio("");
    setCantidad("");
    setEsManual(false);
    setError("");

    // 🔥 volver al inicio
    setTimeout(() => productoRef.current?.focus(), 100);
  };

  return (
    <div className="card3">
      <h2>Cargar Venta</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          ref={productoRef}
          value={producto}
          onChange={(e) => {
            const seleccionado = PRODUCTOS.find(
              (p) => p.nombre === e.target.value
            );

            setProducto(seleccionado.nombre);

            if (seleccionado.precio) {
              setPrecio(seleccionado.precio);
              setEsManual(false);
            } else {
              setPrecio("");
              setEsManual(true);
            }

            // 🔥 foco automático
            setTimeout(() => cantidadRef.current?.focus(), 100);

          }}
        >
          <option value="">Seleccionar pizza</option>
          {PRODUCTOS.map((p) => (
            <option key={p.nombre} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          disabled={!esManual}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          ref={cantidadRef}
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