import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {Classificacao, Usuario} from '../../../../../../@cdk/models';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'classificacao-list',
    templateUrl: './classificacao-list.component.html',
    styleUrls: ['./classificacao-list.component.scss']
})
export class ClassificacaoListComponent implements OnInit {

    routerState: any;
    classificacoes$: Observable<Classificacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ClassificacaoListAppState>,
    ) {
        this.classificacoes$ = this._store.pipe(select(fromStore.getClassificacaoList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

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
        this._store.dispatch(new fromStore.GetClassificacao({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    edit(classificacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + classificacaoId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}