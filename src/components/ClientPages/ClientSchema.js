const clientPageSchema = {
    strategy: {
        url_path: "strategy",
    },

    account : {
        url_path : "trading_accounts",
        baseClientName: "BaseTradingClient",
        clientTypesParams: {
            BaseTradingClient : [
                {argName: "trading client type", 
                types: ["IBKRRestClient"], 
                encrypted: false, 
                backEndMappedArgName: "trading_client_name",
                dashboardDisplay: false,
                clientSelectorArg: true},
        
                {argName: "name", 
                types: [], 
                encrypted: false, 
                backEndMappedArgName: "alias",
                dashboardDisplay: true},
        
                {argName: "account type", 
                types: ["margin", "no margin"], 
                encrypted: false, 
                backEndMappedArgName: "account_type",
                dashboardDisplay: false},
            ],
        
            IBKRRestClient : [
                {argName: "username", 
                types: [], 
                encrypted: true, 
                backEndMappedArgName: "user",
                dashboardDisplay: false}, 
        
                {argName: "password", 
                types: [], 
                encrypted: true, 
                backEndMappedArgName: "password",
                dashboardDisplay: false},
            ],
        },
    },


    marketData : {
        url_path : "market_data"
    },


    storage : {
        url_path : "storage"
    },
};

export default clientPageSchema;