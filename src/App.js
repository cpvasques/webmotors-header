import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [vehicle, setVehicle] = useState([]);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);

  const getVehicles = (vehicles) => {
    console.log(vehicles);
  };

  return (
    <div className="App">
      <SearchBar getVehicles={getVehicles} />
    </div>
  );
}

export default App;
