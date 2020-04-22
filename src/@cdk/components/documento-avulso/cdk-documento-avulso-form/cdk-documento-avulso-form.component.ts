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
import {DocumentoAvulso} from '@cdk/models';
import {EspecieDocumentoAvulso} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {Processo} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Setor} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Pagination} from '@cdk/models';
import {Modelo} from '@cdk/models';
import {Pessoa} from '@cdk/models';

@Component({
    selector: 'cdk-documento-avulso-form',
    templateUrl: './cdk-documento-avulso-form.component.html',
    styleUrls: ['./cdk-documento-avulso-form.component.scss'],
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
export class CdkDocumentoAvulsoFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    documentoAvulso: DocumentoAvulso;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    config: any;

    @Input()
    mode = 'regular';

    @Input()
    valid = true;

    @Output()
    save = new EventEmitter<DocumentoAvulso>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    especieDocumentoAvulsoPagination: Pagination;

    @Input()
    processoPagination: Pagination;

    @Input()
    unidadeResponsavelPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    usuarioResponsavelPagination: Pagination;

    @Input()
    modeloPagination: Pagination;

    @Input()
    setorDestinoPagination: Pagination;

    @Input()
    pessoaDestinoPagination: Pagination;

    form: FormGroup;

    activeCard = 'form';

    processos: Processo[] = [];

    @Output()
    gerirPessoaDestino = new EventEmitter();

    @Output()
    editPessoaDestino = new EventEmitter<number>();

    @Input()
    pessoaDestino: Pessoa;

    inputModelo: boolean;
    inputProcesso: boolean;


    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            blocoProcessos: [null],
            processos: [null],
            processo: [null],
            tarefaOrigem: [null],
            urgente: [null],
            especieDocumentoAvulso: [null, [Validators.required]],
            modelo: [null, [Validators.required]],
            dataHoraInicioPrazo: [null, [Validators.required]],
            externa: [null],
            dataHoraFinalPrazo: [null, [Validators.required]],
            setorDestino: [null, [Validators.required]],
            pessoaDestino: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]]
        });

        this.processoPagination = new Pagination();
        this.especieDocumentoAvulsoPagination = new Pagination();
        this.modeloPagination = new Pagination();
        this.pessoaDestinoPagination = new Pagination();
        this.setorDestinoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('pessoaDestino').reset();
        this.form.get('pessoaDestino').disable();

        this.form.get('externa').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value) {
                        this.form.get('setorDestino').reset();
                        this.form.get('setorDestino').disable();
                        this.form.get('pessoaDestino').enable();
                    } else {
                        this.form.get('pessoaDestino').reset();
                        this.form.get('pessoaDestino').disable();
                        this.form.get('setorDestino').enable();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('processo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object' && this.form.get('blocoProcessos').value) {
                        this.processos.push(value);
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        if (changes['documentoAvulso'] && this.documentoAvulso && (!this.documentoAvulso.id || (this.documentoAvulso.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.documentoAvulso});

            if (this.documentoAvulso.id) {
                this.inputProcesso = true;
                this.inputModelo = true;
                this.form.get('pessoaDestino').disable();
                this.form.get('setorDestino').disable();
                this.form.get('externa').disable();
            }
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
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

        if (changes['pessoaDestino'] && this.pessoaDestino) {
            this.form.get('pessoaDestino').setValue(this.pessoaDestino);
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
            if (this.form.get('blocoProcessos').value) {
                this.form.get('processos').setValue(this.processos);
            }
            this.save.emit(this.form.value);
        }
    }

    deleteProcessos(processoId): void {
        this.processos = this.processos.filter(processo => processo.id !== processoId);
        this._changeDetectorRef.markForCheck();
    }

    checkEspecieDocumentoAvulso(): void {
        const value = this.form.get('especieDocumentoAvulso').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieDocumentoAvulso').setValue(null);
        }
    }

    selectEspecieDocumentoAvulso(especieDocumentoAvulso: EspecieDocumentoAvulso): void {
        if (especieDocumentoAvulso) {
            this.form.get('especieDocumentoAvulso').setValue(especieDocumentoAvulso);
        }
        this.activeCard = 'form';
    }

    showEspecieDocumentoAvulsoGrid(): void {
        this.activeCard = 'especie-documento-avulso-gridsearch';
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

    checkPessoaDestino(): void {
        const value = this.form.get('pessoaDestino').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pessoaDestino').setValue(null);
        }
    }

    selectPessoaDestino(pessoaDestino: Pessoa): void {
        if (pessoaDestino) {
            this.form.get('pessoaDestino').setValue(pessoaDestino);
        }
        this.activeCard = 'form';
    }

    doGerirPessoaDestino(): void {
        this.gerirPessoaDestino.emit();
    }

    doEditPessoaDestino(): void {
        this.editPessoaDestino.emit(this.form.get('pessoaDestino').value.id);
    }

    checkSetorDestino(): void {
        const value = this.form.get('setorDestino').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorDestino').setValue(null);
        }
    }

    selectSetorDestino(setorDestino: Setor): void {
        if (setorDestino) {
            this.form.get('setorDestino').setValue(setorDestino);
        }
        this.activeCard = 'form';
    }

    showSetorDestinoGrid(): void {
        this.activeCard = 'setor-destino-gridsearch';
    }

    checkModelo(): void {
        const value = this.form.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modelo').setValue(null);
        }
    }

    selectModelo(modelo: Modelo): void {
        if (modelo) {
            this.form.get('modelo').setValue(modelo);
        }
        this.activeCard = 'form';
    }

    showModeloGrid(): void {
        this.activeCard = 'modelo-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
