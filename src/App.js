import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import StrategyMonitor from "./components/strategy_monitor/strategy_monitor";
import StrategyCreator from "./components/strategy_creator";

const App = () => {
  const [strategies, setStrategies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStrategies = () => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/get_placed_strategies`
      )
      .then((response) => {
        setStrategies(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleStrategy = (strategy_id, strategy_status) => {
    const endPoint =
      strategy_status === "ACTIVE"
        ? "/strategy/stop_strategy/"
        : `/strategy/start_strategy/`;
    axios.get(
      `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}${endPoint}${strategy_id}`
    );
    getStrategies();
  };

  const deleteStrategy = (strategy_id) => {
    axios.delete(
      `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/delete_strategy/${strategy_id}`
    );
    getStrategies();
  };

  useEffect(() => {
    getStrategies();
  }, []);

  return (
    <div className="App">
      <h1>Trading System</h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <StrategyMonitor
            strategies={strategies}
            toggleStrategy={toggleStrategy}
            deleteStrategy={deleteStrategy}
          />
        )}
        <button onClick={getStrategies}>Refresh</button>
      </div>

      <h1>Strategy Creator</h1>
      <div>
        <StrategyCreator getStrategies={getStrategies} />
      </div>
    </div>
  );
};

export default App;
