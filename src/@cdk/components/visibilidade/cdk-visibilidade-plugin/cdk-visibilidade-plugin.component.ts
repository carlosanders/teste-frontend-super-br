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

import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-visibilidade-plugin',
    templateUrl: './cdk-visibilidade-plugin.component.html',
    styleUrls: ['./cdk-visibilidade-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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