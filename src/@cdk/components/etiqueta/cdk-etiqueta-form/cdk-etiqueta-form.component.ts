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
import { Etiqueta } from '@cdk/models/etiqueta.model';
import {Pagination} from '@cdk/models/pagination';
import {ModalidadeEtiqueta} from '@cdk/models/modalidade-etiqueta.model';

@Component({
    selector: 'cdk-etiqueta-form',
    templateUrl: './cdk-etiqueta-form.component.html',
    styleUrls: ['./cdk-etiqueta-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEtiquetaFormComponent implements OnChanges, OnDestroy {

    @Input()
    etiqueta: Etiqueta;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Etiqueta>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    modalidadeEtiquetaPagination: Pagination;

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
            'modalidadeEtiqueta': [null, [Validators.required]],
        });

        this.modalidadeEtiquetaPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['etiqueta'] && this.etiqueta && (!this.etiqueta.id || (this.etiqueta.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.etiqueta});
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

    checkModalidadeEtiqueta(): void {
        const value = this.form.get('modalidadeEtiqueta').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeEtiqueta').setValue(null);
        }
    }

    selectModalidadeEtiqueta(modalidadeetiqueta: ModalidadeEtiqueta): void {
        if (modalidadeetiqueta) {
            this.form.get('modalidadeEtiqueta').setValue(modalidadeetiqueta);
        }
        this.activeCard = 'form';
    }

    showModalidadeEtiquetaGrid(): void {
        this.activeCard = 'modalidade-etiqueta-gridsearch';
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
