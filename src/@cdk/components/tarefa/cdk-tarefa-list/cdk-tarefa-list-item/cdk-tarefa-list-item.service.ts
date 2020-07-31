import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CdkTarefaListItemService
{
    private _tarefa: any = {};

    get tarefa(): any {
        return this._tarefa;
    }

    set tarefa(value: any) {
        this._tarefa = value;
    }
}
