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
import {getOperacoes, getRouterState} from 'app/store';
import {getSelectedTarefas} from '../store';
import {getIsSaving} from './store/selectors/componentes-digitais.selectors';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'modelo-bloco',
    templateUrl: './modelo-bloco.component.html',
    styleUrls: ['./modelo-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloBlocoComponent implements OnInit, OnDestroy {

    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    isSaving$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    lote: string;

    routerState: any;

    filter = {};
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosAppState>,
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.isSaving$ = this._store.pipe(select(getIsSaving));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
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
            this.operacoes = Object.values(operacoes).filter(operacao => operacao.type === 'componente digital' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter(operacao => operacao.type === 'componente digital' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.markForCheck();
        });

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
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
            populate: this.pagination.populate
        }));
    }

    doSelect(modelo): void {
        this.lote = CdkUtils.makeId();
        this.tarefas.forEach((tarefa) => {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.CreateComponenteDigital({
                modelo: modelo,
                tarefaOrigem: tarefa,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }

}
