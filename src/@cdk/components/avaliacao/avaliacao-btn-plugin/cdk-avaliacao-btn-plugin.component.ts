import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {CdkAvaliacaoDialogPluginComponent} from '../avaliacao-dialog-plugin/cdk-avaliacao-dialog-plugin.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ObjetoAvaliado} from '@cdk/models';
import {AvaliacaoDialogService} from '../avaliacao-dialog.service';

@Component({
    selector: 'cdk-avaliacao-btn-plugin',
    template: `
        <button mat-icon-button
                *ngIf="hasVisibled"
                [disabled]="hasDisabled"
                (click)="doOpen(this.objetoId)"
                aria-label="avaliação"
                matTooltip="Avaliação">
            <mat-icon color="primary">grade</mat-icon>
        </button>`,
    styleUrls: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations
})
export class CdkAvaliacaoBtnPluginComponent {

    @Input()
    objetoAvaliado$: Observable<ObjetoAvaliado>;

    @Input()
    isLoading$: Observable<boolean>;

    @Input()
    isSaving$: Observable<boolean>;

    @Input()
    errors$: Observable<any>;

    @Input()
    hasDisabled: boolean = false;

    @Input()
    hasVisibled: boolean = true;

    @Input()
    objetoId: number;

    @Output()
    avaliacao = new EventEmitter<number>();

    @Output()
    open = new EventEmitter<number>();

    dialogRef: MatDialogRef<CdkAvaliacaoDialogPluginComponent>;

    /**
     *
     * @param dialog
     * @param _avaliacaoDialogService
     */
    constructor(
        public dialog: MatDialog,
        private _avaliacaoDialogService: AvaliacaoDialogService
    ) {
    }

    doOpen(objetoId: number): void {
        this.avaliacao.emit(objetoId);

        this._avaliacaoDialogService.openDialog({
            objetoAvaliado$: this.objetoAvaliado$,
            isLoading$: this.isLoading$,
            isSaving$: this.isSaving$,
            errors$: this.errors$
        });
    }
}
