import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CdkTarefaListItemService {
    private _tarefa: any = {};

    private _loading: Subject<any> = new Subject();

    private _remove: Subject<any> = new Subject();

    get loading(): Subject<any> {
        return this._loading;
    }

    set loading(value: Subject<any>) {
        this._loading = value;
    }

    get tarefa(): any {
        return this._tarefa;
    }

    set tarefa(value: any) {
        this._tarefa = value;
    }

    get remove(): Subject<any> {
        return this._remove;
    }

    set remove(value: Subject<any>) {
        this._remove = value;
    }
}
