import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'unidades-list',
    templateUrl: './unidades-list.component.html',
    styleUrls: ['./unidades-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UnidadesListComponent implements OnInit {

    routerState: any;
    unidades$: Observable<Setor[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.UnidadesListAppState>
    ) {
        this.unidades$ = this._store.pipe(select(fromStore.getUnidadesList));
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
        this._store.dispatch(new fromStore.GetUnidades({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter,
                'parent': 'isNull'
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    create () : void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(unidadeId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + unidadeId]);
    }

    setores(unidadeId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${unidadeId}/setores`)]);
    }

    competencias(unidadeId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${unidadeId}/competencias`)]);
    }
}
