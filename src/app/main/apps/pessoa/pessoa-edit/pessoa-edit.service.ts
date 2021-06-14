import {Injectable} from '@angular/core';
import {Pessoa} from '@cdk/models';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PessoaEditService {

    private _pessoaSelecionada: Subject<Pessoa> = new Subject<Pessoa>();

    get pessoaSelecionada(): Observable<Pessoa>
    {
        return this._pessoaSelecionada.asObservable();
    }

    setPessoaSelecionada(value: Pessoa): void
    {
        this._pessoaSelecionada.next(value);
    }
}
