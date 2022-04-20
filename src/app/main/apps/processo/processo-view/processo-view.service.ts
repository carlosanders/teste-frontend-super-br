import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProcessoViewService {
    private _guardaAtivado: Subject<boolean> = new Subject();

    get guardaAtivado(): Subject<boolean> {
        return this._guardaAtivado;
    }

    set guardaAtivado(value: Subject<boolean>) {
        this._guardaAtivado = value;
    }
}
