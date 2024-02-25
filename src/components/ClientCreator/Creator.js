import React, {useState, useEffect} from "react";
import { encrypt_string } from "../../utils/cipher";

// Passed in Params: [{argName: clientType, types: [values else empty array for input text], encrypted: bool, backEndMappedArgName: val (mapped to backend arg name)}, ...]

const MapParamRow = ({params, getSelectedClientParams, newClient, setNewClient}) => {

    return (
        <div className="border-2 border-white-100 flex flex-row justify-evenly">
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

export const ClientCreator = ({baseClientParams, getSelectedClientParams, selectedClientParams, newClient, setNewClient, createClient}) => {

    // console.log(newClient)
    // console.log(selectedClientParams)
    return (
        <div className="border-white flex flex-col items-center">
            <h1 className="font-bold">Create</h1>
            <div className="w-full">
                <MapParamRow params={baseClientParams} getSelectedClientParams={getSelectedClientParams} newClient={newClient} setNewClient={setNewClient} />
                {
                    selectedClientParams.length ? <MapParamRow params={selectedClientParams} newClient={newClient} setNewClient={setNewClient} /> : null
                }
            </div>
            <button disabled={!selectedClientParams.length}  className={ selectedClientParams.length ? "my-1  bg-green-500 text-black border-white border-2 hover:border rounded" : "bg-red-500"} onClick={() => {createClient(newClient);}}>Create Client</button>
        </div>
    )
}