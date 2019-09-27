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

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models/pagination';
import * as moment from 'moment';
import {Colaborador} from '../../../../../../../@cdk/models/colaborador.model';
import {LoginService} from '../../../../../auth/login/login.service';

@Component({
    selector: 'tarefa-edit',
    templateUrl: './tarefa-edit.component.html',
    styleUrls: ['./tarefa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TarefaEditComponent implements OnInit, OnDestroy {

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.TarefaEditAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = _loginService.getUserProfile();

        this.especieTarefaPagination = new Pagination();
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

        this.tarefa$.subscribe(
            tarefa => this.tarefa = tarefa
        );

        if (!this.tarefa) {
            this.tarefa = new Tarefa();
            this.tarefa.processo = this.processo;
            this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
            this.tarefa.dataHoraInicioPrazo = moment();
            this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ hour : 20, minute : 0, second : 0 });
            this.tarefa.setorOrigem = this._profile.lotacoes[0].setor;
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

        this._store.dispatch(new fromStore.SaveTarefa(tarefa));

    }

}
