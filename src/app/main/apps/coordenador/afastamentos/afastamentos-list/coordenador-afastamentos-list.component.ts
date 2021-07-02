import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Afastamento, Pagination} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '../../../../../../@cdk/utils';


@Component({
    selector: 'coordenador-afastamentos-list',
    templateUrl: './coordenador-afastamentos-list.component.html',
    styleUrls: ['./coordenador-afastamentos-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorAfastamentosListComponent implements OnInit, OnDestroy {

    routerState: any;
    afastamentos$: Observable<Afastamento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    colaboradorPagination: Pagination = new Pagination();
    modulo: string;
    lote: string;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.AfastamentosListAppState>,
    ) {
        this.afastamentos$ = this._store.pipe(select(fromStore.getAfastamentosList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if(this.routerState.url.includes('unidades')) {
                        this.modulo = 'unidades';
                    }
                    else if(this.routerState.url.includes('usuarios')) {
                        this.modulo = 'usuarios';
                    }
                    else {
                        this.modulo = 'lotacoes';
                    }
                }
            });

        this.colaboradorPagination.filter = {};
        this.colaboradorPagination.populate = ['populateAll'];
        if (this.routerState.params['usuarioHandle']) {
            this.colaboradorPagination.filter = {
                ...this.colaboradorPagination.filter,
                'usuario.id': 'eq:' + this.routerState.params['usuarioHandle']
            };
        }
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadAfastamentos());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetAfastamentos({
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

    edit(afastamentoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + afastamentoId]);
    }

    delete(afastamentoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteAfastamento({
            afastamentoId: afastamentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]) {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

}
