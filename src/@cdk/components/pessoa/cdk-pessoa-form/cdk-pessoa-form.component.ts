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
import {ModalidadeGeneroPessoa, ModalidadeQualificacaoPessoa, Municipio, Pagination, Pais, Pessoa} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'cdk-pessoa-form',
    templateUrl: './cdk-pessoa-form.component.html',
    styleUrls: ['./cdk-pessoa-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
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
    mode = 'select';

    @Input()
    modalidadeQualificacaoPessoaPagination: Pagination;

    @Input()
    modalidadeGeneroPessoaPagination: Pagination;

    @Input()
    paisPagination: Pagination;

    @Input()
    municipioPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    @Input()
    hidden: any;

    textoDataNascimento = 'Data de Nascimento';

    textoDataObito = 'Data de Óbito';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public _loginService: LoginService,
        private _router: Router
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            modalidadeQualificacaoPessoa: [null, [Validators.required]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeGeneroPessoa: [null],
            dataNascimento: [null],
            dataObito: [null],
            profissao: [null, [Validators.maxLength(255)]],
            contato: [null, [Validators.maxLength(255)]],
            numeroDocumentoPrincipal: [null, [Validators.maxLength(255),
                Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')]],
            nomeGenitor: [null, [Validators.maxLength(255)]],
            nomeGenitora: [null, [Validators.maxLength(255)]],
            pessoaConveniada: [null],
            pessoaValidada: [null],
            naturalidade: [null],
            nacionalidade: [null]
        });
        this.modalidadeQualificacaoPessoaPagination = new Pagination();
        this.modalidadeGeneroPessoaPagination = new Pagination();
        this.paisPagination = new Pagination();
        this.municipioPagination = new Pagination();
        this.municipioPagination.populate = ['populateAll'];
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
        this.checkModalidadeQualificacaoPessoa();

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
    submit(select: boolean = false): void {
        if (this.form.valid) {
            this.save.emit({pessoa: this.form.value, select: select});
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    validaCampos(campo): void {

        if (campo !== null && typeof campo === 'object' && (campo.valor !== 'PESSOA FÍSICA')){

            this.hidden = true;

            this.form.get('modalidadeGeneroPessoa').reset();
            this.form.get('modalidadeGeneroPessoa').disable();

            this.form.get('nacionalidade').reset();
            this.form.get('nacionalidade').disable();

            this.form.get('naturalidade').reset();
            this.form.get('naturalidade').disable();

            this.form.get('profissao').reset();
            this.form.get('profissao').disable();

            this.form.get('nomeGenitor').reset();
            this.form.get('nomeGenitor').disable();

            this.form.get('nomeGenitora').reset();
            this.form.get('nomeGenitora').disable();

            this.textoDataNascimento = 'Criação';
            this.textoDataObito = 'Extinção';

        }

        if (campo !== null && typeof campo === 'object' && (campo.valor === 'PESSOA FÍSICA')){

            this.form.get('modalidadeGeneroPessoa').enable();
            this.form.get('nacionalidade').enable();
            this.form.get('naturalidade').enable();
            this.form.get('profissao').enable();
            this.form.get('nomeGenitor').enable();
            this.form.get('nomeGenitora').enable();

            this.textoDataNascimento = 'Data de Nascimento';
            this.textoDataObito = 'Data de Óbito';

            this.hidden = false;
        }
    }

    checkModalidadeQualificacaoPessoa(): void {

        const value = this.form.get('modalidadeQualificacaoPessoa').value;

        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeQualificacaoPessoa').setValue(null);
        }

        this.validaCampos(value);
    }

    checkModalidadeGeneroPessoa(): void {
        const value = this.form.get('modalidadeGeneroPessoa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeGeneroPessoa').setValue(null);
        }
    }

    checkPais(): void {
        const value = this.form.get('nacionalidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('nacionalidade').setValue(null);
        }
    }

    checkMunicipio(): void {
        const value = this.form.get('naturalidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('naturalidade').setValue(null);
        }
    }

    selectModalidadeQualificacaoPessoa(modalidadeQualificacaoPessoa: ModalidadeQualificacaoPessoa): void {
        if (modalidadeQualificacaoPessoa) {
            this.form.get('modalidadeQualificacaoPessoa').setValue(modalidadeQualificacaoPessoa);
        }
        this.activeCard = 'form';

        this.validaCampos(this.form.get('modalidadeQualificacaoPessoa').value);
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

    showCheckboxes(): boolean {
        return this._loginService.isGranted('ROLE_ADMIN') && this._router.url.indexOf('/admin/') !== -1;
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }
}
