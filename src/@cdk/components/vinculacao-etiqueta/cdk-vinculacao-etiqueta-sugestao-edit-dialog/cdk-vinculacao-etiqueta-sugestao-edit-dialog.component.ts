import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {Pagination} from '@cdk/models';

import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-vinculacao-etiqueta-sugestao-edit-dialog',
    templateUrl: './cdk-vinculacao-etiqueta-sugestao-edit-dialog.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-sugestao-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEtiquetaSugestaoEditDialogComponent implements OnInit {

    @Input()
    pagination: Pagination;

    loading: boolean;

    @Output()
    editVinc = new EventEmitter<any>();

    form: FormGroup;

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     * @param data
     */
    constructor(
        public _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CdkVinculacaoEtiquetaSugestaoEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;

        this.form = this._formBuilder.group({
            id: [data.id],
            privada: [data.privada],
            conteudo: [data.conteudo],
            podeAlterarConteudo: [data.podeAlterarConteudo]
        });

        if (!data.podeAlterarConteudo) {
            this.form.controls['conteudo'].disable();
        }
    }

    ngOnInit(): void {
        //
    }

    submit(): void {
        if (this.form.valid) {
            this.data.mostraSpinnerSalvamento = true;
            this.editVinc.emit({
                id: this.form.value.id,
                privada: this.form.value.privada,
                conteudo: this.form.value.conteudo
            });
        }
    }

    onCloseClick(): void {
        this.dialogRef.close(0);
    }
}
