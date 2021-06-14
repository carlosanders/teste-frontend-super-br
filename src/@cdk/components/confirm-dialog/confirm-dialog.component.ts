import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';

@Component({
    selector   : 'cdk-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class CdkConfirmDialogComponent
{

    public confirmMessage: string;

    /**
     *
     * @param dialogRef
     * @param data
     */
    constructor(
        public dialogRef: MatDialogRef<CdkConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

}
