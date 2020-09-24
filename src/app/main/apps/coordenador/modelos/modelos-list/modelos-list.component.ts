import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Modelo} from '@cdk/models/modelo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Documento} from '../../../../../../@cdk/models';

@Component({
    selector: 'modelos-list',
    templateUrl: './modelos-list.component.html',
    styleUrls: ['./modelos-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosListComponent implements OnInit {

    routerState: any;
    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    actions: string[];
    colunas: string[];

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
        private _store: Store<fromStore.ModelosListAppState>,
        private _activatedRoute: ActivatedRoute
    ) {
        this.modelos$ = this._store.pipe(select(fromStore.getModelosList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if (this.routerState.params['generoHandle'] === 'local' || this.routerState.params['setorHandle']) {
                        this.actions = ['edit', 'create', 'editConteudo', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.setor.nome', 'template.nome', 'ativo', 'actions'];
                    }
                    if (this.routerState.params['generoHandle'] === 'unidade' && !this.routerState.params['setorHandle'] ||
                        (this.routerState.params['unidadeHandle'] && !this.routerState.params['setorHandle'])) {
                        this.actions = ['edit', 'create', 'editConteudo', 'especie', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.unidade.nome', 'template.nome', 'ativo', 'actions'];
                    }
                    if (this.routerState.params['generoHandle'] === 'nacional' && !this.routerState.params['unidadeHandle']) {
                        this.actions = ['edit', 'create', 'editConteudo', 'especie', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.orgaoCentral.valor', 'template.nome', 'ativo', 'actions'];
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
            context: this.pagination.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(modeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + modeloId]);
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
        this._router.navigate([this.routerState.url.replace('listar', `${modeloId}/especie-setor`)]);
    }

    delete(modeloId: number): void {
        this._store.dispatch(new fromStore.DeleteModelo(modeloId));
    }

}
