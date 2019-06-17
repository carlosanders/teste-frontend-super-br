import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sigilo} from '@cdk/models/sigilo.model';
import {Pagination} from '../../../models/pagination';
import {Processo} from '@cdk/models/processo.model';
import {TipoSigilo} from '../../../models/tipo-sigilo.model';
import {Documento} from '../../../models/documento.model';
import {OrigemDados} from '../../../models/origem-dados.model';
import {ModalidadeCategoriaSigilo} from '../../../models/modalidade-categoria-sigilo.model';

@Component({
    selector: 'cdk-sigilo-form',
    templateUrl: './cdk-sigilo-form.component.html',
    styleUrls: ['./cdk-sigilo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkSigiloFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    sigilo: Sigilo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Sigilo>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    modalidadeCategoriaSigiloPagination: Pagination;

    @Input()
    tipoSigiloPagination: Pagination;

    @Input()
    documentoPagination: Pagination;

    @Input()
    origemDadosPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            'id': [null],
            'processo': [null],
            'desclassificado': [null],
            'codigoIndexacao': [null],
            'fundamentoLegal': [null],
            'razoesClassificacaoSigilo': [null],
            'dataHoraValidadeSigilo': [null, [Validators.required]],
            'dataHoraExpiracao': [null, [Validators.required]],
            'nivelAcesso': [null],
            'modalidadeCategoriaSigilo': [null, [Validators.required]],
            'tipoSigilo': [null, [Validators.required]],
            'documento': [null, [Validators.required]],
            'origemDados': [null, [Validators.required]],
            'observacao': [null]
        });

        this.processoPagination = new Pagination();
        this.modalidadeCategoriaSigiloPagination = new Pagination();
        this.tipoSigiloPagination = new Pagination();
        this.documentoPagination = new Pagination();
        this.origemDadosPagination = new Pagination();
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
        if (changes['sigilo'] && this.sigilo && ((!this.sigilo.id && !this.form.dirty) || (this.sigilo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.sigilo});
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

    checkProcesso(): void {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processo').setValue(processo);
        }
        this.activeCard = 'form';
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    checkModalidadeCategoriaSigiloRecebimento(): void {
        const value = this.form.get('modalidadeCategoriaSigilo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeCategoriaSigilo').setValue(null);
        }
    }

    selectModalidadeCategoriaSigilo(modalidadeCategoriaSigilo: ModalidadeCategoriaSigilo): void {
        if (modalidadeCategoriaSigilo) {
            this.form.get('modalidadeCategoriaSigilo').setValue(modalidadeCategoriaSigilo);
        }
        this.activeCard = 'form';
    }

    showModalidadeCategoriaSigiloGrid(): void {
        this.activeCard = 'modalidade-categoria-sigilo-gridsearch';
    }

    checkDocumento(): void {
        const value = this.form.get('documento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('documento').setValue(null);
        }
    }

    showDocumentoGrid(): void {
        this.activeCard = 'documento-gridsearch';
    }

    selectDocumento(documento: Documento): void {
        if (documento) {
            this.form.get('documento').setValue(documento);
        }
        this.activeCard = 'form';
    }

    checkTipoSigilo(): void {
        const value = this.form.get('tipoSigilo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoSigilo').setValue(null);
        }
    }

    showTipoSigiloGrid(): void {
        this.activeCard = 'tipo-sigilo-gridsearch';
    }

    selectTipoSigilo(tipoSigilo: TipoSigilo): void {
        if (tipoSigilo) {
            this.form.get('tipoSigilo').setValue(tipoSigilo);
        }
        this.activeCard = 'form';
    }

    checkOrigemDados(): void {
        const value = this.form.get('origemDados').value;
        if (!value || typeof value !== 'object') {
            this.form.get('origemDados').setValue(null);
        }
    }

    showOrigemDadosGrid(): void {
        this.activeCard = 'origem-dados-gridsearch';
    }

    selectOrigemDados(origemDados: OrigemDados): void {
        if (origemDados) {
            this.form.get('origemDados').setValue(origemDados);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
