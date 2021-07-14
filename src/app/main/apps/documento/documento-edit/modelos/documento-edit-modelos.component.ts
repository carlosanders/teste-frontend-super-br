import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import {ComponenteDigital, Documento, Modelo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {ModeloService} from '@cdk/services/modelo.service';
import {takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'documento-edit-modelos',
    templateUrl: './documento-edit-modelos.component.html',
    styleUrls: ['./documento-edit-modelos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditModelosComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    loading$: Observable<boolean>;
    modelos$: Observable<Modelo[]>;
    pagination$: Observable<any>;
    pagination: any;

    currentComponenteDigital$: Observable<ComponenteDigital>;
    currentComponenteDigital: ComponenteDigital;

    documento$: Observable<Documento>;
    documento: Documento;

    error$: Observable<any>;
    erro: any;

    routerState: any;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _modeloService
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditModelosAppState>,
        private _location: Location,
        private _router: Router,
        private _modeloService: ModeloService
    ) {
        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.currentComponenteDigital$ = this._store.pipe(select(fromStore.getCurrentComponenteDigital));

        this.pagination$ = this._store.pipe(select(fromStore.getModelosPagination));
        this.loading$ = this._store.pipe(select(fromStore.getModelosIsLoading));
        this.error$ = this._store.pipe(select(fromStore.getErrors));
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
        this.documento$.subscribe((documento) => {
            this.documento = documento;
        });
        this.currentComponenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            componenteDigital => this.currentComponenteDigital = componenteDigital
        );

        this.error$.subscribe((erro) => {
            if (erro) {
                this.erro = erro.error.message;
            }
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadModelos());
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    doSelect(modelo: Modelo): void {
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveComponenteDigital({
            componenteDigital: this.currentComponenteDigital,
            changes: {modelo: modelo.id, hashAntigo: this.currentComponenteDigital.hash},
            operacaoId: operacaoId
        }));
    }
}
