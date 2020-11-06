import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
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
import {getTarefa} from '../../../tarefas/tarefa-detail/store/selectors';

@Component({
    selector: 'documento-edit-atividade',
    templateUrl: './documento-edit-atividade.component.html',
    styleUrls: ['./documento-edit-atividade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAtividadeComponent implements OnInit, OnDestroy, AfterViewInit {

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    documento$: Observable<Documento>;
    documento: Documento;

    atividade: Atividade;

    atividadeIsSaving$: Observable<boolean>;
    atividadeErrors$: Observable<any>;

    especieAtividadePagination: Pagination;
    unidadeAprovacaoPagination: Pagination;
    setorAprovacaoPagination: Pagination;
    usuarioAprovacaoPagination: Pagination;

    /**
     *
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditAtividadeAppState>,
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));

        this.tarefa$ = this._store.pipe(select(getTarefa));

        this.atividadeIsSaving$ = this._store.pipe(select(fromStore.getAtividadeIsSaving));
        this.atividadeErrors$ = this._store.pipe(select(fromStore.getAtividadeErrors));

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];

        this.unidadeAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination.filter = {parent: 'isNull'};

        this.setorAprovacaoPagination = new Pagination();
        this.setorAprovacaoPagination.filter = {parent: 'isNotNull'};
        this.setorAprovacaoPagination.populate = ['unidade', 'parent'];

        this.usuarioAprovacaoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tarefa$.subscribe(tarefa => {
            this.tarefa = tarefa;
        });
        this.documento$.subscribe(documento => this.documento = documento);

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
