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
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

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
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosListAppState>,
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
                    if (this.routerState.params['generoHandle'] === 'local') {
                        this.actions = ['edit', 'editConteudo', 'delete'];
                        this.colunas = ['select', 'id', 'nome', 'descricao', 'vinculacoesModelos.setor.nome', 'template.nome', 'ativo', 'actions'];
                    }
                    if (this.routerState.params['generoHandle'] === 'nacional') {
                        this.actions = ['edit', 'editConteudo', 'especie', 'delete'];
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
                ...params.gridFilter,

            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    edit(modeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + modeloId]);
    }

    editConteudo(documentoId: number): void {
        this._router.navigate([this.routerState.url + '/documento/' + documentoId + '/modelo']).then();
    }

    especieSetores(modeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${modeloId}/especie-setor`)]);
    }

    delete(modeloId: number): void {
        this._store.dispatch(new fromStore.DeleteModelo(modeloId));
    }

}
