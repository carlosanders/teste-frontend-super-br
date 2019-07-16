import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {Pagination} from '@cdk/models/pagination';

import {CampoService} from '@cdk/services/campo.service';
import {Campo} from '@cdk/models/campo.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-campo-plugin',
    templateUrl: './cdk-campo-plugin.component.html',
    styleUrls: ['./cdk-campo-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkCampoPluginComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    campos: Campo[];

    total = 0;

    loading: boolean;

    form: FormGroup;

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CdkCampoPluginComponent>,
    ) {
        this.loading = false;
        this.pagination = new Pagination();

        this.form = this._formBuilder.group({
            'campo': [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
    }

    select(campo): void {
        this.selected.emit(campo);
    }

    doCancel(): void {
        this.cancel.emit();
    }

    checkCampo(): void {
        const value = this.form.get('campo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('campo').setValue(null);
        }
    }

}
