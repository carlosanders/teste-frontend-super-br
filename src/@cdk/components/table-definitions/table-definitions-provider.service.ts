import {Injectable, OnDestroy} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {LoginService} from '../../../app/main/auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Usuario} from '../../models';
import md5 from 'crypto-js/md5';
import {TableDefinitions} from './table-definitions';
import {plainToClass} from 'class-transformer';
import {TableColumnDefinitions} from './table-column-definitions';
import {TableColumn} from './table-column';

export interface _BaseTableDefinitionsProviderService {
    getTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions): Observable<TableDefinitions>;
    getAllTableDefinitions(): Observable<TableDefinitions[]>;
    saveTableDefinitions(tableDefinitions: TableDefinitions): Observable<boolean>;
    deleteTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions): Observable<boolean>;
    deleteAllTableDefinitions(): Observable<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageTableDefinitionsProviderService implements _BaseTableDefinitionsProviderService, OnDestroy {

    private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();
    private _userProfile: Usuario;
    private readonly _storageSuffix: string = 'TableDefinitions';

    constructor(loginService: LoginService) {
        loginService.getUserProfileChanges()
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter((usuario) => !!usuario)
            )
            .subscribe((usuario: Usuario) => this._userProfile = usuario);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    private _getLocalStorageKey(): string {
        if (!this._userProfile?.username) {
            return null;
        }

        return md5(`${this._userProfile.username}-${this._storageSuffix}`).toString();
    }

    private _checkLoaded(): void {
        if (!this._userProfile?.username) {
            throw 'Storage not loaded yet, waiting user profile.';
        }
    }

    private _deepParse(jsonObject: any[]): TableDefinitions[] {
        let tableDefinitionList: TableDefinitions[] = [];
        jsonObject.forEach((tableDef) => {
            const tableDefinition = new TableDefinitions();
            tableDef.columns.forEach((column) => {
                const tableColumnDefinition = plainToClass(TableColumnDefinitions, column.definitions);
                const tableColumn = new TableColumn();
                Object.assign(tableColumn, column);
                tableColumn.definitions = tableColumnDefinition;
                tableDefinition.columns.push(tableColumn);
            });
            tableDefinition.data = tableDef.data;
            tableDefinition.identifier = tableDef.identifier;
            tableDefinition.limit = tableDef.limit;
            tableDefinition.sort = tableDef.sort;
            tableDefinition.version = tableDef.version;
            tableDefinitionList.push(tableDefinition);
        });
        return tableDefinitionList;
    }

    deleteAllTableDefinitions(): Observable<boolean> {
        try {
            this._checkLoaded();
            localStorage.removeItem(this._getLocalStorageKey());
            return of(true);
        } catch (error) {
            return of(false);
        }
    }

    deleteTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions): Observable<boolean> {
        try {
            this._checkLoaded()
            const identifier = (typeof tableDefinitionsIdentifier == 'object' ? tableDefinitionsIdentifier?.identifier : tableDefinitionsIdentifier);
            let tableDefinitionsList: TableDefinitions[] = this._deepParse(JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || []);
            tableDefinitionsList = tableDefinitionsList.filter((tableDefinitions: TableDefinitions) => tableDefinitions.identifier != identifier);
            localStorage.setItem(this._getLocalStorageKey(), JSON.stringify(tableDefinitionsList));

            return of(true);
        } catch (error) {
            return of(false);
        }
    }

    getTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions): Observable<TableDefinitions> {
        try {
            this._checkLoaded();
            const identifier = (typeof tableDefinitionsIdentifier == 'object' ? tableDefinitionsIdentifier?.identifier : tableDefinitionsIdentifier);
            let tableDefinitionsList: TableDefinitions[] = this._deepParse(JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || []);

            return of(tableDefinitionsList.find((tableDefinitions: TableDefinitions) => tableDefinitions.identifier == identifier))
        } catch (error) {
            return throwError(error);
        }
    }

    getAllTableDefinitions(): Observable<TableDefinitions[]> {
        try {
            this._checkLoaded();
            return of(JSON.parse(localStorage.getItem(this._getLocalStorageKey())));
        } catch (error) {
            return throwError(error);
        }
    }

    saveTableDefinitions(tableDefinitions: TableDefinitions): Observable<boolean> {
        try {
            this._checkLoaded();
            let tableDefinitionsList: TableDefinitions[] = this._deepParse(JSON.parse(localStorage.getItem(this._getLocalStorageKey())) || []);
            tableDefinitionsList = tableDefinitionsList.filter((tableDefinitions: TableDefinitions) => tableDefinitions.identifier != tableDefinitions.identifier);
            tableDefinitionsList.push(tableDefinitions);
            localStorage.setItem(this._getLocalStorageKey(), JSON.stringify(tableDefinitionsList));

            return of(true);
        } catch (error) {
            return of(false);
        }
    }

}
