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
import { Pessoa } from '@cdk/models/pessoa.model';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import {ModalidadeQualificacaoPessoa} from '@cdk/models/modalidade-qualificacao-pessoa.model';
import {ModalidadeGeneroPessoa} from '@cdk/models/modalidade-genero-pessoa.model';
import {Pais} from '@cdk/models/pais.model';
import {Municipio} from '@cdk/models/municipio.model';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-pessoa-form',
    templateUrl: './cdk-pessoa-form.component.html',
    styleUrls: ['./cdk-pessoa-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                display: {
                    dateInput: 'L LT',
                    datetimeInput: 'L LT'
                }
            }
        }
    ]
})
export class CdkPessoaFormComponent implements OnChanges, OnDestroy {

    @Input()
    pessoa: Pessoa;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeQualificacaoPessoaPagination: Pagination;

    @Input()
    modalidadeGeneroPessoaPagination: Pagination;

    @Input()
    paisPagination: Pagination;

    @Input()
    municipioPagination: Pagination;

    @Output()
    save = new EventEmitter<Pessoa>();

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
            'modalidadeQualificacaoPessoa': [null, [Validators.required]],
            'nome': [null, [Validators.required, Validators.maxLength(255)]],
            'modalidadeGeneroPessoa': [null],
            'dataNascimento': [null],
            'dataObito': [null],
            'profissao': [null, [Validators.maxLength(255)]],
            'contato': [null, [Validators.maxLength(255)]],
            'numeroDocumentoPrincipal': [null, [Validators.maxLength(255)]],
            'nomeGenitor': [null, [Validators.maxLength(255)]],
            'nomeGenitora': [null, [Validators.maxLength(255)]],
            'naturalidade': [null],
            'nacionalidade': [null]
        });
        this.modalidadeQualificacaoPessoaPagination = new Pagination();
        this.modalidadeGeneroPessoaPagination = new Pagination();
        this.paisPagination = new Pagination();
        this.municipioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['pessoa'] && this.pessoa && ((!this.pessoa.id && !this.form.dirty) || (this.pessoa.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.pessoa});
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

    checkModalidadeQualificacaoPessoa(): void {
        const value = this.form.get('modalidadeQualificacaoPessoa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeQualificacaoPessoa').setValue(null);
        }
    }

    checkModalidadeGeneroPessoa(): void {
        const value = this.form.get('modalidadeGeneroPessoa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeGeneroPessoa').setValue(null);
        }
    }

    checkPais(): void {
        const value = this.form.get('pais').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pais').setValue(null);
        }
    }

    checkMunicipio(): void {
        const value = this.form.get('municipio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('municipio').setValue(null);
        }
    }

    selectModalidadeQualificacaoPessoa(modalidadeQualificacaoPessoa: ModalidadeQualificacaoPessoa): void {
        if (modalidadeQualificacaoPessoa) {
            this.form.get('modalidadeQualificacaoPessoa').setValue(modalidadeQualificacaoPessoa);
        }
        this.activeCard = 'form';
    }

    showModalidadeQualificacaoPessoaGrid(): void {
        this.activeCard = 'modalidade-qualificacao-pessoa-gridsearch';
    }

    selectModalidadeGeneroPessoa(modalidadeGeneroPessoa: ModalidadeGeneroPessoa): void {
        if (modalidadeGeneroPessoa) {
            this.form.get('modalidadeGeneroPessoa').setValue(modalidadeGeneroPessoa);
        }
        this.activeCard = 'form';
    }

    showModalidadeGeneroPessoaGrid(): void {
        this.activeCard = 'modalidade-genero-pessoa-gridsearch';
    }

    selectPais(pais: Pais): void {
        if (pais) {
            this.form.get('nacionalidade').setValue(pais);
        }
        this.activeCard = 'form';
    }

    showPaisGrid(): void {
        this.activeCard = 'pais-gridsearch';
    }

    selectMunicipio(municipio: Municipio): void {
        if (municipio) {
            this.form.get('naturalidade').setValue(municipio);
        }
        this.activeCard = 'form';
    }

    showMunicipioGrid(): void {
        this.activeCard = 'municipio-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
