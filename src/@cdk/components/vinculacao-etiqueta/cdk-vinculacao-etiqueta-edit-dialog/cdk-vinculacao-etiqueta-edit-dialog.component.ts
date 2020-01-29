import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    ViewEncapsulation,
    OnInit, Inject
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {Pagination} from '@cdk/models/pagination';

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

    form: FormGroup;

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     * @param data
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CdkVinculacaoEtiquetaEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;        

        this.form = this._formBuilder.group({
            //idVinculacao: [data.idVinculacao],
            conteudo: [data.conteudo],
        });


    }

    ngOnInit(): void {
    }

    onClickSalvar(conteudo){
        this.dialogRef.close(conteudo); 
    }

    onNoClick(): void {
        this.dialogRef.close(0);
    }

}
