import {Injectable} from '@angular/core';

@Injectable()
export class CdkTarefaListService {
    private _selectedIds: any = [];

    private _tarefas: any = [];

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
}
