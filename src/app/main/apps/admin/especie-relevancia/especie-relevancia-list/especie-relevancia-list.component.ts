import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EspecieRelevancia} from '../../../../../../@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'especie-relevancia-list',
    templateUrl: './especie-relevancia-list.component.html',
    styleUrls: ['./especie-relevancia-list.component.scss']
})
export class EspecieRelevanciaListComponent implements OnInit {

    routerState: any;
    especieRelevancias$: Observable<EspecieRelevancia[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.EspecieRelevanciaListAppState>,
    ) {
        this.especieRelevancias$ = this._store.pipe(select(fromStore.getEspecieRelevanciaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

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

    reload(params): void {
        this._store.dispatch(new fromStore.GetEspecieRelevancia({
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

    edit(especieRelevanciaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + especieRelevanciaId]);
    }

    tipoDocumentoEdit(especieRelevanciaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'tipo-documento-list/') + especieRelevanciaId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
