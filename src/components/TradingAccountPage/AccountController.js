import React, { useState, useEffect } from "react";

import { decrypt_string  } from "../../utils/cipher";
import axios from "axios";


import { AccountCreator } from "./AccountCreator";
import { AccountDashboard } from "./AccountDashboard";



export const AccountController = ({accounts, get_initial_account_data}) => {

    const toggleAccount = (account) => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/${account.trading_client_status === "ACTIVE" ? "stop_trading_client" : "start_trading_client"}`, {params: {trading_client_id: account.trading_client_id}}).then((res) => {
            console.log("successfully toggled account");
        }).catch((err) => {
            console.log("Error toggling account");
        }).finally(() => {
            get_initial_account_data();
        })
    }

    const deleteAccount = (account) => {
        axios.delete(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/delete_trading_client`, {params: {trading_client_id: account.trading_client_id}}).then((res) => {
            console.log("successfully deleted account");
            get_initial_account_data();
        }).catch((err) => {
            console.log("Error deleting account");
        })
    }

    useEffect(() => {get_initial_account_data();}, []);
    return (
        <div className="w-full flex flex-col items-center">
       
            <div className="w-full">
                <AccountDashboard />


            </div>

            <div className="w-full my-6">
                <AccountCreator get_initial_account_data={get_initial_account_data}/>
            </div>

        </div>
            
    )
    
}