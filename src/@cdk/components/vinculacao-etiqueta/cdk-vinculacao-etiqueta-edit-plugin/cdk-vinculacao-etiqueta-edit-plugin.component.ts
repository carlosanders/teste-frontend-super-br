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
    selector: 'cdk-vinculacao-etiqueta-edit-plugin',
    templateUrl: './cdk-vinculacao-etiqueta-edit-plugin.component.html',
    styleUrls: ['./cdk-vinculacao-etiqueta-edit-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoEtiquetaEditPluginComponent implements OnInit {

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
        public dialogRef: MatDialogRef<CdkVinculacaoEtiquetaEditPluginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;        

        this.form = this._formBuilder.group({
            idVinculacao: [data.idVinculacao],
            conteudo: [data.conteudo],
        });


    }

    ngOnInit(): void {
    }

    onClickInserir(conteudo){
        this.dialogRef.close(conteudo); 
        //console.log(conteudo);
        //console.log(this.form.get('idVinculacao').value);
        //mmmthis.form.get('conteudo').setValue(conteudo);
        //console.log(this.form.get('conteudo').value);

        //this.dialogRef.close();
        /*this.form.setValue({
            idVinculacao: 
            conteudo: conteudo
        });*/
        //mmmthis.dialogRef.close(this.form); 

        //this.dialogRef.close(this.form.get('conteudo').value);
        //this.dialogRef.close(this.form.get('conteudo').value);
    }

    /*onYesClick(): void {
        this.dialogRef.close(1);
    }*/

    onNoClick(): void {
        this.dialogRef.close(0);
    }

}
