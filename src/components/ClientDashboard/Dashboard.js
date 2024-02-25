import { useState, useEffect } from "react"



const MapClientRow = ({client, baseClientParams, selectedClientParams, getInitalClientData, toggleClient, deleteClient }) => {
    const [clientStatus, setClientStatus] = useState("");


    useEffect(() => {getInitalClientData();}, []);

    return (
        <div className="w-full flex flex-col">
            <p>Base Params</p>
            {
                baseClientParams.map((paramObj, index) => (
                    <div className="w-full flex flex-row">
                        {paramObj.dashboardDisplay ? <p>{client[paramObj.backEndMappedArgName]}</p> : null}
                    </div>
                ))

            }
            {
                selectedClientParams.map((paramObj, index) => (
                    <div className="w-full flex flex-row">
                        {paramObj.dashboardDisplay ? <p>{client[paramObj.backEndMappedArgName]}</p> : null}
                    </div>

                ))
            }
            {
                <div className="w-full flex flex-row">
                    <p>Status: {clientStatus}</p>
                    <button onClick={toggleClient}>{clientStatus === "ACTIVE" ? "Start" : "Stop"} Client</button>
                    <button onClick={deleteClient}>Delete</button>

                </div>
            }
            


        </div>

    )

}





export const ClientDashboard = (clients, baseClientParams, selectedClientParams, getInitalClientData, toggleClient, deleteClient) => {



    return (
        <div className="w-full flex flex-col">
            <h1 className="font-bold">Dashboard</h1>
            
        </div>
    )





}