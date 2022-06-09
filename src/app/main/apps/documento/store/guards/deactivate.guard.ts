import {Injectable} from '@angular/core';
import {ActivatedRoute, CanDeactivate} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {DocumentoComponent} from '../../documento.component';
import {DocumentoAppState} from '../';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {Observable, of} from 'rxjs';
import {getRouterState} from '../../../../../store';
import {filter} from 'rxjs/operators';

@Injectable()
export class DeactivateGuard implements CanDeactivate<DocumentoComponent> {
    routerState: any;
    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;

    /**
     *
     * @param _store
     * @param _activatedRoute
     * @param _matDialog
     */
    constructor(
        private _store: Store<DocumentoAppState>,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    canDeactivate(target: DocumentoComponent): Observable<boolean> {
        if (target.hasChanges() && !this.routerState.url.includes('/documento/')) {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                    message: 'Existem mudanças não salvas no editor que serão perdidas. Deseja continuar?'
                },
                disableClose: false
            });

            return this.confirmDialogRef.afterClosed();
        } else {
            return of(true);
        }
    }

}
