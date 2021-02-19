import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VinculacaoDocumento} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {Documento} from '@cdk/models';
import {ModalidadeVinculacaoDocumento} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-documento-form',
    templateUrl: './cdk-vinculacao-documento-form.component.html',
    styleUrls: ['./cdk-vinculacao-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoDocumentoFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    vinculacaoDocumento: VinculacaoDocumento;

    @Input()
    displayedColumns = ['id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoDocumento>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    documentoPagination: Pagination;

    @Input()
    documentoVinculadoPagination: Pagination;

    @Input()
    modalidadeVinculacaoDocumentoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            documento: [null, [Validators.required]],
            documentoVinculado: [null, [Validators.required]],
            modalidadeVinculacaoDocumento: [null, [Validators.required]]
        });

        this.documentoPagination = new Pagination();
        this.documentoVinculadoPagination = new Pagination();
        this.modalidadeVinculacaoDocumentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.form.get('documento').disable();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['vinculacaoDocumento'] && this.vinculacaoDocumento && ((!this.vinculacaoDocumento.id && !this.form.dirty)
            || (this.vinculacaoDocumento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoDocumento});
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

    doAbort(): void {
        this.abort.emit();
    }

    checkDocumento(): void {
        const value = this.form.get('documento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('documento').setValue(null);
        }
    }

    selectDocumento(documento: Documento): void {
        if (documento) {
            this.form.get('documento').setValue(documento);
        }
        this.activeCard = 'form';
    }

    showDocumentoGrid(): void {
        this.activeCard = 'documento-gridsearch';
    }

    checkDocumentoVinculado(): void {
        const value = this.form.get('documentoVinculado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('documentoVinculado').setValue(null);
        }
    }

    selectDocumentoVinculado(documentoVinculado: Documento): void {
        if (documentoVinculado) {
            this.form.get('documentoVinculado').setValue(documentoVinculado);
        }
        this.activeCard = 'form';
    }

    showDocumentoVinculadoGrid(): void {
        this.activeCard = 'documento-vinculado-gridsearch';
    }

    checkModalidadeVinculacaoDocumento(): void {
        const value = this.form.get('modalidadeVinculacaoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeVinculacaoDocumento').setValue(null);
        }
    }

    selectModalidadeVinculacaoDocumento(modalidadeVinculacaoDocumento: ModalidadeVinculacaoDocumento): void {
        if (modalidadeVinculacaoDocumento) {
            this.form.get('modalidadeVinculacaoDocumento').setValue(modalidadeVinculacaoDocumento);
        }
        this.activeCard = 'form';
    }

    showModalidadeVinculacaoDocumentoGrid(): void {
        this.activeCard = 'modalidade-vinculacao-documento-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
