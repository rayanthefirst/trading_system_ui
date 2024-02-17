import axios from "axios";
import { useState, useEffect } from "react";



import { AccountCreator } from "./AccountCreator";

export const AccountDashBoard = () => {
    const [accounts, setAccounts] = useState([{}]);

    const get_initial_account_data = () => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}trading_accounts/get_placed_trading_clients`).then((res) => {
            setAccounts(res.data);
        }).catch((err) => {
            console.log("Error getting trading client types");
        })
        
    }

    useEffect(() => {get_initial_account_data();}, []);
    console.log(accounts);
    return (
        <div className="w-full flex flex-col items-center">
            <h1>Account Dashboard</h1>

            <div className="w-full flex flex-col">
                <div className="w-full flex flex-row justify-evenly">
                    {Object.keys(accounts[0]).map((key, index) => (
                        <div>
                            <h3>{key}</h3>
                        </div>
                    ))}
                </div>
                {accounts.map((account, index) => (
                    <div className="w-full flex flex-row justify-evenly" key={index}>
                        {Object.keys(account).map((key, index) => (
                            <div>
                                <p>{account[key]}</p>
                            </div>
                        ))}
                        
                    </div>
                ))}

            </div>



            <AccountCreator/>







        </div>
    )
    
}