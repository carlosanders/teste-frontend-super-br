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
import {Documento} from '@cdk/models';
import {TipoDocumento} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {Processo} from '@cdk/models';
import {Pessoa} from '@cdk/models';
import {Setor} from '@cdk/models';

@Component({
    selector: 'cdk-documento-form',
    templateUrl: './cdk-documento-form.component.html',
    styleUrls: ['./cdk-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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

    @Input()
    processoPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    procedenciaPagination: Pagination;

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
            id: [null],
            tipoDocumento: [null, [Validators.required]],
            outroNumero: [null, [Validators.maxLength(255)]],
            copia: [null],
            numeroFolhas: [null],
            autor: [null, [Validators.maxLength(255)]],
            redator: [null, [Validators.maxLength(255)]],
            procedencia: [null],
            localizadorOriginal: [null, [Validators.maxLength(255)]],
            dataHoraProducao: [null],
            setorOrigem: [null],
            observacao: [null, [Validators.maxLength(255)]],
        });
        this.processoPagination = new Pagination();
        this.tipoDocumentoPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
        this.procedenciaPagination = new Pagination();
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

    selectCopiaParam(valor: String): void {
        this.form.get('copia').setValue(valor);
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-list-gridsearch';
    }

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    checkProcedencia(): void {
        const value = this.form.get('procedencia').value;
        if (!value || typeof value !== 'object') {
            this.form.get('procedencia').setValue(null);
        }
    }

    selectProcedencia(procedencia: Pessoa): void {
        this.form.get('procedencia').setValue(procedencia);
        this.activeCard = 'form';
    }

    showProcedenciaGrid(): void {
        this.activeCard = 'procedencia-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    selectSetorOrigem(setorOrigem: Setor): void {
        this.form.get('setorOrigem').setValue(setorOrigem);
        this.activeCard = 'form';
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
