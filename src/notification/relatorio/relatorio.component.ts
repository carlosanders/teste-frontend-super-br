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
    selector: 'app-notification-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioComponent {
    constructor(
        private snackbar: MatSnackBarRef<RelatorioComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: Notificacao,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
    }

    action() {
        const relatorio = JSON.parse(this.data.contexto);
        this.router
            .navigate([`/apps/relatorios/administrativo/meus-relatorios/entrada/relatorio/${relatorio.id}/visualizar`])
            .then(() => this.snackbar.dismiss());
    }

    close() {
        this.snackbar.dismiss();
    }
}
