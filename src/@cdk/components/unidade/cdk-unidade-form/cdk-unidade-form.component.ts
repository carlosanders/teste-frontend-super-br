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
import {Setor} from '@cdk/models/setor.model';
import {Pagination} from '@cdk/models/pagination';
import {GeneroSetor} from '@cdk/models/genero-setor.model';
import {Municipio} from '@cdk/models/municipio.model';
import {ModalidadeOrgaoCentral} from '../../../models';

@Component({
    selector: 'cdk-unidade-form',
    templateUrl: './cdk-unidade-form.component.html',
    styleUrls: ['./cdk-unidade-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUnidadeFormComponent implements OnChanges, OnDestroy {

    @Input()
    unidade: Setor;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Setor>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    generoSetorPagination: Pagination;

    modalidadeOrgaoCentralPagination: Pagination;

    municipioPagination: Pagination;

    @Input()
    setorPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            ativo: [true],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            sigla: [null, [Validators.required, Validators.maxLength(255)]],
            prefixoNUP: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]{1,5}')]],
            sequenciaInicialNUP: [null],
            endereco: [null],
            email: [null, [Validators.email, Validators.maxLength(255)]],
            modalidadeOrgaoCentral: [null, [Validators.required]],
            unidadePai: [null],
            generoSetor: [null, [Validators.required]],
            municipio: [null, [Validators.required]],
            apenasProtocolo: [null],
            numeracaoDocumentoUnidade: [null],
        });

        this.generoSetorPagination = new Pagination();
        this.modalidadeOrgaoCentralPagination = new Pagination();
        this.municipioPagination = new Pagination();
        this.municipioPagination.populate = ['estado'];
        this.setorPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['unidade'] && this.unidade && (!this.unidade.id || (this.unidade.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.unidade});
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

    checkGeneroSetor(): void {
        const value = this.form.get('generoSetor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('generoSetor').setValue(null);
        }
    }

    selectGeneroSetor(generoSetor: GeneroSetor): void {
        if (generoSetor) {
            this.form.get('generoSetor').setValue(generoSetor);
        }
        this.activeCard = 'form';
    }

    showGeneroSetorGrid(): void {
        this.activeCard = 'genero-setor-gridsearch';
    }

    checkModalidadeOrgaoCentral(): void {
        const value = this.form.get('modalidadeOrgaoCentral').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeOrgaoCentral').setValue(null);
        }
    }

    selectModalidadeOrgaoCentral(modalidadeOrgaoCentral: ModalidadeOrgaoCentral): void {
        if (modalidadeOrgaoCentral) {
            this.form.get('modalidadeOrgaoCentral').setValue(modalidadeOrgaoCentral);
        }
        this.activeCard = 'form';
    }

    showModalidadeOrgaoCentralGrid(): void {
        this.activeCard = 'modalidade-orgao-central-gridsearch';
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

    checkSetor(): void {
        const value = this.form.get('unidadePai').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidadePai').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('unidadePai').setValue(setor);
        }
        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }


    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
