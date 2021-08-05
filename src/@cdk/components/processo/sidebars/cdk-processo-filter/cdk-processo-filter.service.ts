import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CdkProcessoFilterService
{
    private _filters: any = [];

    public collect: Subject<any> = new Subject();
    public clear: Subject<any> = new Subject();

    get filters(): any {
        return this._filters;
    }

    public addFilter(value: any) {
        this._filters.push(value);
    }

    public reset() {
        this._filters = [];
    }
}
