import {Injectable} from '@angular/core';
import {ActivatedRoute, CanDeactivate} from '@angular/router';

import {Store} from '@ngrx/store';

import {DocumentoComponent} from "../../documento.component";
import {DocumentoAppState} from "../";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CdkConfirmDialogComponent} from "../../../../../../@cdk/components/confirm-dialog/confirm-dialog.component";
import {Observable, of} from "rxjs";

@Injectable()
export class DeactivateGuard implements CanDeactivate<DocumentoComponent> {

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
    ) {}

    canDeactivate(target: DocumentoComponent): Observable<boolean> {
        if (target.hasChanges()) {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                },
                disableClose: false
            });

            this.confirmDialogRef
                .componentInstance
                .confirmMessage = 'Podem haver mudanças não salvas no editor que serão perdidas. Deseja continuar?';

            return this.confirmDialogRef.afterClosed();
        } else {
            return of(true);
        }
    }

}
