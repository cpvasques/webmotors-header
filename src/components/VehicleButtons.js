import React, { useState } from "react";

const VehicleButtons = () => {
  const [vehicleType, setVehicleType] = useState(true);

  return (
    <div className="vehicleType">
      <div
        className={`button ${vehicleType ? "active" : ""}`}
        onClick={() => setVehicleType(true)}
      >
        <div className="underline"></div>
        <span>Comprar Carros</span>
      </div>
      <div
        className={`button ${!vehicleType ? "active" : ""}`}
        onClick={() => setVehicleType(false)}
      >
        <div className="underline"></div>
        <span>Comprar Motos</span>
      </div>
      <button className="sell">Vender Carro</button>
    </div>
  );
};

export default VehicleButtons;
