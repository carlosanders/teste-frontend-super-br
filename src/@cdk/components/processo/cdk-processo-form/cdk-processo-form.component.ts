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
import {Estado, GeneroSetor, Processo} from '@cdk/models';
import {EspecieProcesso} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {ModalidadeFase} from '@cdk/models';
import {ModalidadeMeio} from '@cdk/models';
import {Classificacao} from '@cdk/models';
import {Setor} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {Pessoa} from '@cdk/models';

@Component({
    selector: 'cdk-processo-form',
    templateUrl: './cdk-processo-form.component.html',
    styleUrls: ['./cdk-processo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,

    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'L',
                    monthInput: 'MMMM',
                    timeInput: 'LT',
                    datetimeInput: 'L LT'
                },
                display: {
                    dateInput: 'L',
                    monthInput: 'MMMM',
                    datetimeInput: 'L LT',
                    timeInput: 'LT',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                    popupHeaderDateLabel: 'ddd, DD MMM'
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
    _classificacaoPagination: Pagination;

    @Input()
    especieProcessoPagination: Pagination;

    @Input()
    procedenciaPagination: Pagination;

    @Input()
    modalidadeFasePagination: Pagination;

    @Input()
    modalidadeMeioPagination: Pagination;

    @Input()
    setorAtualPagination: Pagination;

    @Input()
    unidadeProtocoloExternoPagination: Pagination;

    @Output()
    save = new EventEmitter<Processo>();

    @Output()
    abort = new EventEmitter<any>();

    @Output()
    put = new EventEmitter<Processo>();

    @Output()
    post = new EventEmitter<Processo>();

    @Output()
    gerirProcedencia = new EventEmitter();

    @Output()
    editProcedencia = new EventEmitter<number>();

    @Input()
    procedencia: Pessoa;

    @Input()
    logEntryPagination: Pagination;

    @Input()
    processoPagination: Pagination;

    @Input()
    generoSetorPagination: Pagination;

    @Input()
    especieSetorPagination: Pagination;

    @Input()
    estados: Estado[];

    @Input()
    form: FormGroup;

    activeCard = 'form';

    readonlyNUP: boolean;
    textBotao: string;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            temProcessoOrigem: [null],
            processoOrigem: [null],
            NUP: [null, [Validators.required, Validators.maxLength(21)]],
            tipoProtocolo: [null, [Validators.required]],
            unidadeArquivistica: [null, [Validators.required]],
            especieProcesso: [null, [Validators.required]],
            visibilidadeExterna: [null],
            titulo: [null, [Validators.required, Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.maxLength(255)]],
            outroNumero: [null, [Validators.maxLength(255)]],
            valorEconomico: [null],
            semValorEconomico: [null],
            classificacao: [null, [Validators.required]],
            procedencia: [null, [Validators.required]],
            localizador: [null],
            setorAtual: [null, [Validators.required]],
            modalidadeMeio: [null, [Validators.required]],
            modalidadeFase: [null],
            dataHoraAbertura: [null, [Validators.required]]
        });

        this.especieProcessoPagination = new Pagination();
        this.procedenciaPagination = new Pagination();
        this._classificacaoPagination = new Pagination();
        this.modalidadeMeioPagination = new Pagination();
        this.modalidadeFasePagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.unidadeProtocoloExternoPagination = new Pagination();
        this.processoPagination = new Pagination();
        this.processoPagination.populate = ['especieProcesso', 'modalidadeMeio', 'classificacao', 'setorAtual', 'setorAtual.unidade'];
        this.generoSetorPagination = new Pagination();
        this.especieSetorPagination = new Pagination();

        this.readonlyNUP = false;
        this.textBotao = '';

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {

        if (!this.processo.id) {

            this.form.get('temProcessoOrigem').setValue(false);

            this.form.get('dataHoraAbertura').setValue(null);
            this.form.get('dataHoraAbertura').disable();

            this.form.get('NUP').setValue(null);
            this.form.get('NUP').disable();

            this.form.get('generoSetor').setValue(null);
            this.form.get('generoSetor').disable();

            this.form.get('especieSetor').setValue(null);
            this.form.get('especieSetor').disable();

            this.form.get('unidadeProtocoloExterno').setValue(null);
            this.form.get('unidadeProtocoloExterno').disable();

            this.form.get('procedencia').setValue(null);
            this.form.get('procedencia').disable();
            this.textBotao = 'SALVAR';
            this.form.get('tipoProtocolo').valueChanges.subscribe(value => {
                if (value === Processo.TP_INFORMADO) {
                    this.form.get('dataHoraAbertura').setValue(null);
                    this.form.get('dataHoraAbertura').enable();

                    this.form.get('NUP').setValue(null);
                    this.form.get('NUP').enable();

                    this.form.get('procedencia').setValue(null);
                    this.form.get('procedencia').enable();
                } else {

                    this.form.get('dataHoraAbertura').setValue(null);
                    this.form.get('dataHoraAbertura').disable();

                    this.form.get('NUP').setValue(null);
                    this.form.get('NUP').disable();

                    this.form.get('procedencia').setValue(null);
                    this.form.get('procedencia').disable();
                }

                this._changeDetectorRef.markForCheck();
            });

            this.form.get('unidadeArquivistica').valueChanges.subscribe(value => {
                if (value === Processo.UA_DOSSIE) {
                    this.form.get('tipoProtocolo').setValue(Processo.TP_PENDENTE);
                } else {
                    this.form.get('tipoProtocolo').setValue(Processo.TP_NOVO);
                }

                this._changeDetectorRef.markForCheck();
            });
        } else {
            this.form.get('dataHoraAbertura').disable();
            this.readonlyNUP = true;
            this.textBotao = 'SALVAR';

            if (this.processo.id) {
                this.form.get('processoOrigem').setValue(null);
                this.form.get('processoOrigem').disable();
            }
        }

        this.form.get('temProcessoOrigem').valueChanges.subscribe(value => {
            if (value) {
                this.form.get('processoOrigem').enable();
            } else {
                this.form.get('processoOrigem').setValue(null);
                this.form.get('processoOrigem').disable();
            }
        });

        this.form.get('estado').valueChanges.subscribe(value => {
            if (value) {
                this.form.get('generoSetor').enable();
                this.unidadeProtocoloExternoPagination.filter = {
                    ... this.unidadeProtocoloExternoPagination.filter,
                    ...{'municipio.estado.id': `eq:${value}`}
                };
            } else {
                this.form.get('generoSetor').setValue(null);
                this.form.get('generoSetor').disable();
            }
        });

        this.form.get('generoSetor').valueChanges.subscribe(value => {
            if (value) {
                this.form.get('especieSetor').enable();
                this.especieSetorPagination.filter = {'generoSetor.id': `eq:${value.id}`};
            } else {
                this.form.get('especieSetor').setValue(null);
                this.form.get('especieSetor').disable();
            }
        });

        this.form.get('especieSetor').valueChanges.subscribe(value => {
            if (value) {
                console.log(value);
                this.form.get('unidadeProtocoloExterno').enable();
                this.unidadeProtocoloExternoPagination.filter = {
                    ... this.unidadeProtocoloExternoPagination.filter,
                    ...{'generoSetor.id': `eq:${this.form.get('generoSetor').value.id}`}
                };
            } else {
                this.form.get('unidadeProtocoloExterno').setValue(null);
                this.form.get('unidadeProtocoloExterno').disable();
            }
        });

        this.form.get('modalidadeFase').disable();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        if (changes['processo'] && this.processo && (!this.processo.id || (this.processo.id !== this.form.get('id').value) || (this.processo.unidadeArquivistica !== this.form.get('unidadeArquivistica').value))) {
            this.form.patchValue({...this.processo});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                data.forEach((field) => {
                    const control = this.form.get(field.propertyPath);
                    control.setErrors({formError: data.message});
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

        if (changes['procedencia'] && this.procedencia) {
            this.form.get('procedencia').setValue(this.procedencia);
        }

        this._changeDetectorRef.detectChanges();
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

    checkEspecieProcesso(): void {
        const value = this.form.get('especieProcesso').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieProcesso').setValue(null);
        }
    }

    doGerirProcedencia(): void {
        this.gerirProcedencia.emit();
    }

    doEditProcedencia(): void {
        this.editProcedencia.emit(this.form.get('procedencia').value.id);
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

    checkUnidadeProtocoloExterno(): void {
        const value = this.form.get('unidadeProtocoloExterno').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidadeProtocoloExterno').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setorAtual').setValue(setor);
        }
        this.activeCard = 'form';
    }

    selectUnidadeProtocoloExterno(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidadeProtocoloExterno').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    showUnidadeProtocoloExternoGrid(): void {
        this.activeCard = 'unidade-protocolo-externo-gridsearch';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showLogEntryGrid(target: string): void {

        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);

        this.activeCard = 'logentry-gridsearch';
    }

    checkProcesso(): void {

        const value = this.form.get('processoOrigem').value;

        if (!value || typeof value !== 'object') {
            this.form.get('processoOrigem').setValue(null);
        } else {
            this.form.get('especieProcesso').setValue(value.especieProcesso);
            this.form.get('modalidadeMeio').setValue(value.modalidadeMeio);
            this.form.get('classificacao').setValue(value.classificacao);
            this.form.get('titulo').setValue(value.titulo);
            this.form.get('descricao').setValue(value.descricao);
            this.form.get('setorAtual').setValue(value.setorAtual);
        }
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processoOrigem').setValue(processo);
            this.checkProcesso();
        }
        this.activeCard = 'form';
    }

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

    checkEspecieSetor(): void {
        const value = this.form.get('especieSetor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieSetor').setValue(null);
        }
    }

    selectEspecieSetor(generoSetor: GeneroSetor): void {
        if (generoSetor) {
            this.form.get('especieSetor').setValue(generoSetor);
        }
        this.activeCard = 'form';
    }

    showEspecieSetorGrid(): void {
        this.activeCard = 'especie-setor-gridsearch';
    }
}
