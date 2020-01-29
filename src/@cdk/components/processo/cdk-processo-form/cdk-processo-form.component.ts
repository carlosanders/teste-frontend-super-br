import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Processo} from '@cdk/models/processo.model';
import {EspecieProcesso} from '@cdk/models/especie-processo.model';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {ModalidadeFase} from '@cdk/models/modalidade-fase.model';
import {ModalidadeMeio} from '@cdk/models/modalidade-meio.model';
import {Classificacao} from '@cdk/models/classificacao.model';
import {Setor} from '@cdk/models/setor.model';
import {Pagination} from '@cdk/models/pagination';
import {Pessoa} from '@cdk/models/pessoa.model';

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

    @Output()
    save = new EventEmitter<Processo>();

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

    form: FormGroup;

    activeCard = 'form';

    exibeProcessoOrigem = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            aproveitarDados: [null],
            processoOrigem: [null, [Validators.required, Validators.maxLength(21)]],
            NUP: [null, [Validators.required, Validators.maxLength(21)]],
            novo: [null, [Validators.required]],
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
            dataHoraAbertura: [null, [Validators.required]],
//            salvar: [null],

        });

        this.especieProcessoPagination = new Pagination();
        this.procedenciaPagination = new Pagination();
        this._classificacaoPagination = new Pagination();
        this.modalidadeMeioPagination = new Pagination();
        this.modalidadeFasePagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.processoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        if (!this.processo.id) {
            this.form.get('dataHoraAbertura').setValue(null);
            this.form.get('dataHoraAbertura').disable();

            this.form.get('aproveitarDados').valueChanges.subscribe(value => {

                if (!this.exibeProcessoOrigem) {
                    this.exibeProcessoOrigem = true;

                    this.form.controls['processoOrigem'].setValidators([Validators.required, Validators.maxLength(21)]);

                    this.form.controls['NUP'].setValidators([Validators.nullValidator]);
                    this.form.controls['novo'].setValidators([Validators.nullValidator]);
                    this.form.controls['especieProcesso'].setValidators(Validators.nullValidator);
                    this.form.controls['titulo'].setValidators([Validators.nullValidator]);
                    this.form.controls['descricao'].setValidators([Validators.nullValidator]);
                    this.form.controls['outroNumero'].setValidators([Validators.nullValidator]);
                    this.form.controls['classificacao'].setValidators([Validators.nullValidator]);
                    this.form.controls['procedencia'].setValidators([Validators.nullValidator]);
                    this.form.controls['setorAtual'].setValidators([Validators.nullValidator]);
                    this.form.controls['modalidadeMeio'].setValidators([Validators.nullValidator]);
                    this.form.controls['dataHoraAbertura'].setValidators([Validators.nullValidator]);
                    //this.form.controls['salvar'].setValidators([Validators.nullValidator]);



                    /*                    this.form.addControl('processoOrigem', new FormControl('', Validators.required));


                                        this.form.removeControl('NUP');
                                        this.form.removeControl('novo');
                                        this.form.removeControl('especieProcesso');
                                        this.form.removeControl('titulo');
                                        this.form.removeControl('classificacao');
                                        this.form.removeControl('procedencia');
                                        this.form.removeControl('setorAtual');
                                        this.form.removeControl('modalidadeMeio');
                                        this.form.removeControl('dataHoraAbertura');*/
                }
                else {
                    this.exibeProcessoOrigem = false;

                    this.form.controls['processoOrigem'].setValidators([Validators.nullValidator]);

                    this.form.controls['NUP'].setValidators([Validators.required, Validators.maxLength(21)]);
                    this.form.controls['novo'].setValidators([Validators.required]);
                    this.form.controls['especieProcesso'].setValidators([Validators.required]);
                    this.form.controls['titulo'].setValidators([Validators.required, Validators.required, Validators.maxLength(255)]);
                    this.form.controls['descricao'].setValidators([Validators.maxLength(255)]);
                    this.form.controls['outroNumero'].setValidators([Validators.maxLength(255)]);
                    this.form.controls['classificacao'].setValidators([Validators.required]);
                    this.form.controls['procedencia'].setValidators([Validators.required]);
                    this.form.controls['setorAtual'].setValidators([Validators.required]);
                    this.form.controls['modalidadeMeio'].setValidators([Validators.required]);
                    this.form.controls['dataHoraAbertura'].setValidators([Validators.required]);
//                    this.form.controls['salvar'].setValidators([Validators.nullValidator]);

/*                    processoOrigem: [null, [Validators.required, Validators.maxLength(21)]],
                        NUP: [null, [Validators.required, Validators.maxLength(21)]],
                        novo: [null, [Validators.required]],
                        especieProcesso: [null, [Validators.required]],
                        titulo: [null, [Validators.required, Validators.required, Validators.maxLength(255)]],
                        descricao: [null, [Validators.maxLength(255)]],
                        outroNumero: [null, [Validators.maxLength(255)]],
                        classificacao: [null, [Validators.required]],
                        procedencia: [null, [Validators.required]],
                        setorAtual: [null, [Validators.required]],
                        modalidadeMeio: [null, [Validators.required]],
                        dataHoraAbertura: [null, [Validators.required]],*/


/*                    this.form.addControl('NUP', new FormControl('', Validators.required));
                    this.form.addControl('novo', new FormControl('', Validators.required));
                    this.form.addControl('especieProcesso', new FormControl('', Validators.required));
                    this.form.addControl('titulo', new FormControl('', Validators.required));
                    this.form.addControl('classificacao', new FormControl('', Validators.required));
                    this.form.addControl('procedencia', new FormControl('', Validators.required));
                    this.form.addControl('setorAtual', new FormControl('', Validators.required));
                    this.form.addControl('modalidadeMeio', new FormControl('', Validators.required));
                    this.form.addControl('dataHoraAbertura', new FormControl('', Validators.required));

                    this.form.removeControl('processoOrigem');*/
                }
            });

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

    showLogEntryGrid(target: string): void {

        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);

        this.activeCard = 'logentry-gridsearch';
    }

    checkProcesso(): void {
        const value = this.form.get('processoOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processoOrigem').setValue(null);
        }
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processoOrigem').setValue(processo);
        }
        this.activeCard = 'form';
    }

}
