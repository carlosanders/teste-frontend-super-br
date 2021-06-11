import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CdkTarefaFilterService {
    private _filters: any = [];

    private _isValid: boolean;

    private _clear: Subject<any> = new Subject();

    private _emite: Subject<any> = new Subject();

    get filters(): any {
        return this._filters;
    }

    set filters(value: any) {
        this._filters = value;
    }

    get isValid(): any {
        return this._isValid;
    }

    set isValid(value: any) {
        this._isValid = value;
    }

    get clear(): Subject<any> {
        return this._clear;
    }

    set clear(value: Subject<any>) {
        this._clear = value;
    }

    get emite(): Subject<any> {
        return this._emite;
    }

    set emite(value: Subject<any>) {
        this._emite = value;
    }
}
