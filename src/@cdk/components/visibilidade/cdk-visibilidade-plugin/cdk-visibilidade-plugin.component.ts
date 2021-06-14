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
    selector: 'cdk-visibilidade-plugin',
    templateUrl: './cdk-visibilidade-plugin.component.html',
    styleUrls: ['./cdk-visibilidade-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVisibilidadePluginComponent implements OnInit {

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
        public dialogRef: MatDialogRef<CdkVisibilidadePluginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;
    }

    ngOnInit(): void {
    }

    onYesClick(): void {
        this.dialogRef.close(1);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
