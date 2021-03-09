class State {

    // singleton instance
    private static instance: State;

    private constructor() {
        State.instance = this;
    }

    static get getInstance() {
        if(!State.instance) State.instance = new State();
        return this.instance;
    }

    private _isConnected: boolean = false;
    private _isGenesis: boolean = false;
    private _networkConfig: any = {};

    get isConnected(): boolean {
        return this._isConnected;
    }

    set isConnected(value: boolean) {
        this._isConnected = value;
    }

    get isGenesis(): boolean {
        return this._isGenesis;
    }

    set isGenesis(value: boolean) {
        this._isGenesis = value;
    }

    get networkConfig(): any {
        return this._networkConfig;
    }

    set networkConfig(value: any) {
        this._networkConfig = value;
    }

}

export default State.getInstance;
