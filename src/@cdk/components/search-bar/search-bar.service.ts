import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchBarService
{
    private _searchFieldName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private _searchField: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    get searchFieldName(): Observable<string> {
        return this._searchFieldName.asObservable();
    }

    get searchField(): Observable<string> {
        return this._searchField.asObservable();
    }

    public setSearchFieldName(value: string): void {
        this._searchFieldName.next(value);
    }

    public setSearchField(value: string): void {
        this._searchField.next(value);
    }

}
