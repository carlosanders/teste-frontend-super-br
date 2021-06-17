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
import {Compartilhamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store';
import {getCompartilhamentoListLoaded} from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-list/store';
import {getRouterState} from '../../../../../../store/reducers';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'compartilhamento-list',
    templateUrl: './compartilhamento-list.component.html',
    styleUrls: ['./compartilhamento-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CompartilhamentoListComponent implements OnInit, OnDestroy {

    routerState: any;
    compartilhamentos$: Observable<Compartilhamento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;

    loaded: any;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _snackBar
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.CompartilhamentoListAppState>,
        private _snackBar: MatSnackBar
    ) {
        this.compartilhamentos$ = this._store.pipe(select(fromStore.getCompartilhamentoList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store.pipe(select(getCompartilhamentoListLoaded)).subscribe(
            loaded => this.loaded = loaded
        );

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
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadCompartilhamentos());
    }

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

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
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
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DeleteCompartilhamentoFlush()
            ],
            undo: null
        }));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletando'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteCompartilhamentoCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteCompartilhamentoFlush());
            }
        });
    }
}
