import { useState } from "react";
import "index.css";


const secTypes = ["stock", "option"]

const Trade = () => {
    const [symbol, setSymbol] = useState("");
    const [availaleSymbolSecTypes] = useState([]);
    const [secType, setSecType] = useState("stock");

    return (
        <div className="w-full flex flex-col items-center">
            <p className="text-white">Trade</p>
            <div className="w-full flex flex-row">
                <input onChange={(e) => {setSymbol(e.target.value)}} className="mx-1 text-black" placeholder="Enter Symbol" />
                <button className="text-black bg-blue-300 btn">Submit</button>
                
                {
                    availaleSymbolSecTypes.length ? 
                    <select className="text-black">
                        <option disabled>Select secType</option>
                        {
                            secTypes.map((secType, index) => (
                                <option key={index}>{secType}</option>
                            ))
                        }
                    </select>
                    :
                    <p className="text-whtie">No secTypes available for {symbol}</p>
                }
              

            </div>
           
            
            
        </div>
    )
}


export default Trade