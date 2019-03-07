export default class Config 
{            
    static SetConfig(config){
        this._config = config;
    }

    static get ApiAddress(){
        return this._config.ItemsApiAddress;
    }
    
    static get ExampleValue(){    
        return this._config.ExampleValue;
    }
    
    static get DebugMode(){    
        return this._config.DebugMode;
    }

    static get FutFeat(){
        return this._config.FutFeat;
    }
}