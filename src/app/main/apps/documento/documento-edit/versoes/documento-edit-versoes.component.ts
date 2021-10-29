import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStoreComponente from '../../componente-digital/store';
import {ComponenteDigital, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState, State} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'documento-edit-versoes',
    templateUrl: './documento-edit-versoes.component.html',
    styleUrls: ['./documento-edit-versoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditVersoesComponent implements OnInit, OnDestroy {

    loading$: Observable<boolean>;
    logEntryPagination: Pagination;
    componenteDigital$: Observable<ComponenteDigital>;
    componenteDigital: ComponenteDigital;
    editor: any;
    erro: any;
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _componenteDigitalService
     * @param _matDialog
     */
    constructor(
        private _store: Store<State>,
        private _location: Location,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService,
        private _matDialog: MatDialog
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStoreComponente.getComponenteDigital));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.componenteDigital$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((cd) => {
            this.componenteDigital = cd;

            if (this.componenteDigital) {
                this.logEntryPagination = new Pagination();
                this.logEntryPagination.filter = {
                    entity: 'SuppCore\\AdministrativoBackend\\Entity\\ComponenteDigital',
                    target: 'hash',
                    id: +this.componenteDigital.id
                };
                this.logEntryPagination.sort = {
                    logId: 'DESC'
                };
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * @param data
     */
    doReverter(data: any): void {
        const confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'O conteúdo da minuta será revertido para a versão selecionada, e o conteúdo atual será perdido. Deseja continuar?'
            },
            disableClose: false
        });

        confirmDialogRef.afterClosed().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((result) => {
            if (result) {
                this._store.dispatch(new fromStoreComponente.RevertComponenteDigital({
                    componenteDigital: this.componenteDigital,
                    hash: data.toString()
                }));
                this._componenteDigitalService.revertendo.next(true);
            }
        });
    }

    /**
     * @param data
     */
    doVisualizar(data: any): void {
        this._store.dispatch(new fromStoreComponente.VisualizarVersaoComponenteDigital(data.toString()));
    }

    /**
     * @param data
     */
    doComparar(data: any): void {
        this._store.dispatch(new fromStoreComponente.CompararVersaoComponenteDigital(data.toString()));
    }
}
