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
    selector: 'modal-aviso-restricao',
    templateUrl: './modal-aviso-restricao-nup.component.html',
    styleUrls: ['./modal-aviso-restricao-nup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModalAvisoRestricaoNupComponent implements OnInit {

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
        public dialogRef: MatDialogRef<ModalAvisoRestricaoNupComponent>,
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
