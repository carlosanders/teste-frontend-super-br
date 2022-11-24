import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ObjetoAvaliado} from '@cdk/models';
import {AvaliacaoDialogService} from '../avaliacao-dialog.service';

@Component({
    selector: 'cdk-avaliacao-btn-plugin',
    templateUrl: './cdk-avaliacao-btn-plugin.component.html',
    styleUrls: ['./cdk-avaliacao-btn-plugin.component.scss'],
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

    Math = Math;

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

    doOpen(): void {
        this.avaliacao.emit(this.objetoId);

        this._avaliacaoDialogService.openDialog({
            objetoAvaliado$: this.objetoAvaliado$,
            isLoading$: this.isLoading$,
            isSaving$: this.isSaving$,
            errors$: this.errors$
        });
    }

    doShowDetail(): void {
        this.avaliacao.emit(this.objetoId);
    }
}
