import {
    ChangeDetectionStrategy, ChangeDetectorRef,
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

    @Input()
    quantity: number = 5;

    @Input()
    stars: boolean[] = Array(this.quantity).fill(false);

    @Input()
    readonly: boolean = true;

    objetoAvaliado: ObjetoAvaliado;
    avaliacaoResultante: number;

    /**
     *
     * @param dialog
     * @param _avaliacaoDialogService
     * @param _changeDetectorRef
     */
    constructor(
        public dialog: MatDialog,
        private _avaliacaoDialogService: AvaliacaoDialogService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.objetoAvaliado$.subscribe((objetoAvaliado) => {
            this.objetoAvaliado = objetoAvaliado;
            this.avaliacaoResultante = Math.trunc(Math.round(objetoAvaliado?.avaliacaoResultante / 20.0));
            this.starsActivate(this.avaliacaoResultante);
            this._changeDetectorRef.markForCheck();
        });
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

    rate(rating: number): void {
        if (!this.readonly) {
            this.stars = this.stars.map((_, i) => rating > i);
        }
    }

    starsActivate(init: number = 100): void {
        this.stars = this.stars.map((_, i) => init > i);
    }
}
