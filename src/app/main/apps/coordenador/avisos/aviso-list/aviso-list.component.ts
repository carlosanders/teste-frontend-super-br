import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Aviso} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {cdkAnimations} from '@cdk/animations';

import {UnloadAviso} from './store';


@Component({
    selector: 'aviso-list',
    templateUrl: './aviso-list.component.html',
    styleUrls: ['./aviso-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AvisoListComponent implements OnInit, OnDestroy {

    routerState: any;
    avisos$: Observable<Aviso[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    actions: string[];
    colunas: string[];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.AvisoListAppState>,
        private _activatedRoute: ActivatedRoute
    ) {
        this.avisos$ = this._store.pipe(select(fromStore.getAvisoList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if (this.routerState.params['generoHandle'] === 'local' || this.routerState.params['setorHandle']) {
                        this.actions = ['edit', 'create', 'editConteudo', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesAvisos.setor.nome', 'ativo', 'actions'];
                    }
                    if (this.routerState.params['generoHandle'] === 'unidade' && !this.routerState.params['setorHandle'] ||
                        (this.routerState.params['unidadeHandle'] && !this.routerState.params['setorHandle'])) {
                        this.actions = ['edit', 'create', 'editConteudo', 'especie', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesAvisos.unidade.nome', 'ativo', 'actions'];
                    }
                    if (this.routerState.params['generoHandle'] === 'nacional' && !this.routerState.params['unidadeHandle']) {
                        this.actions = ['edit', 'create', 'editConteudo', 'especie', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesAvisos.modalidadeOrgaoCentral.valor', 'ativo', 'actions'];
                    }
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }


    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadAviso());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetAviso({
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
            context: params.context
        }));
    }

    inatived(params): void {
        this._store.dispatch(new fromStore.GetAviso({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context,
        }));
    }

    edit(avisoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + avisoId]);
    }

    create(): void {
         this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    delete(avisoId: number): void {
       this._store.dispatch(new fromStore.DeleteAviso(avisoId));
    }
}
