import { useState, useEffect } from "react";
import axios from "axios";

import { encrypt_string, decrypt_string } from "../../utils/cipher";

export const AccountCreator = () => {
    const [newTradingClientAccount, setNewTradingClientAccount] = useState({});

    const [tradingClientTypes, setTradingClientTypes] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [tradingClientSignature, setTradingClientSignature] = useState([]);

    const getTradingClientType = () => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_trading_client_types`).then((res) => (
            setTradingClientTypes(res.data)
        )).catch()

    }

    const getAccountType = () => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_account_type`).then((res) => {
            setAccountTypes(res.data)
            setNewTradingClientAccount({...newTradingClientAccount, account_type: res.data[0]})
        }).catch()
    }

    const getTradingClientSignature = (trading_client_name) => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_trading_client_signature`, {params: {trading_client_name: trading_client_name}}).then((res) => {
            setTradingClientSignature(res.data);
        })
    }

    const createTradingClient = () => {
        axios.post(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/create_trading_client`, newTradingClientAccount ).then((res) => {
            console.log("successfully created trading client")
        })

    }

    useEffect(() => {getTradingClientType(); getAccountType();}, []);

    console.log("de", decrypt_string("333<5>324<5>324<5>303<5>312"))
    console.log(newTradingClientAccount);
    return (
        <div className="w-full flex flex-row justify-evenly">
            <div className="flex flex-col">
                <label>Select Trading Client</label>
                <select className="text-black" onClick={(e) => {setNewTradingClientAccount({...newTradingClientAccount, trading_client_name: e.target.value}); getTradingClientSignature(e.target.value);}} value={newTradingClientAccount.trading_client_name}>
                    {tradingClientTypes.map((tradingClientType, index) => (
                        <option key={index} value={tradingClientType}>{tradingClientType}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label>Select Account Type</label>
                <select className="text-black" onChange={(e) => setNewTradingClientAccount({...newTradingClientAccount, account_type: e.target.value})} value={newTradingClientAccount.account_type}>
                    {accountTypes.map((account_type, index) => (
                        <option key={index} value={account_type}>{account_type}</option>
                    ))}
                </select>
            </div>


            {tradingClientSignature.map((param, index) => ((param !== "account_type" && param !== "trading_client_id" && param !== "container" && param !== "kwargs") &&
                <div className="flex flex-col">
                    <label>Enter {param === "user" ? "username": param === "encrypted_password" ? "password" : param}</label>
                    <input className="text-black" onChange={(e) => setNewTradingClientAccount({...newTradingClientAccount, [param]: encrypt_string(e.target.value)})} type="text" placeholder={param === "user" ? "username": param} />
                </div>
            ))}


            <button className=" bg-white text-black border-white border-2 hover:border rounded" onClick={createTradingClient}>Create Account</button>
            
            <div className="bg-red-500">
            <h2 className="text-white">{decrypt_string("hello")}</h2>
            </div>

        </div>

        
    )

}