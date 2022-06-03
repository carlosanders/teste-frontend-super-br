import md5 from 'crypto-js/md5';
import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
    _BaseTableDefinitionsProviderService,
    LocalStorageTableDefinitionsProviderService
} from './table-definitions-provider.service';
import {TableDefinitions} from './table-definitions';

@Injectable()
export class TableDefinitionsService implements OnDestroy {

    private _unsubcribeAll: Subject<boolean> = new Subject<boolean>();
    private _provider: _BaseTableDefinitionsProviderService;

    constructor(localStorageTableDefinitionsProvider: LocalStorageTableDefinitionsProviderService) {
        this._provider = localStorageTableDefinitionsProvider;
    }

    ngOnDestroy(): void {
        this._unsubcribeAll.next(true);
        this._unsubcribeAll.complete();
    }

    set provider (provider: _BaseTableDefinitionsProviderService) {
        this._provider = provider;
    }

    generateTableDeinitionIdentifier(params: string[]): string {
        return md5(params.join('-')).toString();
    }

    getTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions, provider?: _BaseTableDefinitionsProviderService): Observable<TableDefinitions> {
        return (provider || this._provider)
            .getTableDefinitions(tableDefinitionsIdentifier);
    }

    getAllTableDefinitions(provider?: _BaseTableDefinitionsProviderService): Observable<TableDefinitions[]> {
        return (provider || this._provider)
            .getAllTableDefinitions();
    }

    saveTableDefinitions(tableDefinitions: TableDefinitions, provider?: _BaseTableDefinitionsProviderService): Observable<boolean> {
        return (provider || this._provider)
            .saveTableDefinitions(tableDefinitions);
    }

    deleteTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions, provider?: _BaseTableDefinitionsProviderService): Observable<boolean> {
        return (provider || this._provider)
            .deleteTableDefinitions(tableDefinitionsIdentifier);
    }

    deleteAllTableDefinitions(tableDefinitionsIdentifier: string|TableDefinitions, provider?: _BaseTableDefinitionsProviderService): Observable<boolean> {
        return (provider || this._provider)
            .deleteAllTableDefinitions();
    }
}
