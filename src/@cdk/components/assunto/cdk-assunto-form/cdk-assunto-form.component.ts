import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Assunto} from '@cdk/models/assunto.model';
import {AssuntoAdministrativo} from '@cdk/models/assunto-administrativo.model';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-assunto-form',
    templateUrl: './cdk-assunto-form.component.html',
    styleUrls: ['./cdk-assunto-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAssuntoFormComponent implements OnChanges, OnDestroy {

    @Input()
    assunto: Assunto;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Assunto>();

    @Input()
    assuntoAdministrativoPagination: Pagination;

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
            'processo': [null, [Validators.required]],
            'principal': [null],
            'assuntoAdministrativo': [null, [Validators.required]]
        });
        
        this.assuntoAdministrativoPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['assunto'] && this.assunto && ((!this.assunto.id && !this.form.dirty) || (this.assunto.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.assunto});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
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

    checkAssuntoAdministrativo(): void {
        const value = this.form.get('assuntoAdministrativo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('assuntoAdministrativo').setValue(null);
        }
    }
    
    selectAssuntoAdministrativo(assuntoAdministrativo: AssuntoAdministrativo): void {
        if (assuntoAdministrativo) {
            this.form.get('assuntoAdministrativo').setValue(assuntoAdministrativo);
        }
        this.activeCard = 'form';
    }

    showAssuntoAdministrativoGrid(): void {
        this.activeCard = 'assunto-administrativo-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
