class ServiceResult {

    private _result: boolean;
    private _message: string|null;

    constructor(result: boolean, message: string|null) {
        this._result = result;
        this._message = message;
    }

    get result(): boolean {
        return this._result;
    }

    set result(value: boolean) {
        this._result = value;
    }

    get message(): string|null {
        return this._message;
    }

    set message(value: string|null) {
        this._message = value;
    }

}

export default ServiceResult;
