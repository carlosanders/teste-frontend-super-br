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
import {Tarefa} from '@cdk/models/tarefa.model';
import {EspecieTarefa} from '@cdk/models/especie-tarefa.model';
import {Usuario} from '@cdk/models/usuario.model';
import {Processo} from '@cdk/models/processo.model';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Setor} from '@cdk/models/setor.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-tarefa-form',
    templateUrl: './cdk-tarefa-form.component.html',
    styleUrls: ['./cdk-tarefa-form.component.scss'],
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
export class CdkTarefaFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    tarefa: Tarefa;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    config: any;

    @Input()
    valid = true;

    @Output()
    save = new EventEmitter<Tarefa>();

    @Input()
    especieTarefaPagination: Pagination;

    @Input()
    processoPagination: Pagination;

    @Input()
    unidadeResponsavelPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    usuarioResponsavelPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    mode = 'regular';

    @Input()
    blocoEdit = {
        blocoEditEspecie: false,
        blocoEditDistribuicao: false,
        blocoEditInicioPrazo: false,
        blocoEditFinalPrazo: false,
        blocoEditUrgente: false,
        blocoEditObservacao: false
    };

    form: FormGroup;

    activeCard = 'form';

    processos: Processo[] = [];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            'id': [null],
            'blocoProcessos': [null],
            'processos': [null, [Validators.required]],
            'processo': [null],
            'urgente': [null, [Validators.required]],
            'especieTarefa': [null, [Validators.required]],
            'distribuicaoAutomatica': [null],
            'dataHoraInicioPrazo': [null, [Validators.required]],
            'dataHoraFinalPrazo': [null, [Validators.required]],
            'unidadeResponsavel': [null, [Validators.required]],
            'setorResponsavel': [null, [Validators.required]],
            'usuarioResponsavel': [null],
            'setorOrigem': [null, [Validators.required]],
            'observacao': [null, [Validators.maxLength(255)]]
        });

        this.processoPagination = new Pagination();
        this.processoPagination.populate = ['setorAtual'];
        this.especieTarefaPagination = new Pagination();
        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {'parent': 'isNull'};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.filter = {'parent': 'isNotNull'};
        this.usuarioResponsavelPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this.form.get('unidadeResponsavel').value) {
            this.form.get('setorResponsavel').enable();
        } else {
            this.form.get('setorResponsavel').disable();
            this.form.get('usuarioResponsavel').disable();
        }

        if (this.form.get('setorResponsavel').value) {
            this.form.get('usuarioResponsavel').enable();
        } else {
            this.form.get('usuarioResponsavel').disable();
        }

        this.form.get('distribuicaoAutomatica').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value) {
                        this.form.get('usuarioResponsavel').reset();
                        this.form.get('usuarioResponsavel').disable();
                    } else {
                        this.form.get('usuarioResponsavel').enable();
                    }
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidadeResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('setorResponsavel').enable();
                        this.form.get('setorResponsavel').reset();
                        this.form.get('usuarioResponsavel').reset();
                        this.form.get('usuarioResponsavel').disable();
                        this.setorResponsavelPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('usuarioResponsavel').enable();
                        this.form.get('usuarioResponsavel').reset();
                        this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
                        this._changeDetectorRef.markForCheck();
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
        if (changes['tarefa'] && this.tarefa && (!this.tarefa.id || (this.tarefa.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tarefa});

            if (this.tarefa.id) {
                this.form.get('processo').disable();
            } else {
                this.form.get('processo').enable();
            }

            if (!this.tarefa.id && this.tarefa.unidadeResponsavel) {
                this.form.get('setorResponsavel').enable();
                this.form.get('setorResponsavel').reset();
                this.form.get('usuarioResponsavel').reset();
                this.form.get('usuarioResponsavel').disable();
                this.setorResponsavelPagination.filter['unidade.id'] = `eq:${this.tarefa.unidadeResponsavel.id}`;
            }
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
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
            if (this.form.get('blocoProcessos').value) {
                this.form.get('processos').setValue(this.processos);
            }
            this.save.emit(this.form.value);
        }
    }

    checkEspecieTarefa(): void {
        const value = this.form.get('especieTarefa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieTarefa').setValue(null);
        }
    }

    deleteProcessos(processoId): void {
        this.processos = this.processos.filter(processo => processo.id !== processoId);
        this._changeDetectorRef.markForCheck();
    }

    selectEspecieTarefa(especieTarefa: EspecieTarefa): void {
        if (especieTarefa) {
            this.form.get('especieTarefa').setValue(especieTarefa);
        }
        this.activeCard = 'form';
    }

    showEspecieTarefaGrid(): void {
        this.activeCard = 'especie-tarefa-gridsearch';
    }

    checkUsuarioResponsavel(): void {
        const value = this.form.get('usuarioResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuarioResponsavel').setValue(null);
        }
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuarioResponsavel').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
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

    selectUnidadeResponsavel(setor: Setor): void {
        if (setor) {
            this.form.get('unidadeResponsavel').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidadeResponsavel(): void {
        const value = this.form.get('unidadeResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidadeResponsavel').setValue(null);
        }
    }

    showUnidadeResponsavelGrid(): void {
        this.activeCard = 'unidade-gridsearch';
    }

    selectSetorResponsavel(setor: Setor): void {
        if (setor) {
            this.form.get('setorResponsavel').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkSetorResponsavel(): void {
        const value = this.form.get('setorResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorResponsavel').setValue(null);
        }
    }

    showSetorResponsavelGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    selectSetorOrigem(setor: Setor): void {
        if (setor) {
            this.form.get('setorOrigem').setValue(setor);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
