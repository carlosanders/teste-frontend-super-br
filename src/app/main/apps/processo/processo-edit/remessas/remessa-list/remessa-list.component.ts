import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Tramitacao, Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';

@Component({
    selector: 'remessa-list',
    templateUrl: './remessa-list.component.html',
    styleUrls: ['./remessa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RemessaListComponent implements OnInit {

    routerState: any;
    tramitacoes$: Observable<Tramitacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    _profile: Usuario;
    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RemessaListAppState>,
        public _loginService: LoginService
    ) {
        this._profile = this._loginService.getUserProfile();

        this.tramitacoes$ = this._store.pipe(select(fromStore.getRemessaList));
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

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetTramitacoes({
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

    excluded(params): void {
        this._store.dispatch(new fromStore.GetTramitacoes({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    edit(tramitacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + tramitacaoId]).then();
    }

    recebimento(tramitacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'recebimento/') + tramitacaoId]);
    }

    delete(tramitacaoId: number): void {
        this._store.dispatch(new fromStore.DeleteTramitacao(tramitacaoId));
    }

}
