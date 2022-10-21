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

import {DocumentoAvulso, Pagination} from '@cdk/models';
import {CdkUtils} from '@cdk/utils';
import {select, Store} from '@ngrx/store';
import * as appStore from 'app/store';
import {RouterStateUrl} from 'app/store';
import {Back} from 'app/store/actions';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import * as fromStore from './store';
import * as fromTarefasStore from 'app/main/apps/tarefas/store';

@Component({
    selector: 'remeter-oficios-bloco',
    templateUrl: './remeter-oficios-bloco.component.html',
    styleUrls: ['./remeter-oficios-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RemeterOficiosBlocoComponent implements OnInit, OnDestroy {

    pagination: Pagination = new Pagination();
    oficios: DocumentoAvulso[] = [];
    deletingErrors$: Observable<any>;
    isLoading$: Observable<boolean>;
    remeterIds: number[] = [];
    routerState: RouterStateUrl;
    errors: any = {};
    bufferTarefasIdReload: number[] = [];

    private _unsubscribeAll: Subject<any> = new Subject();

    usuarioPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.RemeterOficiosBlocoAppState>,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
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

        this._store
            .pipe(
                select(fromStore.getDocumentos),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((oficios) => this.oficios = oficios);

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

        this._store.pipe(
            select(fromStore.getRemeterIds),
            takeUntil(this._unsubscribeAll)
        ).subscribe((remeterIds: number[]) => {
            if (this.remeterIds.length > 0 && remeterIds.length === 0) {
                this.reload(this.pagination);

                this.bufferTarefasIdReload.forEach((id) => {
                    this._store.dispatch(new fromTarefasStore.GetEtiquetasTarefas(id));
                });

                this.bufferTarefasIdReload = [];
            }
            this.remeterIds = remeterIds;
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadOficios());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    reload(params): void {
        this._store.dispatch(new fromStore.GetOficios({
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

    remeter(documentoAvulso: DocumentoAvulso, loteId: string = null): void {
        this.bufferTarefasIdReload = [
            ...this.bufferTarefasIdReload.filter((id) => id !== documentoAvulso.documentoRemessa.tarefaOrigem.id),
            documentoAvulso.documentoRemessa.tarefaOrigem.id
        ];
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.RemeterOficio({
            oficio: documentoAvulso,
            operacao: {
                id: operacaoId,
                loteId: loteId,
                type: 'documento avulso',
                content: 'Remetendo o ofício id ' + documentoAvulso.id + '...',
                redo: [
                    new fromStore.RemeterOficio({
                        oficio: documentoAvulso,
                        operacaoId: operacaoId,
                        status: 0, // carregando
                        loteId: loteId,
                        redo: 'inherent'
                    })
                ],
                undo: null
            }
        }));
    }

    doRemeterOficios(documentoAvulsoIds: number[]): void {
        const loteId = CdkUtils.makeId();
        documentoAvulsoIds.forEach((id) => {
            this.remeter(
                this.oficios.find((oficio) => oficio.id === id),
                loteId
            )
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
