import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Repositorio} from '@cdk/models/repositorio.model';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Documento} from '@cdk/models';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'coordenador-repositorios-list',
    templateUrl: './repositorios-list.component.html',
    styleUrls: ['./repositorios-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosListComponent implements OnInit, OnDestroy {

    routerState: any;
    repositorios$: Observable<Repositorio[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;

    actions: string[];
    colunas: string[];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _activatedRoute
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RepositoriosListAppState>,
        private _activatedRoute: ActivatedRoute
    ) {
        this.repositorios$ = this._store.pipe(select(fromStore.getRepositoriosList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            if (this.routerState.params['generoHandle'] === 'local' || this.routerState.params['setorHandle']) {
                this.actions = ['edit', 'create', 'editConteudo', 'delete'];
                this.colunas = ['select', 'id', 'nome', 'descricao', 'modalidadeRepositorio.valor', 'vinculacoesRepositorios.setor.nome', 'ativo', 'actions'];
            }
            if (this.routerState.params['generoHandle'] === 'unidade' && !this.routerState.params['setorHandle'] ||
                (this.routerState.params['unidadeHandle'] && !this.routerState.params['setorHandle'])) {
                this.actions = ['edit', 'create', 'editConteudo', 'delete'];
                this.colunas = ['select', 'id', 'nome', 'descricao', 'modalidadeRepositorio.valor', 'vinculacoesRepositorios.unidade.nome', 'ativo', 'actions'];
            }
            if (this.routerState.params['generoHandle'] === 'nacional' && !this.routerState.params['unidadeHandle']) {
                this.actions = ['edit', 'create', 'editConteudo', 'especie', 'delete'];
                this.colunas = ['select', 'id', 'nome', 'descricao', 'modalidadeRepositorio.valor', 'vinculacoesRepositorios.modalidadeOrgaoCentral.valor', 'ativo', 'actions'];
            }
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadRepositorios());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(params): void {
        this._store.dispatch(new fromStore.GetRepositorios({
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
            context: params.context,
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    edit(repositorioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + repositorioId]).then();
    }

    editConteudo(documento: Documento): void {
        let primary: string;
        primary = 'componente-digital/';
        if (documento.componentesDigitais[0]) {
            primary += documento.componentesDigitais[0].id;
        } else {
            primary += '0';
        }
        this._router.navigate([
                'documento/' + documento.id,
                {
                    outlets:
                        {
                            primary: primary,
                            sidebar: 'repositorio/dados-basicos'
                        }
                }
            ],
            {
                relativeTo: this._activatedRoute.parent
            }
        ).then();
    }

    especieSetores(repositorioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${repositorioId}/especie-setor`)]).then();
    }

    delete(repositorioId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteRepositorio({
            repositorioId: repositorioId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
