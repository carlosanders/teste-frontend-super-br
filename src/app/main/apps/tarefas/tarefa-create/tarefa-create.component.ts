import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Tarefa} from '@cdk/models/tarefa.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/main/apps/tarefas/tarefa-create/store';
import { SaveTarefa } from 'app/main/apps/tarefas/tarefa-create/store';
import {Pagination} from '@cdk/models/pagination';
import * as moment from 'moment';
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from '../../../auth/login/login.service';

@Component({
    selector: 'tarefa-create',
    templateUrl: './tarefa-create.component.html',
    styleUrls: ['./tarefa-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TarefaCreateComponent implements OnInit, OnDestroy {

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.TarefaCreateAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._profile = _loginService.getUserProfile();

        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade'];
        this.setorOrigemPagination.filter = {'id': 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ 'hour' : 20, 'minute' : 0, 'second' : 0 });
        this.tarefa.setorOrigem = this._profile.lotacoes[0].setor;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const tarefa = new Tarefa();

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        tarefa.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas;

        this._store.dispatch(new SaveTarefa(tarefa));

    }

}
