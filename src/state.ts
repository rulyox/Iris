import { Socket } from 'socket.io';

class State {

    readonly workspaceDirectory: string = '/workspace';
    readonly imageDirectory: string = '/workspace/image';
    readonly privateDirectory: string = '/workspace/private';
    readonly publicDirectory: string = '/workspace/public';

    // singleton instance
    private static instance: State;

    private constructor() {
        State.instance = this;
    }

    static get getInstance() {
        if(!State.instance) State.instance = new State();
        return this.instance;
    }

    private _name: string = '';
    private _ip: string = '';
    private _apiPort: number = 0;
    private _socketPort: number = 0;
    private _password: string = '';
    private _isConnected: boolean = false;
    private _isGenesis: boolean = false;
    private _networkConfig: any = {};
    private _socketClients: any = {};
    private _socketServers: any = {};

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get ip(): string {
        return this._ip;
    }

    set ip(value: string) {
        this._ip = value;
    }

    get apiPort(): number {
        return this._apiPort;
    }

    set apiPort(value: number) {
        this._apiPort = value;
    }

    get socketPort(): number {
        return this._socketPort;
    }

    set socketPort(value: number) {
        this._socketPort = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

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

    get socketClients(): any {
        return this._socketClients;
    }

    public addSocketClient(id: string, socket: Socket) {
        this._socketClients[id] = socket;
    }

    public removeSocketClient(id: string) {
        delete this._socketClients[id];
    }

    get socketServers(): any {
        return this._socketServers;
    }

    public addSocketServer(id: string, socket: SocketIOClient.Socket) {
        this._socketServers[id] = socket;
    }

    public removeSocketServer(id: string) {
        delete this._socketServers[id];
    }

}

export default State.getInstance;
