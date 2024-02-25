import { useState, useEffect } from "react";
import axios from "axios";


import { StrategyCreator } from "./StrategyCreator";



export const StrategyDashBoard = ({accounts, get_initial_account_data, strategies, setStrategies}) => {

    const get_initial_strategy_data = () => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL}strategy/get_placed_strategies`).then((res) => {
            setStrategies(res.data || []);
        }).catch((err) => {
            console.log("Failed to strategies: ", err);
        })
    }

    useEffect(() => {
        get_initial_account_data();
        get_initial_strategy_data();
    }, []);


    return (
        <div>
            <h1 className="font-bold">Strategy Dashboard</h1>
            {
                strategies.length ? 
                <div>
                    {strategies.map((strategy, index) => (
                        Object.keys(strategy).map((key, index) => (
                            <h1>{strategy[key]}</h1>
                        ))
                    ))}
                </div>

                : <p>No strategies found</p>
            }

            <div className="my-5">
                <StrategyCreator accounts={accounts} />
            </div>
        
        </div>
    )
    
}