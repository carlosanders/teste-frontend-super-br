import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {VinculacaoUsuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'vinculacao-usuario-list',
    templateUrl: './vinculacao-usuario-list.component.html',
    styleUrls: ['./vinculacao-usuario-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoUsuarioListComponent implements OnInit {

    routerState: any;
    vinculacoesUsuarios$: Observable<VinculacaoUsuario[]>;
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
        private _store: Store<fromStore.VinculacaoUsuarioListAppState>,
    ) {
        this.vinculacoesUsuarios$ = this._store.pipe(select(fromStore.getVinculacaoUsuarioList));
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
        this._store.dispatch(new fromStore.GetVinculacoesUsuarios({
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

    create () : void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
    edit(vinculacaoUsuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoUsuarioId]);
    }

    delete(vinculacaoUsuarioId: number): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoUsuario(vinculacaoUsuarioId));
    }

}
