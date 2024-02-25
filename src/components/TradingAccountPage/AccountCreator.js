import { useState, useEffect } from "react";
import axios from "axios";

import { encrypt_string } from "../../utils/cipher";

import { ClientCreator } from "../ClientCreator/Creator";


const tradingClientSchema = {
    BaseTradingClient : [
        {argName: "trading client type", 
        types: ["IBKRRestClient"], 
        encrypted: false, 
        backEndMappedArgName: "trading_client_name",
        dashboardDisplay: false,
        clientSelectorArg: true},

        {argName: "name", 
        types: [], 
        encrypted: false, 
        backEndMappedArgName: "alias",
        dashboardDisplay: true},

        {argName: "account type", 
        types: ["margin", "no margin"], 
        encrypted: false, 
        backEndMappedArgName: "account_type",
        dashboardDisplay: false},
    ],

    IBKRRestClient : [
        {argName: "username", 
        types: [], 
        encrypted: true, 
        backEndMappedArgName: "user",
        dashboardDisplay: false}, 

        {argName: "password", 
        types: [], 
        encrypted: true, 
        backEndMappedArgName: "password",
        dashboardDisplay: false},
    ],
};


export const AccountCreator = ({get_initial_account_data}) => {
    const [newTradingClientAccount, setNewTradingClientAccount] = useState({});
    const [selectedClientParams, setSelectedClientParams] = useState([]);

    const [tradingClientTypes, setTradingClientTypes] = useState([]);
    const [tradingClientSignature, setTradingClientSignature] = useState([]);

    const getTradingClientType = () => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_trading_client_types`).then((res) => (
            setTradingClientTypes(res.data || [])
        )).catch((err) => console.log("Error getting trading client types"));

    }

    // const getAccountType = () => {
    //     axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_account_type`).then((res) => {
    //         setAccountTypes(res.data || []);
    //         setNewTradingClientAccount({...newTradingClientAccount, account_type: res.data[0] || ""})
    //     }).catch((err) => console.log("Error getting account types"));
    // }

    const getTradingClientSignature = (trading_client_name) => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_trading_client_signature`, {params: {trading_client_name: trading_client_name}}).then((res) => {
            setTradingClientSignature(res.data);
        }).catch((err) => console.log("Error getting trading client signature"));
    }

    const createTradingClient = () => {

        let tradingClientType = null;
        for (const paramObj of tradingClientSchema.BaseTradingClient) {
            if (!newTradingClientAccount[paramObj.backEndMappedArgName]) {
                console.log("Missing base client param: ", paramObj.backEndMappedArgName);
                return;
            }

            if (paramObj.clientSelectorArg) tradingClientType = newTradingClientAccount[paramObj.backEndMappedArgName];
        }

        console.log("tradingClientType", tradingClientType)

        for (const paramObj of tradingClientSchema[tradingClientType]) {
            console.log(paramObj)
            if (!newTradingClientAccount[paramObj.backEndMappedArgName]) {
                console.log("Missing trading client param: ", paramObj.backEndMappedArgName);
                return;
            }
        }

        axios.post(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/create_trading_client`, newTradingClientAccount ).then((res) => {
            console.log("successfully created trading client")
        }).catch((err) => {console.log("Error creating trading client")})

        get_initial_account_data();

    }

    const getSelectedClientParams = (trading_client_name) => {
        // if (trading_client_name === "reset") setSelectedClientParams([]);
        setSelectedClientParams((tradingClientSchema[trading_client_name] || []));
        console.log("params", selectedClientParams)
    }

    // useEffect(() => {getTradingClientType(); getAccountType();}, []);

    return (
        <ClientCreator baseClientParams={tradingClientSchema.BaseTradingClient} getSelectedClientParams={getSelectedClientParams} selectedClientParams={selectedClientParams} newClient={newTradingClientAccount} setNewClient={setNewTradingClientAccount} createClient={createTradingClient} />
    )

}