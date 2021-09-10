import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Colaborador, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedTarefas} from '../store';
import {getOperacoes, getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'tarefa-create',
    templateUrl: './tarefa-create-bloco.component.html',
    styleUrls: ['./tarefa-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaCreateBlocoComponent implements OnInit, OnDestroy {

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    routerState: any;
    private _profile: Colaborador;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.TarefaCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.operacoes = [];

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => this.tarefas = tarefas);

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                if (operacoes[operacaoId].type === 'tarefa') {
                    this.operacoes.push(operacoes[operacaoId]);
                }
            });
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.operacoes = [];
        });

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
        this.tarefa.setorOrigem = this._profile.lotacoes[0].setor;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        this.operacoes = [];

        this.tarefas.forEach((tarefaBloco) => {
            const tarefa = new Tarefa();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.processo = tarefaBloco.processo;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveTarefa({
                tarefa: tarefa,
                operacaoId: operacaoId
            }));
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
