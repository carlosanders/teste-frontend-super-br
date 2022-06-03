import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject, Input, OnDestroy,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {Acao, VinculacaoEtiqueta} from '@cdk/models';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'cdk-vinculacao-etiqueta-acoes-dialog',
    templateUrl: './cdk-vinculacao-etiqueta-acoes-dialog.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-acoes-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEtiquetaAcoesDialogComponent implements OnDestroy{

    @Input() vinculacaoEtiqueta: VinculacaoEtiqueta;
    @Input() isLoading$: Observable<boolean> = new Observable<boolean>();
    @Input() isSaving$: Observable<boolean> = new Observable<boolean>();
    @Input() acoesEtiquetaList$: Observable<Acao[]> = new Observable<Acao[]>();

    form: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject();


    constructor(
        public _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<CdkVinculacaoEtiquetaAcoesDialogComponent>,
        private _viewContainerRef: ViewContainerRef,
        @Inject(MAT_DIALOG_DATA) {
            vinculacaoEtiqueta,
            acoesEtiquetaList$,
            isSaving$,
            isLoading$,
        }
    ) {
        this.vinculacaoEtiqueta = vinculacaoEtiqueta;
        this.acoesEtiquetaList$ = acoesEtiquetaList$;
        this.isSaving$ = isSaving$;
        this.isLoading$ = isLoading$;
        this.form = this._formBuilder.group({
            id: [this.vinculacaoEtiqueta.id],
            podeAlterarConteudo: [this.vinculacaoEtiqueta.podeAlterarConteudo]
        });
    }

    doCloseModal(value: boolean = false): void {
        this._dialogRef.close(value);
    }

    submit(): void {
        if (this.form.valid) {
            this.doCloseModal(true);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
