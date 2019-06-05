import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Modelo } from '@cdk/models/modelo.model';
import {Pagination} from '@cdk/models/pagination';
import {Template} from '@cdk/models/template.model';

@Component({
    selector: 'cdk-modelo-form',
    templateUrl: './cdk-modelo-form.component.html',
    styleUrls: ['./cdk-modelo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkModeloFormComponent implements OnChanges, OnDestroy {

    @Input()
    modelo: Modelo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Modelo>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    templatePagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            'id': [null],
            'ativo': [null],
            'nome': [null, [Validators.required]],
            'template': [null, [Validators.required]],
        });

        this.templatePagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['modelo'] && this.modelo && (!this.modelo.id || (this.modelo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.modelo});
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

    checkTemplate(): void {
        const value = this.form.get('template').value;
        if (!value || typeof value !== 'object') {
            this.form.get('template').setValue(null);
        }
    }

    selectTemplate(template: Template): void {
        this.form.get('template').setValue(template);
        this.activeCard = 'form';
    }

    showTemplateGrid(): void {
        this.activeCard = 'template-gridsearch';
    }

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
