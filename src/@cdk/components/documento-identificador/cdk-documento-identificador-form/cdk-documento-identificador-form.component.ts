import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocumentoIdentificador, ModalidadeDocumentoIdentificador, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-documento-identificador-form',
    templateUrl: './cdk-documento-identificador-form.component.html',
    styleUrls: ['./cdk-documento-identificador-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoIdentificadorFormComponent implements OnChanges, OnDestroy {

    @Input()
    documentoIdentificador: DocumentoIdentificador;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeDocumentoIdentificadorPagination: Pagination;

    @Output()
    save = new EventEmitter<DocumentoIdentificador>();

    @Output()
    abort = new EventEmitter<any>();

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
            pessoa: [null],
            codigoDocumento: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeDocumentoIdentificador: [null, [Validators.required]],
            emissorDocumento: [null, [Validators.required, Validators.maxLength(255)]],
            dataEmissao: [null]
        });
        this.modalidadeDocumentoIdentificadorPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['documentoIdentificador'] && this.documentoIdentificador &&
            ((!this.documentoIdentificador.id && !this.form.dirty) || (this.documentoIdentificador.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.documentoIdentificador});
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

    checkModalidadeDocumentoIdentificador(): void {
        const value = this.form.get('modalidadeDocumentoIdentificador').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeDocumentoIdentificador').setValue(null);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    selectModalidadeDocumentoIdentificador(documentoIdentificador: ModalidadeDocumentoIdentificador): void {
        if (documentoIdentificador) {
            this.form.get('modalidadeDocumentoIdentificador').setValue(documentoIdentificador);
        }
        this.activeCard = 'form';
    }

    showModalidadeDocumentoIdentificadorGrid(): void {
        this.activeCard = 'documento-identificador-gridsearch';
    }

}
