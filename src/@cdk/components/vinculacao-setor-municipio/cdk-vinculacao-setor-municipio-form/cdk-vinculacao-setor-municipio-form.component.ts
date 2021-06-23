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
import {Municipio, Pagination, VinculacaoSetorMunicipio} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-setor-municipio-form',
    templateUrl: './cdk-vinculacao-setor-municipio-form.component.html',
    styleUrls: ['./cdk-vinculacao-setor-municipio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoSetorMunicipioFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    vinculacaoSetorMunicipio: VinculacaoSetorMunicipio;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoSetorMunicipio>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    municipioPagination: Pagination;

    /**
     *
     * @param _changeDetectorRef
     * @param _formBuilder
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            municipio: [null, [Validators.required]]
        });

        this.municipioPagination = new Pagination();
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
        if (changes['vinculacaoSetorMunicipio'] && this.vinculacaoSetorMunicipio && ((!this.vinculacaoSetorMunicipio.id && !this.form.dirty)
            || (this.vinculacaoSetorMunicipio.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoSetorMunicipio});
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

    checkMunicipio(): void {
        const value = this.form.get('municipio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('municipio').setValue(null);
        }
    }

    selectMunicipio(municipio: Municipio): void {
        if (municipio) {
            this.form.get('municipio').setValue(municipio);
        }
        this.activeCard = 'form';
    }

    showMunicipioGrid(): void {
        this.activeCard = 'municipio-gridsearch';
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
