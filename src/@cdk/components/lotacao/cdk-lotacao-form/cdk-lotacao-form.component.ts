import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination} from '@cdk/models/pagination';
import {Colaborador, Lotacao, Setor, Usuario} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-lotacao-form',
    templateUrl: './cdk-lotacao-form.component.html',
    styleUrls: ['./cdk-lotacao-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLotacaoFormComponent implements OnChanges, OnInit, OnDestroy {

    @Input()
    lotacao: Lotacao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    colaboradorPagination: Pagination;

    @Input()
    displayedColumnsGridSetor = ['id', 'nome', 'sigla', 'actions'];

    @Input()
    setorPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<Lotacao>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    usuario: Usuario;

    @Input()
    setor: Setor;

    form: FormGroup;

    activeCard = 'form';

    @Input()
    unidadePagination: Pagination;

    inputSetor = true;

    inputArquivista = false;

    @Input()
    isCoordenador = true;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
       this.form = this._formBuilder.group({
            id: [null],
            colaborador: [null, [Validators.required]],
            unidade: [null, [Validators.required]],
            setor: [null, [Validators.required]],
            principal: [null],
            distribuidor: [null],
            arquivista: [null],
            peso: ['100', [Validators.required]],
            centenasDistribuicao: [null],
            digitosDistribuicao: [null]
        });
       this.colaboradorPagination = new Pagination();
       this.unidadePagination = new Pagination();
       this.unidadePagination.filter = {parent: 'isNull'};
       this.setorPagination = new Pagination();
       this.setorPagination.filter = {parent: 'isNotNull'};

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    // tslint:disable-next-line:typedef
    ngOnInit() {
        if (!this.form.get('unidade').value) {
            this.form.get('setor').disable();
        }

        this.form.get('unidade').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('setor').enable();
                        this.form.get('setor').reset();
                        this.setorPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorPagination.filter['parent'] = 'isNotNull';
                        this.inputSetor = false;
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setor').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        if (this.form.get('setor').value.especieSetor.nome === 'ARQUIVO') {
                            this.inputArquivista = true;
                            this._changeDetectorRef.markForCheck();
                        }
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
        if (changes['lotacao'] && this.lotacao && ((!this.lotacao.id && !this.form.dirty) || (this.lotacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.lotacao});

            if (this.lotacao.setor) {
                this.form.get('unidade').setValue(this.lotacao.setor.unidade);

                if (this.lotacao.setor.especieSetor?.nome === 'ARQUIVO') {
                    this.inputArquivista = true;
                    this._changeDetectorRef.markForCheck();
                }
            }
        }

        if (this.usuario) {
            this.form.get('colaborador').setValue(this.usuario.colaborador);
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
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    checkColaborador(): void {
        const value = this.form.get('colaborador').value;
        if (!value || typeof value !== 'object') {
            this.form.get('colaborador').setValue(null);
        }
    }

    selectColaborador(colaborador: Colaborador): void {
        if (colaborador) {
            this.form.get('colaborador').setValue(colaborador);
        }
        this.activeCard = 'form';
    }

    showColaboradorGrid(): void {
        this.activeCard = 'colaborador-gridsearch';
    }

    checkSetor(): void {
        const value = this.form.get('setor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setor').setValue(setor);
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

    selectUnidade(setor: Setor): void {
        if (setor) {
            this.form.get('unidade').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidade(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    showUnidadeGrid(): void {
        this.activeCard = 'unidade-gridsearch';
    }

}
