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
import {Modelo} from '@cdk/models/modelo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Documento, Pagination} from '@cdk/models';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from "../../../../auth/login/login.service";

@Component({
    selector: 'modelos-list',
    templateUrl: './modelos-list.component.html',
    styleUrls: ['./modelos-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosListComponent implements OnInit, OnDestroy {

    routerState: any;
    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    type = 'setor';

    actions: string[];
    colunas: string[];
    private _unsubscribeAll: Subject<any> = new Subject();

    orgaoCentralPagination: Pagination;
    unidadePagination: Pagination;
    setorPagination: Pagination;

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _activatedRoute
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosListAppState>,
        private _activatedRoute: ActivatedRoute,
        private _loginService: LoginService,
    ) {
        this.modelos$ = this._store.pipe(select(fromStore.getModelosList));
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
                this.actions = ['edit', 'create', 'editConteudo', 'showInatived'];
                this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.setor.nome', 'template.nome', 'ativo', 'actions'];
                this.type = 'setor';
                this.setorPagination = new Pagination();
                this.setorPagination.filter = {
                    id: 'in:' + this.routerState.params['entidadeHandle'],
                    parent: 'isNotNull'
                };
            }
            if (this.routerState.params['generoHandle'] === 'unidade' && !this.routerState.params['setorHandle'] ||
                (this.routerState.params['unidadeHandle'] && !this.routerState.params['setorHandle'])) {
                this.actions = ['edit', 'create', 'editConteudo', 'especie', 'showInatived'];
                this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.unidade.nome', 'template.nome', 'ativo', 'actions'];
                this.type = 'unidade';
                this.unidadePagination = new Pagination();
                this.unidadePagination.filter = {
                    id: 'in:' + this.routerState.params['entidadeHandle'],
                    parent: 'isNull'
                };
            }
            if (this.routerState.params['generoHandle'] === 'nacional' && !this.routerState.params['unidadeHandle']) {
                this.actions = ['edit', 'create', 'editConteudo', 'especie', 'showInatived'];
                this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.modalidadeOrgaoCentral.nome', 'template.nome', 'ativo', 'actions'];
                this.type = 'nacional';
                this.orgaoCentralPagination = new Pagination();
                this.orgaoCentralPagination.filter = {
                    id: 'in:' + this.routerState.params['entidadeHandle'],
                };
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
        if (!this.routerState.url.includes('modelos/listar')) {
            this._unsubscribeAll.next(true);
            this._unsubscribeAll.complete();
            this._store.dispatch(new fromStore.UnloadModelos());
        }
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetModelos({
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
        this._store.dispatch(new fromStore.GetModelos({
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

    edit(modeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + modeloId]).then();
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
                            sidebar: 'modelo/anexos'
                        }
                }
            ],
            {
                relativeTo: this._activatedRoute.parent
            }
        ).then();
    }

    especieSetores(modeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${modeloId}/especie-setor`)]).then();
    }

    delete(modeloId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteModelo({
            modeloId: modeloId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
