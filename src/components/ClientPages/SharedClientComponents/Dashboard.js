import axios from "axios";

import { useState, useEffect } from "react";
import clientPageSchema from "../ClientSchema";



const MapClientBlock = ({clientKey, client, handleResponseMessage}) => {
    const clientSchema = clientPageSchema[clientKey];

    const toggleClient = (client) => {
        axios.get(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL + clientSchema.url_path}/${client.status === "INACTIVE" ? "start" : "stop"}`).then((res) => {
            handleResponseMessage(false, res.message);
        }).catch((err) => {
            handleResponseMessage(true, err.message);
        })
    }

    const deleteClient = (client) => {
        axios.delete(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL + clientSchema.url_path}/delete`).then((res) => {
            handleResponseMessage(false, res.message);
        }).catch((err) => {
            handleResponseMessage(true, err.message);
        })
    }

    return (
        <div className="w-full flex flex-col">
            {

            }
            {
                <div className="w-full flex flex-row">
                    <button onClick={toggleClient}>{client.status === "INACTIVE" ? "Start" : "Stop"} Client</button>
                    <button onClick={deleteClient}>Delete</button>

                </div>
            }
            


        </div>

    )

}





const ClientDashboard = ({clientKey, clients, handleResponseMessage}) => {
    return (
        <div className="w-full flex flex-col">
            <h1 className="font-bold">Dashboard</h1>
            <div className="w-full grid grid-rows-3">
                {clients.map((client, index) => (
                    <MapClientBlock clientKey={clientKey} client={client} handleResponseMessage={handleResponseMessage} />
                ))}
            </div>
            
        </div>
    )

}

export default ClientDashboard;