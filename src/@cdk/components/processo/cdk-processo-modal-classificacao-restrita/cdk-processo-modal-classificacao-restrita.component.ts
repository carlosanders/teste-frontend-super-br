import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {Pagination} from '@cdk/models';

import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';

@Component({
    selector: 'cdk-processo-modal-classificacao-restrita',
    templateUrl: './cdk-processo-modal-classificacao-restrita.component.html',
    styleUrls: ['./cdk-processo-modal-classificacao-restrita.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcessoModalClassificacaoRestritaComponent implements OnInit {

    @Input()
    pagination: Pagination;

    loading: boolean;

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     * @param data
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CdkProcessoModalClassificacaoRestritaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;
    }

    ngOnInit(): void {
    }

    onConfirm(): void {
        this.dialogRef.close(1);
    }

}
