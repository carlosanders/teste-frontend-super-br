import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Processo } from '@cdk/models/processo.model';
import { EspecieProcesso } from '@cdk/models/especie-processo.model';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import {ModalidadeFase} from '@cdk/models/modalidade-fase.model';
import {ModalidadeMeio} from '@cdk/models/modalidade-meio.model';
import {Classificacao} from '@cdk/models/classificacao.model';
import {Setor} from '@cdk/models/setor.model';
import {Pagination} from '../../../models/pagination';
import {Pessoa} from '../../../models/pessoa.model';

@Component({
    selector: 'cdk-processo-form',
    templateUrl: './cdk-processo-form.component.html',
    styleUrls: ['./cdk-processo-form.component.scss'],
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
export class CdkProcessoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    processo: Processo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    especieProcessoPagination: Pagination;

    @Input()
    procedenciaPagination: Pagination;

    @Input()
    classificacaoPagination: Pagination;

    @Input()
    modalidadeFasePagination: Pagination;

    @Input()
    modalidadeMeioPagination: Pagination;

    @Input()
    setorAtualPagination: Pagination;

    @Output()
    save = new EventEmitter<Processo>();

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
            'NUP': [null, [Validators.required, Validators.maxLength(21)]],
            'novo': [null, [Validators.required]],
            'especieProcesso': [null, [Validators.required]],
            'visibilidadeExterna': [null],
            'titulo': [null, [Validators.required, Validators.required, Validators.maxLength(255)]],
            'descricao': [null, [Validators.maxLength(255)]],
            'outroNumero': [null, [Validators.maxLength(255)]],
            'valorEconomico': [null],
            'semValorEconomico': [null],
            'classificacao': [null, [Validators.required]],
            'procedencia': [null, [Validators.required]],
            'localizador': [null],
            'setorAtual': [null, [Validators.required]],
            'modalidadeMeio': [null, [Validators.required]],
            'modalidadeFase': [null],
            'dataHoraAbertura': [null, [Validators.required]],

        });

        this.especieProcessoPagination = new Pagination();
        this.procedenciaPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
        this.modalidadeMeioPagination = new Pagination();
        this.modalidadeFasePagination = new Pagination();
        this.setorAtualPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        if (!this.processo.id) {
            this.form.get('dataHoraAbertura').setValue(null);
            this.form.get('dataHoraAbertura').disable();

            this.form.get('NUP').setValue(null);
            this.form.get('NUP').disable();

            this.form.get('procedencia').setValue(null);
            this.form.get('procedencia').disable();
            this.form.get('novo').valueChanges.subscribe(value => {
                if (value === true) {
                    this.form.get('dataHoraAbertura').setValue(null);
                    this.form.get('dataHoraAbertura').disable();

                    this.form.get('NUP').setValue(null);
                    this.form.get('NUP').disable();

                    this.form.get('procedencia').setValue(null);
                    this.form.get('procedencia').disable();
                } else {
                    this.form.get('dataHoraAbertura').setValue(null);
                    this.form.get('dataHoraAbertura').enable();

                    this.form.get('NUP').setValue(null);
                    this.form.get('NUP').enable();

                    this.form.get('procedencia').setValue(null);
                    this.form.get('procedencia').enable();
                }

                this._changeDetectorRef.markForCheck();
            });
        } else {
            this.form.get('dataHoraAbertura').disable();
            this.form.get('NUP').disable();
        }

        this.form.get('modalidadeFase').disable();
    }


    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['processo'] && this.processo && (!this.processo.id || (this.processo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.processo});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                data.forEach((field) => {
                    const control = this.form.get(field.propertyPath);
                    control.setErrors({'formError': data.message});
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

    checkEspecieProcesso(): void {
        const value = this.form.get('especieProcesso').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieProcesso').setValue(null);
        }
    }

    selectEspecieProcesso(especieProcesso: EspecieProcesso): void {
        if (especieProcesso) {
            this.form.get('especieProcesso').setValue(especieProcesso);
        }
        this.activeCard = 'form';
    }

    showEspecieProcessoGrid(): void {
        this.activeCard = 'especie-processo-gridsearch';
    }

    checkProcedencia(): void {
        const value = this.form.get('procedencia').value;
        if (!value || typeof value !== 'object') {
            this.form.get('procedencia').setValue(null);
        }
    }

    selectProcedencia(procedencia: Pessoa): void {
        if (procedencia) {
            this.form.get('procedencia').setValue(procedencia);
        }
        this.activeCard = 'form';
    }

    showProcedenciaGrid(): void {
        this.activeCard = 'procedencia-gridsearch';
    }

    checkModalidadeFase(): void {
        const value = this.form.get('modalidadeFase').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeFase').setValue(null);
        }
    }

    selectModalidadeFase(modalidadeFase: ModalidadeFase): void {
        if (modalidadeFase) {
            this.form.get('modalidadeFase').setValue(modalidadeFase);
        }
        this.activeCard = 'form';
    }

    showModalidadeFaseGrid(): void {
        this.activeCard = 'modalidade-fase-gridsearch';
    }

    checkModalidadeMeio(): void {
        const value = this.form.get('modalidadeMeio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeMeio').setValue(null);
        }
    }

    selectModalidadeMeio(modalidadeMeio: ModalidadeMeio): void {
        if (modalidadeMeio) {
            this.form.get('modalidadeMeio').setValue(modalidadeMeio);
        }
        this.activeCard = 'form';
    }

    showModalidadeMeioGrid(): void {
        this.activeCard = 'modalidade-meio-gridsearch';
    }

    checkClassificacao(): void {
        const value = this.form.get('classificacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('classificacao').setValue(null);
        }
    }

    selectClassificacao(classificacao: Classificacao): void {
        if (classificacao) {
            this.form.get('classificacao').setValue(classificacao);
        }
        this.activeCard = 'form';
    }

    showClassificacaoGrid(): void {
        this.activeCard = 'classificacao-gridsearch';
    }

    checkSetorAtual(): void {
        const value = this.form.get('setorAtual').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorAtual').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setorAtual').setValue(setor);
        }
        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
