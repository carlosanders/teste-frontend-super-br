import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {EspecieTarefa, Usuario} from '@cdk/models';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'especie-tarefa-list',
    templateUrl: './especie-tarefa-list.component.html',
    styleUrls: ['./especie-tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieTarefaListComponent implements OnInit {

    routerState: any;
    especieTarefas$: Observable<EspecieTarefa[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.EspecieTarefaListAppState>,
    ) {
        this.especieTarefas$ = this._store.pipe(select(fromStore.getEspecieTarefaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

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
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetEspecieTarefa({
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
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    edit(especieTarefaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + especieTarefaId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
