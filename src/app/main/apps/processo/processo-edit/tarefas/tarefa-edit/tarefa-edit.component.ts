import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models';
import * as moment from 'moment';
import {LoginService} from '../../../../../auth/login/login.service';
import {Usuario} from '@cdk/models';
import {Back} from '../../../../../../store/actions';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'tarefa-edit',
    templateUrl: './tarefa-edit.component.html',
    styleUrls: ['./tarefa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaEditComponent implements OnInit, OnDestroy {

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    _profile: Usuario;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;

    logEntryPagination: Pagination;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.TarefaEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = _loginService.getUserProfile();

        this.logEntryPagination = new Pagination();
        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa', 'especieProcesso', 'especieProcesso.workflow'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.tarefa$.pipe(
            filter((tarefa) => !!tarefa)
        ).subscribe(
            tarefa => {
                this.tarefa = tarefa;
                this.tarefa.unidadeResponsavel = tarefa.setorResponsavel.unidade;
                this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Tarefa', id: + this.tarefa.id};
            }
        );

        if (!this.tarefa) {
            this.tarefa = new Tarefa();
            this.tarefa.processo = this.processo;
            this.tarefa.unidadeResponsavel = this._profile.colaborador.lotacoes[0].setor.unidade;
            this.tarefa.dataHoraInicioPrazo = moment();
            this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ hour : 20, minute : 0, second : 0 });
            this.tarefa.setorOrigem = this._profile.colaborador.lotacoes[0].setor;
        }
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

        if (this.processo.especieProcesso?.workflow) {
            tarefa.workflow = this.processo.especieProcesso.workflow;
        }

        this._store.dispatch(new fromStore.SaveTarefa(tarefa));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
