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
    selector: 'app-notification-tarefa',
    templateUrl: './tarefa.component.html',
    styleUrls: ['./tarefa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaComponent {
    constructor(
        private snackbar: MatSnackBarRef<TarefaComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: Notificacao,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
    }

    action() {
        const tarefa = JSON.parse(this.data.contexto);
        this.router
            .navigate([
                `/apps/tarefas/administrativo/minhas-tarefas/entrada/tarefa/${tarefa.id}/processo/${tarefa.id_processo}/visualizar/capa/mostrar`
            ])
            .then(() => this.snackbar.dismiss());
    }

    close() {
        this.snackbar.dismiss();
    }
}
