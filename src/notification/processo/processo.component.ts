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

@Component({
    selector: 'app-notification-processo',
    templateUrl: './processo.component.html',
    styleUrls: ['./processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoComponent {
    constructor(
        private snackbar: MatSnackBarRef<ProcessoComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: Notificacao,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
    }

    action() {
        const processo = JSON.parse(this.data.contexto);
        this.router
            .navigate([`/apps/processo/${processo.id}/visualizar/capa/mostrar`])
            .then(() => this.snackbar.dismiss());
    }

    close() {
        this.snackbar.dismiss();
    }
}
