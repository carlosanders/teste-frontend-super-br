import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Modelo} from '@cdk/models/modelo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Processo} from '@cdk/models/processo.model';
import {Tarefa} from '@cdk/models/tarefa.model';

@Component({
    selector: 'modelo',
    templateUrl: './modelo.component.html',
    styleUrls: ['./modelo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ModeloComponent implements OnInit, OnDestroy  {

    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    processo$: Observable<any>;
    processo: Processo;

    tarefa$: Observable<any>;
    tarefa: Tarefa;

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

        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
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
        this.processo$.subscribe(processo => {
            this.processo = processo;
        });
        this.tarefa$.subscribe(tarefa => {
            this.tarefa = tarefa;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

    }

    reload (params): void {
        this._store.dispatch(new fromStore.GetModelos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
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
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.tarefa,
            processoOrigem: this.processo
        }));
    }

}
