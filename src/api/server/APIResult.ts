class APIResult {

    readonly result: boolean;
    readonly message: string|null;

    constructor(result: boolean, message: string|null) {
        this.result = result;
        this.message = message;
    }

}

export default APIResult;
