import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Inject, OnDestroy,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ObjetoAvaliado} from '@cdk/models';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'cdk-avaliacao-dialog-plugin',
    templateUrl: './cdk-avaliacao-dialog-plugin.component.html',
    styleUrls: ['./cdk-avaliacao-dialog-plugin.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations
})

export class CdkAvaliacaoDialogPluginComponent implements OnInit, OnDestroy {

    @Output()
    onAvaliaObjeto = new EventEmitter();

    isLoading$: Observable<boolean>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    objetoAvaliado$: Observable<ObjetoAvaliado>;

    objetoAvaliado: ObjetoAvaliado;
    initialRate: number = 0;
    quantity: number = 5;
    readonly: boolean = true;
    avaliacaoResultante: number;

    stars: boolean[] = Array(this.quantity).fill(false);

    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialogRef<CdkAvaliacaoDialogPluginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isLoading$ = data.isLoading$;
        this.isSaving$ = data.isSaving$;
        this.objetoAvaliado$ = data.objetoAvaliado$;
        this.errors$ = data.errors$;
    }

    ngOnInit(): void {
        this.objetoAvaliado$.subscribe((objetoAvaliado) => {
            this.objetoAvaliado = objetoAvaliado;
            this.avaliacaoResultante = Math.trunc(Math.round(objetoAvaliado?.avaliacaoResultante / 20.0));
            this.starsActivate(this.avaliacaoResultante);
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    avaliacao(avaliacao: number): any {
        const avaliacaoRealizada = {
            classe: this.objetoAvaliado.classe,
            objetoId: this.objetoAvaliado.objetoId,
            avaliacao: avaliacao
        };

        this.onAvaliaObjeto.emit(avaliacaoRealizada);
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
