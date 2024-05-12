const clientPageSchema = {
    account : {
        url_path : "accounts",
        baseClientName: "BaseTradingClient",
        stateName: "accounts",
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


    // marketData : {
    //     url_path : "market_data",
    //     baseClientName: "BaseMarketDataClient",
    //     stateName: "marketDataSources",
    //     clientTypesParams: {
    //         BaseMarketDataClient : [
    //             {argName: "market data client type", 
    //             types: ["IBKRMarketDataClient"], 
    //             encrypted: false, 
    //             backEndMappedArgName: "market_data_client_name",
    //             dashboardDisplay: false,
    //             clientSelectorArg: true},
        
    //             {argName: "name", 
    //             types: [], 
    //             encrypted: false, 
    //             backEndMappedArgName: "alias",
    //             dashboardDisplay: true},
        
    //             {argName: "market data type", 
    //             types: ["historical", "real time"], 
    //             encrypted: false, 
    //             backEndMappedArgName: "market_data_type",
    //             dashboardDisplay: false},
    //         ],
        
    //         IBKRMarketDataClient : [
    //             {argName: "username", 
    //             types: [], 
    //             encrypted: true, 
    //             backEndMappedArgName: "user",
    //             dashboardDisplay: false}, 
        
    //             {argName: "password", 
    //             types: [], 
    //             encrypted: true, 
    //             backEndMappedArgName: "password",
    //             dashboardDisplay: false},
    //         ],
    //     },


    // },


    // storage : {
    //     url_path : "storage",
    //     stateName: "storageSources",
    //     baseClientName: "BaseStorageClient",
    //     clientTypesParams: {
    //         BaseStorageClient : [
    //             {argName: "storage client type", 
    //             types: ["IBKRStorageClient"], 
    //             encrypted: false, 
    //             backEndMappedArgName: "storage_client_name",
    //             dashboardDisplay: false,
    //             clientSelectorArg: true},
        
    //             {argName: "name", 
    //             types: [], 
    //             encrypted: false, 
    //             backEndMappedArgName: "alias",
    //             dashboardDisplay: true},
        
    //             {argName: "storage type", 
    //             types: ["historical", "real time"], 
    //             encrypted: false, 
    //             backEndMappedArgName: "storage_type",
    //             dashboardDisplay: false},
    //         ],
        
    //         IBKRStorageClient : [
    //             {argName: "username", 
    //             types: [], 
    //             encrypted: true, 
    //             backEndMappedArgName: "user",
    //             dashboardDisplay: false}, 
        
    //             {argName: "password", 
    //             types: [], 
    //             encrypted: true, 
    //             backEndMappedArgName: "password",
    //             dashboardDisplay: false},
    //         ],
    //     },

    // },
};

export default clientPageSchema;