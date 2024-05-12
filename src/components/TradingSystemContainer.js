import React, { Component } from "react";
import axios from "axios";

import "index.css";

// Components
import Performance from "./AccountComponents/Performance";
import Trade from "./AccountComponents/Trade";
import Strategies from "./Strategies";

import { HandleResponse } from "./HandleResponse";

const permission = "admin";


let dummyAccounts = [
  {
    brokerage: "IBKR",
    type: "margin",
    totalValue: 1000,
    positions: [
      {
        symbol: "aapl",
        secType: "stk",
        amt: 100
      }
    ],
  }
]

class TradingSystemContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    // Active Component
    activePageKey: "performance",

    // Handle Success and Errors
    isSuccess: false,
    message: "",
    trigger: false,

    strategies: [],
    accounts: dummyAccounts,

    selectedAccount: {positions: []},
    // accounts: [],

    }
  }

  getAllClientData = () => {
    

  }

  componentDidMount() {
    // this.getAllClientData();
  }

  handleResponseMessage = (isSuccess, message) => {
    this.setState({isSuccess: isSuccess, message: message, trigger: true});
    const timer = setTimeout(() => {
      this.setState({trigger: false});
      clearTimeout(timer);
    }
    , 5000);
  }

  render() {
    const {activePageKey, isSuccess, message, trigger, strategies, accounts, selectedAccount} = this.state;

    const pages = {
      performance: {
        name: "Performance",
        component: <Performance account={selectedAccount} />,
        requiresPermission: "admin",
      },
      trade: {
        name: "Trade",
        component: <Trade />,
        requiresPermission: "admin",
      },
      strategy: {
        name: "Strategies",
        component: <Strategies strategies={strategies}/>,
        requiresPermission: "admin",
      }
      

    }
    

    console.log(selectedAccount)
    return (
      <div className="flex flex-row  min-h-screen w-full bg-black text-white">
        <div className="flex flex-col basis-1/12 border border-white-300">
          <select className="w-full text-black rounded-lg">
            <option disabled>Select Account</option>
            {accounts.map((account, index) => (
                <option onClick={(e) => {this.setState({selectedAccount: e.target.value})}} className="text-black" key={index} value={account}>{account.brokerage}</option>
            ))}
          </select> 
          {Object.keys(pages).map((pageKey, index) => (
            pages[pageKey].requiresPermission === permission ? 
              <button className={`my-1 mx-1  bg-green-400 text-black ${pageKey === activePageKey ? "border-white" : "border-green-500"} btn `} key={index} onClick={() => (this.setState({activePageKey: pageKey}))}>
                {pages[pageKey].name}
              </button> : null
          ))}
        </div>

        <div className="flex flex-col basis-11/12 items-center border border-white-300">
          {pages[activePageKey].component}
          <HandleResponse isSuccess={isSuccess} message={message} trigger={trigger}/>
        </div>

    
      </div>
    );
  }
} 
export default TradingSystemContainer;
