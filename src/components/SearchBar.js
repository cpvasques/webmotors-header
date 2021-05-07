import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import VehicleButtons from "./VehicleButtons";
import SelectInput from "./SelectInput";
import { states } from "../utils/states";

const SearchBar = ({ getVehicles }) => {
  const [location, setSetlocation] = useState(states);
  const [distance, setDistance] = useState([]);
  const [maker, setMakers] = useState([]);
  const [isLoadingMaker, setIsLoadingMakers] = useState(true);
  const [model, setModels] = useState([]);
  const [makerId, setMakerId] = useState([]);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [year, setYear] = useState([]);
  const [price, setPrice] = useState([]);
  const [version, setVersions] = useState([]);
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);

  useEffect(() => {
    const getMakers = async () => {
      const makers = await fetchMakers();
      setMakers(makers);
      setIsLoadingMakers(false);
    };

    const getDistances = () => {
      const distances = [];

      for (let i = 1; 100 >= i; i++) {
        distances.push({
          value: i,
          label: `${i}km`,
        });
      }
      setDistance(distances);
    };

    const getYears = () => {
      const thisYear = new Date().getFullYear();
      const years = [];

      for (let i = 2000; thisYear >= i; i++) {
        years.push({
          value: i,
          label: i,
        });
      }
      setYear(
        years.sort((a, b) => {
          return b.value - a.value;
        })
      );
    };

    const getPrices = () => {
      const prices = [];

      for (let i = 5000; 100000 >= i; i += 5000) {
        prices.push({
          value: i,
          label: `R$${i} - R$${(i += 5000)}`,
        });
      }
      setPrice(prices);
    };

    getMakers();
    getDistances();
    getYears();
    getPrices();
  }, []);

  //Get Makers
  const fetchMakers = async () => {
    const res = await fetch(
      "https://desafioonline.webmotors.com.br/api/OnlineChallenge/Make"
    );
    const data = await res.json();
    return data.map((maker) => {
      return {
        value: maker.ID,
        label: maker.Name,
      };
    });
  };

  const makerChange = (selectedMaker) => {
    setIsLoadingModel(true);
    setIsLoadingVersion(true);
    const getModels = async () => {
      const models = await fetchModels(selectedMaker);
      setModels(models);
      setVersions([]);
      setIsLoadingModel(false);
      setIsLoadingVersion(false);
    };

    getModels();
  };

  //Get Models
  const fetchModels = async (maker) => {
    const res = await fetch(
      `https://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${maker.value}`
    );
    const data = await res.json();

    return data.map((model) => {
      return {
        value: model.ID,
        label: model.Name,
        MakeID: model.MakeID,
      };
    });
  };

  const modelChange = (selectedModel) => {
    setIsLoadingVersion(true);
    const getVersions = async () => {
      const models = await fetchVersion(selectedModel);
      setVersions(models);
      setIsLoadingVersion(false);
    };

    getVersions();
  };

  //Get Version
  const fetchVersion = async (model) => {
    const res = await fetch(
      `https://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${model.value}`
    );
    const data = await res.json();

    return data.map((version) => {
      return {
        value: version.ID,
        label: version.Name,
        ModelID: version.ModelID,
        MakerID: model.MakeID,
      };
    });
  };

  const versionChange = (selectedVersion) => {
    setMakerId(selectedVersion.MakerID);
  };

  const searchVehicles = () => {
    const getVehiclesData = async () => {
      const vehicles = await fetchVehicles(makerId);
      getVehicles(vehicles);
    };
    getVehiclesData();
  };

  //Get Vehicle
  const fetchVehicles = async (version) => {
    const res = await fetch(
      `https://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles?Page=${version}`
    );
    const data = await res.json();

    return data;
  };

  return (
    <div className="card">
      <div className="row">
        <img src={logo}></img>
      </div>
      <div className="row">
        <VehicleButtons />
      </div>
      <div className="row">
        <div className="checkbox">
          <input
            type="checkbox"
            name="checkbox"
            id="newVehicles"
            value="value"
          />
          <label for="newVehicles">Novos</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="checkbox"
            id="usedVehicles"
            value="value"
          />
          <label for="usedVehicles">Usados</label>
        </div>
      </div>
      <div className="row">
        <SelectInput
          className="localion-input"
          onChange={""}
          options={location}
          placeholder="Onde"
          isLoading={false}
        />
        <SelectInput
          className="distance-input"
          onChange={""}
          options={distance}
          placeholder="Raio"
          isLoading={false}
        />
        <SelectInput
          className="maker-input"
          onChange={makerChange}
          options={maker}
          placeholder="Selecionar Marca"
          isLoading={isLoadingMaker}
        />
        <SelectInput
          className="model-input"
          onChange={modelChange}
          options={model}
          placeholder="Selecionar um Modelo"
          isLoading={isLoadingModel}
          key={`model${isLoadingModel}`}
        />
      </div>
      <div className="row">
        <SelectInput
          className="year-input"
          onChange={""}
          options={year}
          placeholder="Ano Desejado"
          isLoading={false}
        />
        <SelectInput
          className="price-input"
          onChange={""}
          options={price}
          placeholder="Faixa de Preço"
          isLoading={false}
        />
        <SelectInput
          className="version-input"
          onChange={versionChange}
          options={version}
          placeholder="Selecionar uma Versão"
          isLoading={isLoadingVersion}
          key={`version${isLoadingVersion}`}
        />
      </div>
      <div className="row">
        <div className="last-container">
          <span className="advanced-search">Busca Avançada</span>
          <div>
            <span className="clear">Limpar Filtros</span>
            <button onClick={searchVehicles} className="search">
              Ver Ofertas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
