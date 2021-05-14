import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as fromStorePessoaUsuarioList from '../vinculacao-pessoa-usuario/vinculacao-pessoa-usuario-list/store';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'usuarios-externos-list',
    templateUrl: './usuarios-externos-list.component.html',
    styleUrls: ['./usuarios-externos-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuariosExternosListComponent implements OnInit {

    routerState: any;
    usuarios$: Observable<Usuario[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    public externo = true;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.UsuariosExternosListAppState>,
    ) {
        this.usuarios$ = this._store.pipe(select(fromStore.getUsuariosExternosList));
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
        this._store.dispatch(new fromStore.GetUsuariosExternosList({
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

    edit(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + usuarioId]);
    }

    vincularPessoa(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar',
            + usuarioId + '/vinculacao-pessoa-usuario/listar')]);
    }
}
