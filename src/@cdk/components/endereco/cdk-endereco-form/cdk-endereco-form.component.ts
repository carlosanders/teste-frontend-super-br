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
import { Endereco } from '@cdk/models/endereco.model';
import { Municipio } from '@cdk/models/municipio.model';
import {Pais} from '@cdk/models/pais.model';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-endereco-form',
    templateUrl: './cdk-endereco-form.component.html',
    styleUrls: ['./cdk-endereco-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEnderecoFormComponent implements OnChanges, OnDestroy {

    @Input()
    endereco: Endereco;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    municipioPagination: Pagination;

    @Input()
    paisPagination: Pagination;

    @Output()
    save = new EventEmitter<Endereco>();

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
            'principal': [null],
            'municipio': [null, [Validators.required]],
            'pais': [null, [Validators.required]],
            'logradouro': [null],
            'bairro': [null],
            'cep': [null],
            'observacao': [null],
            'numero': [null],
            'complemento': [null]
        });
        this.municipioPagination = new Pagination();
        this.paisPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['endereco'] && this.endereco && ((!this.endereco.id && !this.form.dirty) || (this.endereco.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.endereco});
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

    checkMunicipio(): void {
        const value = this.form.get('municipio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('municipio').setValue(null);
        }
    }

    checkPais(): void {
        const value = this.form.get('pais').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pais').setValue(null);
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

    selectPais(pais: Pais): void {
        if (pais) {
            this.form.get('pais').setValue(pais);
        }
        this.activeCard = 'form';
    }

    showPaisGrid(): void {
        this.activeCard = 'pais-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
