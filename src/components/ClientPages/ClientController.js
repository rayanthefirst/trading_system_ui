// Base Imports
import ClientCreator from "./SharedClientComponents/Creator";
import ClientDashboard from "./SharedClientComponents/Dashboard";

export const ClientController = ({clientKey, handleResponseMessage}) => {

    return ( 
    <div className="w-full flex flex-col items-center">
       
        <div className="w-full">
            <ClientDashboard clientKey={clientKey} clients={clients} handleResponseMessage={handleResponseMessage} />
        </div>

        <div className="w-full my-6">
            <ClientCreator clientKey={clientKey} handleResponseMessage={handleResponseMessage}/>
        </div>

    </div>
    );
}