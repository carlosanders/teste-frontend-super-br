import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Atividade, Documento, Pagination, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';

@Component({
    selector: 'documento-edit-atividade',
    templateUrl: './documento-edit-atividade.component.html',
    styleUrls: ['./documento-edit-atividade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAtividadeComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    tarefa: Tarefa;

    @Input()
    documento: Documento;

    atividade: Atividade;

    atividadeIsSaving$: Observable<boolean>;
    atividadeErrors$: Observable<any>;

    especieAtividadePagination: Pagination;

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditAtividadeAppState>,
    ) {
        this.atividadeIsSaving$ = this._store.pipe(select(fromStore.getAtividadeIsSaving));
        this.atividadeErrors$ = this._store.pipe(select(fromStore.getAtividadeErrors));

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();
        this.atividade.tarefa = this.tarefa;
        this.atividade.usuario = this.tarefa.usuarioResponsavel;
        this.atividade.setor = this.tarefa.setorResponsavel;
        if (this.tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
            this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
        } else {
            this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + this.tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
        }

    }

    ngAfterViewInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitAtividade(values): void {

        delete values.unidadeAprovacao;

        const atividade = new Atividade();

        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        atividade.documentos = [this.documento];

        this._store.dispatch(new fromStore.SaveAtividade(atividade));
    }

}
