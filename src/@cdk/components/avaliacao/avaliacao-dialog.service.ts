import {EventEmitter, Injectable} from '@angular/core';
import {CdkAvaliacaoDialogPluginComponent} from './avaliacao-dialog-plugin/cdk-avaliacao-dialog-plugin.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class AvaliacaoDialogService
{
    public avaliaObjeto: EventEmitter<any> = new EventEmitter<any>();
    public dialogRef: MatDialogRef<CdkAvaliacaoDialogPluginComponent>;
    public dialog: MatDialog;

    constructor(dialog: MatDialog) {
        this.dialog = dialog;
    }

    openDialog(data: any): void {
        this.dialogRef = this.dialog.open(CdkAvaliacaoDialogPluginComponent, {
            width: '300px',
            data: {
                objetoAvaliado$: data.objetoAvaliado$,
                isLoading$: data.isLoading$,
                isSaving$: data.isSaving$,
                errors$: data.errors$
            },
            disableClose: false
        });
        const avaliaObjetoSub = this.dialogRef.componentInstance.onAvaliaObjeto.subscribe((avaliacaoRealizada) => {
            this.avaliaObjeto.emit(avaliacaoRealizada);
        });

        this.dialogRef.afterClosed().subscribe(() => {
            avaliaObjetoSub.unsubscribe();
        });
    }
}
