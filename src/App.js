// import "./App.css";
// import axios from "axios";
import React, { useState } from "react";
// import StrategyMonitor from "./components/strategy_monitor/strategy_monitor";
// import StrategyCreator from "./components/strategy_creator";

import { OverviewDashBoard } from "./components/OverviewDashBoard/OverviewController";
import { AccountDashBoard } from "./components/AccountDashBoard/AccountController";
import { StrategyDashBoard } from "./components/StrategyDashBoard/StrategyController";

const App = () => {

  const dashBoards = [{
    id: "main-dashboard",
    name: "Overview",
    component: <OverviewDashBoard/>
  }, {
    id: "account-dashboard",
    name: "Accounts",
    component: <AccountDashBoard/>
  }, {
    id: "strategy-dashboard",
    name: "Strategies",
    component: <StrategyDashBoard/>
  },];

  const [activeDashBoard, setActiveDashBoard] = useState(dashBoards[0]);

  return (
    <div className="flex flex-row  min-h-screen w-full bg-black text-white">


      <div className="flex flex-col basis-1/4">
        {dashBoards.map((dashboard, index) => (
            <button className="my-1  bg-white text-black border-white border-2 hover:border rounded" key={index} onClick={() => (setActiveDashBoard(dashboard))}>
              {dashboard.name}
            </button>
        ))}
      </div>

      <div className=" flex basis-3/4 justify-center">
        {activeDashBoard.component}
      </div>

  
    </div>
  )
}


//   const [strategies, setStrategies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getStrategies = () => {
//     setIsLoading(true);
//     axios
//       .get(
//         `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/get_placed_strategies`
//       )
//       .then((response) => {
//         setStrategies(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const toggleStrategy = (strategy_id, strategy_status) => {
//     const endPoint =
//       strategy_status === "ACTIVE"
//         ? "/strategy/stop_strategy/"
//         : `/strategy/start_strategy/`;
//     axios.get(
//       `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}${endPoint}${strategy_id}`
//     );
//     getStrategies();
//   };

//   const deleteStrategy = (strategy_id) => {
//     axios.delete(
//       `${process.env.REACT_APP_TRADING_SYSTEM_API_URL}/strategy/delete_strategy/${strategy_id}`
//     );
//     getStrategies();
//   };

//   useEffect(() => {
//     getStrategies();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Trading System</h1>
//       <div>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <StrategyMonitor
//             strategies={strategies}
//             toggleStrategy={toggleStrategy}
//             deleteStrategy={deleteStrategy}
//           />
//         )}
//         <button onClick={getStrategies}>Refresh</button>
//       </div>

//       <h1>Strategy Creator</h1>
//       <div>
//         <StrategyCreator getStrategies={getStrategies} />
//       </div>
//     </div>
//   );
// };

export default App;
