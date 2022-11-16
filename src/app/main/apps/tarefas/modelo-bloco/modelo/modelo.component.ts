import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Modelo, Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';
import {getSelectedTarefas} from '../../store';
import {Back, getOperacoes} from '../../../../../store';

@Component({
    selector: 'modelos-bloco-modelo',
    templateUrl: './modelo.component.html',
    styleUrls: ['./modelo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloComponent implements OnInit, OnDestroy {

    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    saving$: Observable<boolean>;
    error$: Observable<any>;
    erro: any;
    pagination$: Observable<any>;
    pagination: any;
    mobileMode: boolean;
    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    lote: string;

    routerState: any;

    filter = {};

    private _unsubscribeAll: Subject<any> = new Subject();
    private screen$: Observable<any>;

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosBlocoAppState>
    ) {
        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.error$ = this._store.pipe(select(fromStore.getErrors));
        this.saving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.screen$ = this._store.pipe(select(getScreenState));

        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.lote = CdkUtils.makeId();
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'componente digital' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes)
                .filter((operacao: any) => operacao.type === 'componente digital' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.markForCheck();
        });
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
        });
        this.error$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(erro => !!erro)
        ).subscribe((erro) => {
            this.erro = erro.error.message;
        });
        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadModelos());
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetModelos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    doSelect(modelo): void {
        this.lote = CdkUtils.makeId();
        this.tarefas.forEach((tarefa) => {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.CreateComponenteDigital({
                modelo: modelo,
                tarefaOrigem: tarefa,
                processoOrigem: tarefa.processo,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }

    doVisualizar(modeloId): void {
        this._store.dispatch(new fromStore.VisualizarModelo(modeloId));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
