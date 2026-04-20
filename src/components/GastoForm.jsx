import { useState } from "react";

function GastoForm({ onAgregarGasto }) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoGasto = {
      descripcion,
      monto: Number(monto),
      fecha: new Date().toLocaleString(),
      timestamp: Date.now()
    };

    onAgregarGasto(nuevoGasto);

    setDescripcion("");
    setMonto("");
  };

  return (
    <div>
      <h2>Cargar Gasto</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <br /><br />

        <button type="submit">Guardar gasto</button>
      </form>
    </div>
  );
}

export default GastoForm;