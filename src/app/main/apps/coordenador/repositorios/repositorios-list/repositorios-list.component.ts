import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Repositorio} from '@cdk/models/repositorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'coordenador-repositorios-list',
    templateUrl: './repositorios-list.component.html',
    styleUrls: ['./repositorios-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosListComponent implements OnInit {

    routerState: any;
    repositorios$: Observable<Repositorio[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    actions: string[];
    colunas: string[];

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RepositoriosListAppState>,
    ) {
        this.repositorios$ = this._store.pipe(select(fromStore.getRepositoriosList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;

                    if (this.routerState.params['generoHandle'] === 'local') {
                        this.actions = ['edit', 'editConteudo', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'modalidadeRepositorio.valor', 'vinculacoesRepositorios.setor.nome', 'ativo', 'actions'];
                    }
                    if (this.routerState.params['generoHandle'] === 'nacional') {
                        this.actions = ['edit', 'editConteudo', 'especie', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'modalidadeRepositorio.valor', 'vinculacoesRepositorios.orgaoCentral.valor', 'ativo', 'actions'];
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
        this._store.dispatch(new fromStore.GetRepositorios({
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

    edit(repositorioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + repositorioId]);
    }

    editConteudo(documentoId: number): void {
        this._router.navigate([this.routerState.url + '/documento/' + documentoId + '/repositorio']).then();
    }

    especieSetores(repositorioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${repositorioId}/especie-setor`)]);
    }

    delete(repositorioId: number): void {
        this._store.dispatch(new fromStore.DeleteRepositorio(repositorioId));
    }

}
