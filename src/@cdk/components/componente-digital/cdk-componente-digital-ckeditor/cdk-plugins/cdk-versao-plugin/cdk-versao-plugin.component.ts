import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit, Inject
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {Pagination} from '@cdk/models/pagination';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-versao-plugin',
    templateUrl: './cdk-versao-plugin.component.html',
    styleUrls: ['./cdk-versao-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVersaoPluginComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    @Output()
    reverter = new EventEmitter();

    total = 0;

    loading: boolean;

    @Input()
    logEntryPagination: Pagination;

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     * @param data
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CdkVersaoPluginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
    }

    select(versao): void {
        this.selected.emit(versao);
    }

    revert(params): void {
        this.reverter.emit(params);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
