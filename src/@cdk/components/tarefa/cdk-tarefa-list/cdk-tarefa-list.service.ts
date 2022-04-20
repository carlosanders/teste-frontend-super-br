import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CdkTarefaListService {
    private _selectedIds: any = [];

    private _tarefas: any = [];

    private _viewMode: ViewMode = '';

    private _viewModeSubject: Subject<ViewMode> = new Subject<ViewMode>();

    viewModeObservable(): Observable<ViewMode> {
        return this._viewModeSubject.asObservable();
    }

    get selectedIds(): any {
        return this._selectedIds;
    }

    set selectedIds(value: any) {
        this._selectedIds = value;
    }

    get tarefas(): any {
        return this._tarefas;
    }

    set tarefas(value: any) {
        this._tarefas = value;
    }

    set viewMode(value: ViewMode) {
        this._viewMode = value;
        this._viewModeSubject.next(value);
    }

    get viewMode(): ViewMode {
        return this.viewMode;
    }
}

export type ViewMode = 'grid'|'list'|'';
