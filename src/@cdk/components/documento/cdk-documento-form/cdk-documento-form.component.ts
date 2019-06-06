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
import {Documento} from '@cdk/models/documento.model';
import {TipoDocumento} from '@cdk/models/tipo-documento.model';
import {Pagination} from '../../../models/pagination';
import {Processo} from '../../../models/processo.model';
import {Pessoa} from '../../../models/pessoa.model';
import {Setor} from '../../../models/setor.model';
import {ComponenteDigital} from '../../../models/componente-digital.model';

@Component({
    selector: 'cdk-documento-form',
    templateUrl: './cdk-documento-form.component.html',
    styleUrls: ['./cdk-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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

    @Input()
    componenteDigitalPagination: Pagination;

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
            'id': [null],
            'principal': [null], // ?

            // Bloco?
            'processo': [null],
            'tipoDocumento': [null],
            'outroNumero': [null],
            'copia': [null], // Status
            'numeroFolhas': [null],
            // Restrição acesso visibilidade_restrita
            // Modelo
            'autor': [null],
            'redator': [null],
            'procedencia': [null],
            'localizadorOriginal': [null], // 'localProducao': [null], ?
            'dataHoraProducao': [null, [Validators.required]],
            'setorOrigem': [null],
            'observacao': [null],
            /*
            'processoOrigem': [null],
            'descricaoOutros': [null],
            'semEfeito': [null],
            'tarefaOrigem': [null],
            'origemDados': [null],
            'documentoAvulsoRemessa': [null],

            'vinculacoesDocumentos': [null],
            ABAS
            'vinculacoesDocumentos': [null], ou 'vinculacaoDocumentoPrincipal': [null],
            */

            'componentesDigitais': [null], // Outra aba
        });
        this.processoPagination = new Pagination();
        this.tipoDocumentoPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
        this.procedenciaPagination = new Pagination();
        this.componenteDigitalPagination = new Pagination();
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

    selectCopiaParam(valor: String): void {
        this.form.get('copia').setValue(valor);
    }

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        this.form.get('tipoDocumento').setValue(tipoDocumento);
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-gridsearch';
    }

    checkProcesso(): void {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void {
        this.form.get('processo').setValue(processo);
        this.activeCard = 'form';
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
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

    checkComponenteDigital(): void {
        const value = this.form.get('componenteDigital').value;
        if (!value || typeof value !== 'object') {
            this.form.get('componenteDigital').setValue(null);
        }
    }

    selectComponenteDigital(componenteDigital: ComponenteDigital): void {
        this.form.get('componenteDigital').setValue(componenteDigital);
        this.activeCard = 'form';
    }

    showComponenteDigitalGrid(): void {
        this.activeCard = 'componente-digital-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
