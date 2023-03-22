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
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {distinctUntilChanged, distinctUntilKeyChanged, filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'setor-list',
    templateUrl: './setor-list.component.html',
    styleUrls: ['./setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SetorListComponent implements OnInit, OnDestroy {

    unidade$: Observable<Setor>;
    unidade: Setor;
    routerState: any;
    setores$: Observable<Setor[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
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
        private _store: Store<fromStore.SetorListAppState>,
    ) {
        this.unidade$ = this._store.pipe(select(fromStore.getCurrentUnidade));
        this.setores$ = this._store.pipe(select(fromStore.getSetorList));
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
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
        this.unidade$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(unidade => !!unidade),
            distinctUntilKeyChanged('id')
        ).subscribe((unidade) => {
            if (!this.unidade || unidade.id !== this.unidade.id) {
                this.reload({
                    filter: {
                        'unidade.id': 'eq:' + unidade.id,
                        'parent': 'isNotNull'
                    },
                    gridFilter: {},
                    limit: 10,
                    offset: 0,
                    sort: {id: 'DESC'},
                });
            }
            this.unidade = unidade;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadSetores());
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', 'criar/editar')]).then();
    }

    reload(params): void {
        let filters = {};
        if (params.filter) {
            filters = {
                ...params.filter
            };
        } else {
            filters = {
                ...this.pagination.filter
            };
        }
        this._store.dispatch(new fromStore.GetSetores({
            ...this.pagination,
            filter: filters,
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
        this._store.dispatch(new fromStore.GetSetores({
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

    edit(setorId: number): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', `${setorId}/editar`)]).then();
    }

    select(setor: Setor): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', `${setor.id}/modelos`)]).then();
    }

    lotacoes(setorId: number): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', `${setorId}/lotacoes`)]).then();
    }

    localizadores(setorId: number): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', `${setorId}/localizadores`)]).then();
    }

    coordenadores(setorId: number): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', `${setorId}/coordenadores`)]).then();
    }

    numerosUnicosDocumentos(setorId: number): void {
        this._router.navigate([this.routerState.url.replace(this.routerState.params['setorHandle'] + '/listar', `${setorId}/numeros-unicos-documentos`)]).then();
    }

    delete(setorId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteSetor({
            setorId: setorId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

}
