import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {Campo, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@cdk/angular/material';

@Component({
    selector: 'cdk-campo-plugin',
    templateUrl: './cdk-campo-plugin.component.html',
    styleUrls: ['./cdk-campo-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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
            campo: [null, [Validators.required]]
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
