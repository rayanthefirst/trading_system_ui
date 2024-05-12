const positionHeaders = ["symbol", "secType", "amt"]
const Performance = ({ account }) => {
    return account ? (
        <div className="w-full flex flex-col items-center">
            <p className="text-white">Performance</p>
            <div className="w-full flex flex-row ">
                <div className="w-full flex flex-col items-center border border-white">
                    <p>Positions</p>
                    <div className="w-full flex flex-row justify-evenly ">
                        {
                            positionHeaders.map((header, index) => (
                                <div className={`flex flex-row justify-center w-1/3 bg-red-600`}>
                                    <p className="text-white mx-1" key={index}>{header}</p>
                                </div>
                            ))
                        }
                    </div>
                    
                    {
                        account.positions.map((position, index) => (
                            <div key={index} className="w-full flex flex-row justify-evenly">
                            
                                {
                                    positionHeaders.map((header, idx) => (
                                        <div className={`flex flex-row justify-center w-1/${positionHeaders.length}`}>
                                            <p className="text-white mx-1" key={idx}>{position[header]}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        ))
                    }

                </div>
            </div>


        </div>
    ) :  null
}

export default Performance;