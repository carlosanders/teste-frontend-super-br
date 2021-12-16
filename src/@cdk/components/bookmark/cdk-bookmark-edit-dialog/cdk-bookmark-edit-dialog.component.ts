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

import {ComponenteDigital, Pagination} from '@cdk/models';

import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-bookmark-edit-dialog',
    templateUrl: './cdk-bookmark-edit-dialog.component.html',
    styleUrls: ['./cdk-bookmark-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkBookmarkEditDialogComponent implements OnInit {

    @Input()
    pagination: Pagination;

    loading: boolean;

    @Output()
    edit = new EventEmitter<any>();

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
        public dialogRef: MatDialogRef<CdkBookmarkEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;

        this.form = this._formBuilder.group({
            id: [data.id],
            nome: [data.nome],
            pagina: [data.pagina],
            descricao: [data.descricao]
        });

    }

    ngOnInit(): void {
    }

    submit(): void {

        if (this.form.value.pagina > this.data.totalPaginas) {
            this.form.setErrors({rulesError: 'Página não encontrada no documento.'});
        }

        if (this.form.valid) {
            this.loading = true;
            this.edit.emit({
                id: this.form.value.id,
                nome: this.form.value.nome,
                pagina: this.form.value.pagina,
                descricao: this.form.value.descricao
            });
            this.onCloseClick();
        }
    }

    onCloseClick(): void {
        this.dialogRef.close(0);
    }
}
