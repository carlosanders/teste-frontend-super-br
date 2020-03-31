import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Modelo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Tarefa} from '@cdk/models';
import {getSelectedProcessos} from '../store/selectors';
import {getIsSaving} from './store/selectors/componentes-digitais.selectors';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'modelo-bloco',
    templateUrl: './modelo-bloco.component.html',
    styleUrls: ['./modelo-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloBlocoComponent implements OnInit, OnDestroy  {

    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    isSaving$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    operacoes: any[] = [];

    routerState: any;

    filter = {};

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
        this.tarefas$ = this._store.pipe(select(getSelectedProcessos));
        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.isSaving$ = this._store.pipe(select(getIsSaving));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });

        this._store
            .pipe(
                select(getOperacoesState),
                filter(op => !!op && !!op.content && op.type === 'componenteDigital')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this.tarefas$.subscribe(tarefas => {
            this.tarefas = tarefas;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetModelos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        }));
    }

    doSelect(modelo): void {
        this.tarefas.forEach (tarefa => {
            this._store.dispatch(new fromStore.CreateComponenteDigital({
                modelo: modelo,
                tarefaOrigem: tarefa
            }));
        });
    }

}
