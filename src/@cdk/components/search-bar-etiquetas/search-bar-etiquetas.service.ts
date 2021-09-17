import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SearchBarEtiquetasFiltro} from './search-bar-etiquetas-filtro';

@Injectable({
    providedIn: 'root'
})
export class SearchBarEtiquetasService
{
    private _searchField: BehaviorSubject<SearchBarEtiquetasFiltro> = new BehaviorSubject<SearchBarEtiquetasFiltro>(null);

    get searchField(): Observable<SearchBarEtiquetasFiltro> {
        return this._searchField.asObservable();
    }

    public setSearchField(value: SearchBarEtiquetasFiltro): void {
        this._searchField.next(value);
    }
}
