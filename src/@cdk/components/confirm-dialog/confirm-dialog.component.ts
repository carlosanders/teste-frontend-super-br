import { Component } from '@angular/core';
import { MatDialogRef } from '@cdk/angular/material';

@Component({
    selector   : 'cdk-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class CdkConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CdkConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<CdkConfirmDialogComponent>
    )
    {
    }

}
