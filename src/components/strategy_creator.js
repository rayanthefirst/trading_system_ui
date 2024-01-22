import axios from "axios";
import React, { useState, useEffect } from "react";

const StrategyCreator = ({ getStrategies }) => {
  const [tradingClients, setTradingClients] = useState([]);
  const [marketDataSources, setMarketDataSources] = useState([]);
  const [storageClients, setStorageClients] = useState([]);

  const [availableStrategies, setAvailableStrategies] = useState([]);
  const [strategyName, setStrategyName] = useState("");
  const [strategySignature, setStrategySignature] = useState([]);
  const [strategyParameters, setStrategyParameters] = useState({});

  const getTradingClients = () => {
    axios
      .get(
        `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/trading_client/get_all_available_trading_clients`
      )
      .then((res) => {
        setTradingClients(res.data);
      });
  };

  const getMarketDataSources = () => {
    axios
      .get(
        `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/market_data_client/get_all_available_market_data_clients`
      )
      .then((res) => {
        setMarketDataSources(res.data);
      });
  };

  const getStorageClients = () => {
    axios
      .get(
        `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/storage_client/get_all_available_storage_clients`
      )
      .then((res) => {
        setStorageClients(res.data);
      });
  };

  const getConfigurableOptions = () => {
    getTradingClients();
    getMarketDataSources();
    getStorageClients();
  };

  const getAllAvailableStrategies = () => {
    axios
      .get(
        `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/available_strategies`
      )
      .then((res) => {
        setAvailableStrategies(res.data);
      });
  };

  const getStrategySignature = (strategyName) => {
    axios
      .get(
        `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/signature/${strategyName}`
      )
      .then((res) => {
        setStrategySignature(res.data);
      });
  };

  const handleStrategySelection = (strategyName) => {
    setStrategyName(strategyName);
    getStrategySignature(strategyName);
    getConfigurableOptions();
  };

  const addToStrategyParams = (key, value) => {
    setStrategyParameters((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const createStrategy = (strategy_name, strategy_params) => {
    console.log(strategy_params);
    axios.post(
      `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/create_strategy/${strategy_name}`,
      strategy_params
    );
    setStrategyParameters({});
    getStrategies();
  };

  useEffect(() => {
    getAllAvailableStrategies();
  }, []);

  return (
    <div>
      <h2>Step 1: Choose Strategy From Available Strategies</h2>
      <select
        onClick={(e) => {
          handleStrategySelection(e.target.value);
        }}
      >
        {availableStrategies.map((strategy, index) => {
          return <option key={index}>{strategy}</option>;
        })}
      </select>

      <h2>Step 2: Configure Strategy Parameters</h2>
      {strategySignature.map((arg, index) => (
        <div key={index}>
          {arg === "trading_client" ? (
            <div>
              <h3>Select Trading Client</h3>
              <select
                onClick={(e) => {
                  addToStrategyParams(arg, e.target.value);
                }}
              >
                {tradingClients.map((client, index) => {
                  return <option key={index}>{client}</option>;
                })}
              </select>
            </div>
          ) : arg === "market_data_client" ? (
            <div>
              <h3>Select Market Data Client</h3>
              <select
                onClick={(e) => {
                  addToStrategyParams(arg, e.target.value);
                }}
              >
                {marketDataSources.map((dataSource, index) => {
                  return <option key={index}>{dataSource}</option>;
                })}
              </select>
            </div>
          ) : arg === "storage_client" ? (
            <div>
              <h3>Select Storage Client</h3>
              <select
                onClick={(e) => {
                  addToStrategyParams(arg, e.target.value);
                }}
              >
                {storageClients.map((storageClient, index) => {
                  return <option key={index}>{storageClient}</option>;
                })}
              </select>
            </div>
          ) : arg === "initialContract" ? (
            <div>
              <h3>Set contract</h3>
              <form>
                <label>Input stock symbol: </label>
                <input
                  onChange={(e) =>
                    addToStrategyParams("symbol", e.target.value)
                  }
                  type="text"
                ></input>
              </form>

              <label>Select security type: </label>
              <select
                onClick={(e) => addToStrategyParams("secType", e.target.value)}
              >
                <option>stock</option>
                <option>option</option>
              </select>

              {strategyParameters["secType"] === "option" && (
                <div>
                  <form>
                    <label>Set strike: </label>
                    <input
                      onChange={(e) =>
                        addToStrategyParams("strike", e.target.value)
                      }
                      type="text"
                    ></input>
                  </form>

                  <form>
                    <label>Set expiry date (yyyy-mm-dd): </label>
                    <input
                      onClick={(e) =>
                        addToStrategyParams("expiryDate", e.target.value)
                      }
                      type="text"
                    ></input>
                  </form>

                  <label>Right: </label>
                  <select
                    onClick={(e) =>
                      addToStrategyParams("right", e.target.value)
                    }
                  >
                    <option key={"call"}>call</option>
                    <option key={"put"}>put</option>
                  </select>
                </div>
              )}
            </div>
          ) : arg === "initialPortfolio" ? (
            <div>
              <h3>Set portfolio parameters</h3>
              <form>
                <label>Set fixed amount allocation: </label>
                <input
                  onChange={(e) =>
                    addToStrategyParams("cashBalance", e.target.value)
                  }
                  type="text"
                ></input>
              </form>
            </div>
          ) : arg === "kwargs" || arg === "strategy_id" ? (
            <div></div>
          ) : (
            <div>
              <h3>Set {arg}</h3>
              <form>
                <input
                  onChange={(e) => addToStrategyParams(arg, e.target.value)}
                  type="text"
                ></input>
              </form>
            </div>
          )}
        </div>
      ))}
      <div>
        <h3>Strategy Payload: </h3>
        {Object.keys(strategyParameters).map((key) => {
          return (
            <h4>
              {key}: {strategyParameters[key]}
            </h4>
          );
        })}
      </div>
      <button onClick={() => createStrategy(strategyName, strategyParameters)}>
        Place Strategy
      </button>
    </div>
  );
};

export default StrategyCreator;
