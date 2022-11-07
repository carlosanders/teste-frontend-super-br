import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';

import {cdkAnimations} from '@cdk/animations';

import {Compartilhamento, Pagination} from '@cdk/models';
import {CdkUtils} from '@cdk/utils';
import {select, Store} from '@ngrx/store';
import {LoginService} from 'app/main/auth/login/login.service';
import * as appStore from 'app/store';
import {RouterStateUrl} from 'app/store';
import {Back} from 'app/store/actions';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import * as fromStore from './store';

@Component({
    selector: 'compartilhamento-remove-bloco',
    templateUrl: './compartilhamento-remove-bloco.component.html',
    styleUrls: ['./compartilhamento-remove-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CompartilhamentoRemoveBlocoComponent implements OnInit, OnDestroy {

    pagination: Pagination = new Pagination();
    compartilhamentos: Compartilhamento[] = [];
    deletingErrors$: Observable<any>;
    isLoading$: Observable<boolean>;
    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;
    routerState: RouterStateUrl;
    lote: string;

    private _unsubscribeAll: Subject<any> = new Subject();

    usuarioPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.CompartilhamentoRemoveBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {

        this.deletingErrors$ = this._store
            .pipe(
                select(fromStore.getDeletingErrors),
                takeUntil(this._unsubscribeAll)
            );

        this._store
            .pipe(
                select(fromStore.getCompartilhamentos),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((compartilhamentos) => this.compartilhamentos = compartilhamentos);

        this._store
            .pipe(
                select(fromStore.getPagination),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((pagination) => this.pagination = pagination);

        this._store.pipe(
            select(appStore.getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => this.routerState = routerState.state);

        this.isLoading$ = this._store.pipe(
            select(fromStore.isLoading),
            takeUntil(this._unsubscribeAll)
        );

        this.deletingIds$ = this._store.pipe(
            select(fromStore.getDeletingIds),
            takeUntil(this._unsubscribeAll)
        );

        this.deletedIds$ = this._store.pipe(
            select(fromStore.getDeletedIds),
            takeUntil(this._unsubscribeAll)
        );

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {


        this._store.pipe(
            select(appStore.getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => this.routerState = routerState.state);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadCompartilhamentos());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    reload(params): void {
        this._store.dispatch(new fromStore.GetCompartilhamentos({
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
            populate: this.pagination.populate
        }));
    }

    delete(compartilhamentoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteCompartilhamento({
            compartilhamentoId: compartilhamentoId,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DeleteCompartilhamento({
                    compartilhamentoId: compartilhamentoId,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent'
                })
            ],
            undo: null
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
