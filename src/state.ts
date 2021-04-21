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

    private _id = '';
    private _name = '';
    private _ip = '';
    private _apiPort = 0;
    private _socketPort = 0;
    private _password = '';
    private _isConnected = false;
    private _isGenesis = false;
    private _networkConfig: any = {};
    private _networkMap: any = {};
    private _socketIdMap: any = {};
    private _socketClients: any = {};
    private _socketServers: any = {};

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

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

    get networkMap(): any {
        return this._networkMap;
    }

    set networkMap(value: any) {
        this._networkMap = value;
    }

    public getIdFromSocketId(socketId: string): string {
        return this._socketIdMap[socketId];
    }

    get socketClients(): any {
        return this._socketClients;
    }

    public addSocketClient(id: string, socket: Socket, name: string, ip: string, apiPort: number, socketPort: number) {

        const socketId = socket.id;

        this._socketClients[id] = socket;

        this._networkMap[id] = {
            name: name,
            ip: ip,
            apiPort: apiPort,
            socketPort: socketPort,
            role: 'slave'
        };

        this._socketIdMap[socketId] = id;

    }

    public removeSocketClient(socketId: string) {

        const id = this._socketIdMap[socketId];

        delete this._socketClients[id];

        delete this._networkMap[id];

        delete this._socketIdMap[socketId];

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
