import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Tarefa} from '@cdk/models/tarefa.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import * as moment from 'moment';
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {Processo} from '@cdk/models/processo.model';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tarefa-create',
    templateUrl: './tarefa-create.component.html',
    styleUrls: ['./tarefa-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TarefaCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;
    setorResponsavelPagination: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

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
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this._profile = _loginService.getUserProfile();

        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade', 'parent'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(p => this.processo = p);

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ hour : 20, minute : 0, second : 0 });
        this.tarefa.setorOrigem = this._profile.lotacoes[0].setor;

        if (this.processo) {
            this.tarefa.processo = this.processo;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

        this._store.dispatch(new fromStore.SaveTarefa(tarefa));

    }

}
