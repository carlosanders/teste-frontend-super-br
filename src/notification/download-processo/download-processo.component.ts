import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import { cdkAnimations } from '@cdk/animations';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Notificacao } from '@cdk/models';
import { Router } from '@angular/router';
import {ComponenteDigitalService} from "../../@cdk/services/componente-digital.service";

@Component({
    selector: 'app-notification-download-processo',
    templateUrl: './download-processo.component.html',
    styleUrls: ['./download-processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DownloadProcessoComponent {
    constructor(
        private _snackbar: MatSnackBarRef<DownloadProcessoComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: Notificacao,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
    }

    view() {
        const data = JSON.parse(this.data.contexto);
        this._router
            .navigate([`/apps/processo/${data.id}/visualizar/capa/mostrar`])
            .then(() => this._snackbar.dismiss());
    }

    visualizarProcessoNovaAba(): void {
        const data = JSON.parse(this.data.contexto);
        window.open(`/apps/processo/${data.id}/visualizar/capa/mostrar`);
    }

    download() {
        const data = JSON.parse(this.data.contexto);
        this._componenteDigitalService
            .download(data.componente_digital_id)
            .subscribe(response => {
                if (response && response.conteudo) {
                    const byteCharacters = atob(response.conteudo.split(';base64,')[1]);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {type: response.mimetype});
                    const URL = window.URL;
                    const data = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = data;
                    link.download = response.fileName;
                    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                    setTimeout( () => {
                        window.URL.revokeObjectURL(data);
                        link.remove();
                        this._snackbar.dismiss()
                    }, 100);
                }
            });
    }

    close() {
        this._snackbar.dismiss();
    }
}
