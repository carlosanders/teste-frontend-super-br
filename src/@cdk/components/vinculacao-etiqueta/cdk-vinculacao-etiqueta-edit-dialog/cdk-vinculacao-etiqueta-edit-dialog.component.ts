import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    ViewEncapsulation,
    OnInit, Inject, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges, ViewChild, ElementRef
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

    //@retirar: msgErroForm: string;
    //@retirar: clicouSalvar: boolean;
    //@retirar: @ViewChild('fieldConteudo', {static: true}) fieldConteudoElement: ElementRef;

    @Output()
    editVinc = new EventEmitter<any>();    
    //@retirar: editVinc = new EventEmitter<VinculacaoEtiqueta>();    

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
        //@retirar: this.clicouSalvar = false;

        this.form = this._formBuilder.group({
            id: [data.id],
            conteudo: [data.conteudo],
        });


    }

    ngOnInit(): void {
    }

    submit(formulario){
        if (this.form.valid) {
            //@retirar: this.editVinc.emit(this.form.get('conteudo').value);
            //@retirar: this.clicouSalvar = true;
            this.data.mostraSpinnerSalvamento = true;
            this.editVinc.emit({
                id: this.form.value.id,
                conteudo: this.form.value.conteudo
            });   

        //@retirar: setTimeout(()=> this._changeDetectorRef.detectChanges(),0);
        //@retirar: this.fieldConteudoElement.nativeElement.focus();
        }
    }

    /*@retirar: 
    onClickSalvar(conteudo){
        this.dialogRef.close(conteudo); 
    }*/

    onNoClick(): void {
        this.dialogRef.close(0);
    }

}
