import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    ViewEncapsulation,
    OnInit, Inject, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, ViewChild, ElementRef
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {Pagination} from '@cdk/models';

import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-vinculacao-etiqueta-edit-dialog',
    templateUrl: './cdk-vinculacao-etiqueta-edit-dialog.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoEtiquetaEditDialogComponent implements OnInit {

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
        public dialogRef: MatDialogRef<CdkVinculacaoEtiquetaEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;        

        this.form = this._formBuilder.group({
            id: [data.id],
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

    submit(formulario){
        if (this.form.valid) {
            this.data.mostraSpinnerSalvamento = true;
            this.editVinc.emit({
                id: this.form.value.id,
                conteudo: this.form.value.conteudo
            });   
        }
    }

    onCloseClick(): void {
        this.dialogRef.close(0);
    }
}
