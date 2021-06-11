import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EspecieSetor, Pagination, VinculacaoModelo} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-modelo-especie-setor-form',
    templateUrl: './cdk-vinculacao-modelo-especie-setor-form.component.html',
    styleUrls: ['./cdk-vinculacao-modelo-especie-setor-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoModeloEspecieSetorFormComponent implements OnChanges, OnInit, OnDestroy {

    @Input()
    vinculacaoModelo: VinculacaoModelo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoModelo>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    especieSetorPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            especieSetor: [null, [Validators.required]],
        });

        this.especieSetorPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['vinculacaoModelo'] && this.vinculacaoModelo && ((!this.vinculacaoModelo.id && !this.form.dirty)
            || (this.vinculacaoModelo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoModelo});
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
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
            Object.keys(this.form.controls).forEach((key) => {
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

    doAbort(): void {
        this.abort.emit();
    }

    checkEspecieSetor(): void {
        const value = this.form.get('especieSetor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieSetor').setValue(null);
        }
    }

    selectEspecieSetor(especieSetor: EspecieSetor): void {
        if (especieSetor) {
            this.form.get('especieSetor').setValue(especieSetor);
        }
        this.activeCard = 'form';
    }

    showEspecieSetorGrid(): void {
        this.activeCard = 'especie-setor-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
