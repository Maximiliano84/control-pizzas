import { useState } from "react";

function GastoForm({ onAgregarGasto }) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔴 VALIDACIÓN
    if (!descripcion.trim() || monto === "") {
      setError("⚠️ Completá todos los campos");
      return;
    }

    if (isNaN(Number(monto)) || Number(monto) <= 0) {
      setError("⚠️ El monto debe ser mayor a 0");
      return;
    }

    const nuevoGasto = {
      descripcion,
      monto: Number(monto),
      fecha: new Date().toLocaleString(),
      timestamp: Date.now(), // 🔥 importante
    };

    onAgregarGasto(nuevoGasto);

    // 🧹 limpiar
    setDescripcion("");
    setMonto("");
    setError("");
  };

  return (
    <div className="card">
      <h2>Cargar Gasto</h2>

      {/* ⚠️ MENSAJE DE ERROR */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <div className="spacer"></div>
        <button type="submit">Guardar gasto</button>
      </form>
    </div>


  );
}

export default GastoForm;