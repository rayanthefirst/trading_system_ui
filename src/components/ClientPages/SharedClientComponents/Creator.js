import axios from "axios";
import React, {useState} from "react";
import { encrypt_string } from "../../../utils/cipher";

import clientPageSchema from "../ClientSchema";

// Passed in Params: [{argName: clientType, types: [values else empty array for input text], encrypted: bool, backEndMappedArgName: val (mapped to backend arg name)}, ...]

const MapParamRow = ({params, getSelectedClientParams, newClient, setNewClient}) => {

    return (
        <div className="flex flex-row justify-evenly">
            {
                params.map((paramObj) => (
                    <div className="flex flex-col" key={paramObj.argName}>
                        <label>{paramObj.argName}</label>
                        {
                            paramObj.types.length ? (
                                <select className="text-black" onChange={(e) => {setNewClient({...newClient, [paramObj.backEndMappedArgName] : (paramObj.encrypted ? encrypt_string(e.target.value) : e.target.value)}); (paramObj.clientSelectorArg && getSelectedClientParams(e.target.value))}}>
                                    <option selected disabled>Choose {paramObj.argName}</option>
                                    {paramObj.types.map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            ) : (
                                <input className="text-black" onChange={(e) => setNewClient({...newClient, [paramObj.backEndMappedArgName] : (paramObj.encrypted ? encrypt_string(e.target.value) : e.target.value)})} />
                            )
                        }
                    </div>

                ))
            }
        </div>

    )

}

const ClientCreator = ({clientKey, handleResponseMessage}) => {
    const clientSchema = clientPageSchema[clientKey];
    const baseClientParams = clientSchema.clientTypesParams[clientSchema.baseClientName];
    const [selectedClientParams, setSelectedClientParams] = useState([]);

    const [newClient, setNewClient] = useState({});

    const getSelectedClientParams = (client_type) => {
        setSelectedClientParams(clientSchema.clientTypesParams[client_type]);
    }

    const createClient = () => {
        axios.post(`${process.env.REACT_APP_TRADING_SYSTEM_API_URL + clientSchema.url_path}/create`, newClient ).then((res) => {
            handleResponseMessage(false, "successfully created trading client");
        }).catch((err) => {
            handleResponseMessage(true, "Error creating trading client: ", err)})}

    return (
        <div className="border border-white flex flex-col items-center">
            <h1 className="font-bold">Create</h1>
            <div className="w-full">
                <MapParamRow params={baseClientParams} getSelectedClientParams={getSelectedClientParams} newClient={newClient} setNewClient={setNewClient} />
                {
                    selectedClientParams.length ? <MapParamRow params={selectedClientParams} newClient={newClient} setNewClient={setNewClient} /> : null
                }
            </div>
            <button disabled={!selectedClientParams.length}  className={`${selectedClientParams.length ? "bg-green-500" : "bg-red-500"} my-1 text-black border-white border-2 hover:border rounded`} onClick={() => {createClient(newClient);}}>Create Client</button>
        </div>
    )
}


export default ClientCreator;