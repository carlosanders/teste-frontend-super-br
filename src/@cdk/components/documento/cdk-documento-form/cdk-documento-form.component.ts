import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Documento } from '@cdk/models/documento.model';
import { TipoDocumento } from '@cdk/models/tipo-documento.model';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-documento-form',
    templateUrl: './cdk-documento-form.component.html',
    styleUrls: ['./cdk-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDocumentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    documento: Documento;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    tipoDocumentoPagination: Pagination;

    @Output()
    save = new EventEmitter<Documento>();

    form: FormGroup;

    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            'id': [null],
            'processo': [null],
            'principal': [null],
            'tipoDocumento': [null]
        });
        this.tipoDocumentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['documento'] && this.documento && ((!this.documento.id && !this.form.dirty) || (this.documento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.documento});
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({'formError': data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({'rulesError': this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
