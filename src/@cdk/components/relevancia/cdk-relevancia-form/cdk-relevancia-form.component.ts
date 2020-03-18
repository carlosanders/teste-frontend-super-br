import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Relevancia} from '@cdk/models';
import {EspecieRelevancia} from '@cdk/models';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-relevancia-form',
    templateUrl: './cdk-relevancia-form.component.html',
    styleUrls: ['./cdk-relevancia-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRelevanciaFormComponent implements OnChanges, OnDestroy {

    @Input()
    relevancia: Relevancia;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Relevancia>();

    @Input()
    especieRelevanciaPagination: Pagination;

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
            id: [null],
            processo: [null, [Validators.required]],
            especieRelevancia: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]]
        });
        this.especieRelevanciaPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
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

    checkEspecieRelevancia(): void {
        const value = this.form.get('especieRelevancia').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieRelevancia').setValue(null);
        }
    }

    selectEspecieRelevancia(especieRelevancia: EspecieRelevancia): void {
        if (especieRelevancia) {
            this.form.get('especieRelevancia').setValue(especieRelevancia);
        }
        this.activeCard = 'form';
    }

    showEspecieRelevanciaGrid(): void {
        this.activeCard = 'especie-relevancia-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
