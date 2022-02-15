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
import {Lotacao} from '@cdk/models/lotacao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Pagination} from '@cdk/models/pagination';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'lotacao-list',
    templateUrl: './coordenador-lotacao-list.component.html',
    styleUrls: ['./coordenador-lotacao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorLotacaoListComponent implements OnInit, OnDestroy {

    routerState: any;
    lotacoes$: Observable<Lotacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    setorPagination: Pagination = new Pagination();
    colaboradorPagination: Pagination = new Pagination();
    modulo: string;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.LotacaoListAppState>,
    ) {
        this.lotacoes$ = this._store.pipe(select(fromStore.getLotacaoList));
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
            if (this.routerState.url.includes('unidades')) {
                this.modulo = 'unidades';
            } else if (this.routerState.url.includes('usuarios')) {
                this.modulo = 'usuarios';
            } else {
                this.modulo = 'lotacoes';
            }
        });

        this.setorPagination.populate = ['populateAll'];
        this.colaboradorPagination.filter = {};
        this.colaboradorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'unidade.id': 'eq:' + this.routerState.params.unidadeHandle ? this.routerState.params.unidadeHandle : this.routerState.params.entidadeHandle,
            'parent.id': 'isNotNull'
        };
        if (this.routerState.params['usuarioHandle']) {
            this.colaboradorPagination.filter = {
                ...this.colaboradorPagination.filter,
                'usuario.id': 'eq:' + this.routerState.params['usuarioHandle']
            };
        }
        if (this.routerState.params['setorHandle']) {
            this.setorPagination.filter = {
                ...this.setorPagination.filter,
                id: 'eq:' + this.routerState.params['setorHandle']
            };
        }
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadLotacoes());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetLotacoes({
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

    edit(lotacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + lotacaoId]).then();
    }

    delete(lotacaoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteLotacao({
            lotacaoId: lotacaoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

}
