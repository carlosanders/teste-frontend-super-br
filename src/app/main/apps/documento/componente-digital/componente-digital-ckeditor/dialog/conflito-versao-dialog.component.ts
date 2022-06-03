import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ComponenteDigital} from '@cdk/models';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as moment from 'moment';

@Component({
    selector   : 'conflito-versao-dialog',
    templateUrl: './conflito-versao-dialog.component.html',
    styleUrls  : ['./conflito-versao-dialog.component.scss']
})
export class ConflitoVersaoDialogComponent
{

    constructor(
        private _sanitizer: DomSanitizer,
        private _dialogRef: MatDialogRef<ConflitoVersaoDialogComponent>,
        private _store: Store<fromStore.ComponenteDigitalAppState>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    doVisualizarVersao(data: any): void {
        const componenteDigital = new ComponenteDigital();
        componenteDigital.conteudo = data.conteudo.split(';base64,')[1];
        componenteDigital.fileName = data.fileName;
        this._store.dispatch(new fromStore.VisualizarHTMLComponenteDigital(componenteDigital));
    }


    doComparar(): void {
        const params = {
            conteudo: this.data.componenteDigitalBackup.conteudo.split(';base64,')[1],
            usuario: this.data.componenteDigitalBackup.usuario,
            data: moment(this.data.componenteDigitalBackup.atualizadoEm).format('YYYY-MM-DDTHH:mm:ss')
        };
        this._store.dispatch(new fromStore.CompararComponenteDigitalComHtml(params));
    }

    doVersaoLocal(): void {
        this._dialogRef.close(this.data.componenteDigitalBackup);
    }

    doVersaoRemota(): void {
        this._dialogRef.close(this.data.componenteDigital);
    }

}
