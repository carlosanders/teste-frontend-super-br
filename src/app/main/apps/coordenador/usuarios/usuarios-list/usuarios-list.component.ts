import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from '@cdk/models';

@Component({
    selector: 'usuarios-list',
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuariosListComponent implements OnInit {

    routerState: any;
    usuarios$: Observable<Usuario[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    actions: Array<string> = ['create', 'afastamentos'];

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.UsuariosListAppState>,
    ) {
        this.usuarios$ = this._store.pipe(select(fromStore.getUsuariosList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if (this.routerState.params['generoHandle'] === 'local') {
                        this.actions = ['afastamentos'];
                    } else {
                        this.actions = ['create', 'afastamentos'];
                    }
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetUsuarios({
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

    create() : void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    afastamentos(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/afastamentos`)]);
    }
}
