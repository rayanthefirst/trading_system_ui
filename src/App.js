import React, { Component } from "react";

import {OverviewController} from "./components/OverviewPage/OverviewController";
import { ClientController } from "./components/ClientPages/ClientController";

import { HandleResponse } from "./components/HandleResponse";

const permission = "admin";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    
    // Handle Success and Errors
    isError: false,
    message: "",

    strategies: [],
    accounts: [],
    marketDataSources: [],
    storageSources: [],




    }
  }

  render() {
    const pages = [{
      key: "overview",
      name: "Overview",
      component: <OverviewController handleResponseMessage={handleResponseMessage}/>, 
      requiresPermission: "admin",
    }, {
      key: "strategy",
      name: "Strategies",
      component: <ClientController clientKey={"strategy"} handleResponseMessage={handleResponseMessage}/>,
      requiresPermission: "admin",
    }, {
      key: "account",
      name: "Accounts",
      component: <ClientController clientKey={"account"} handleResponseMessage={handleResponseMessage}/>,
      requiresPermission: "admin",
    }, {
      key: "marketData",
      name: "Market Data",
      component: <ClientController clientKey={"marketData"} handleResponseMessage={handleResponseMessage}/>,
      requiresPermission: "admin",
    }, {
      key: "storage",
      name: "Storage",
      component: <ClientController clientKey={"storage"} handleResponseMessage={handleResponseMessage}/>,
      requiresPermission: "admin",
    },];
  }



} 

  // Handle Success and Errors
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleResponseMessage = (isError, message) => {
    setIsError(isError);
    setMessage(message);
  }

  const pages = [{
    key: "overview",
    name: "Overview",
    component: <OverviewController handleResponseMessage={handleResponseMessage}/>, 
    requiresPermission: "admin",
  }, {
    key: "strategy",
    name: "Strategies",
    component: <ClientController clientKey={"strategy"} handleResponseMessage={handleResponseMessage}/>,
    requiresPermission: "admin",
  }, {
    key: "account",
    name: "Accounts",
    component: <ClientController clientKey={"account"} handleResponseMessage={handleResponseMessage}/>,
    requiresPermission: "admin",
  }, {
    key: "marketData",
    name: "Market Data",
    component: <ClientController clientKey={"marketData"} handleResponseMessage={handleResponseMessage}/>,
    requiresPermission: "admin",
  }, {
    key: "storage",
    name: "Storage",
    component: <ClientController clientKey={"storage"} handleResponseMessage={handleResponseMessage}/>,
    requiresPermission: "admin",
  },];

  const [activePage, setActivePage] = useState(pages[0]);

  const [strategies, setStrategies] = useState([]);
  const [accounts, getAccounts] = useState([]);
  const [marketDataSources, getMarketDataSources] = useState([]);




  return (
      <div className="flex flex-row  min-h-screen w-full bg-black text-white">

        <div className="flex flex-col basis-1/12 border border-white-300">
          {pages.map((page, index) => (
            page.requiresPermission === permission ? 
              <button className="my-1 mx-1  bg-slate-500 text-black border-white border-2 hover:border rounded" key={index} onClick={() => (setActivePage(page))}>
                {page.name}
              </button> : null
          ))}
        </div>

        <div className="flex flex-col basis-11/12 items-center border border-white-300">
          <HandleResponse isError={isError} message={message} />
          {activePage.component}
        </div>

    
      </div>
  );
}

export default App;
