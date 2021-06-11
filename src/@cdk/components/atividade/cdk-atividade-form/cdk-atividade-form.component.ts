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
import {Atividade, DocumentoAvulso, EspecieAtividade, Pagination, Setor, Usuario} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FavoritoService} from '@cdk/services/favorito.service';

@Component({
    selector: 'cdk-atividade-form',
    templateUrl: './cdk-atividade-form.component.html',
    styleUrls: ['./cdk-atividade-form.component.scss'],
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
export class CdkAtividadeFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    atividade: Atividade;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    @Input()
    destinacaoMinutas = 'juntar';

    @Input()
    errors: any;

    @Input()
    mode = 'horizontal';

    @Output()
    save = new EventEmitter<Atividade>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    especieAtividadePagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    usuarioAprovacaoPagination: Pagination;

    @Input()
    setorAprovacaoPagination: Pagination;

    @Input()
    unidadeAprovacaoPagination: Pagination;

    @Input()
    temMinutas = false;

    @Input()
    documentoAvulsoVinculado: DocumentoAvulso;

    form: FormGroup;

    activeCard = 'form';

    especieAtividadeList: EspecieAtividade[] = [];

    especieAtividadeListIsLoading: boolean;

    unidadeAprovacaoList: Setor[] = [];

    unidadeAprovacaoListIsLoading: boolean;

    setorAprovacaoList: Setor[] = [];

    setorAprovacaoListIsLoading: boolean;

    usuarioAprovacaoList: Usuario[] = [];

    usuarioAprovacaoListIsLoading: boolean;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            encerraTarefa: [null],
            destinacaoMinutas: [null],
            respostaDocumentoAvulso: [null],
            especieAtividade: [null, [Validators.required]],
            dataHoraConclusao: [null, [Validators.required]],
            usuario: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            documento: [null],
            tarefa: [null],
            unidadeAprovacao: [null, [Validators.required]],
            setorAprovacao: [null, [Validators.required]],
            usuarioAprovacao: [null, [Validators.required]]
        });

        this.especieAtividadePagination = new Pagination();
        this.usuarioPagination = new Pagination();
        this.usuarioAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination.filter = {parent: 'isNull'};
        this.setorAprovacaoPagination = new Pagination();
        this.setorAprovacaoPagination.filter = {parent: 'isNotNull'};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.form.get('destinacaoMinutas').setValue(this.destinacaoMinutas);

        this.form.get('unidadeAprovacao').disable();
        this.form.get('setorAprovacao').disable();
        this.form.get('usuarioAprovacao').disable();

        this.form.get('destinacaoMinutas').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value === 'submeter_aprovacao') {
                        this.form.get('unidadeAprovacao').enable();
                    } else {
                        this.form.get('unidadeAprovacao').reset();
                        this.form.get('unidadeAprovacao').disable();
                        this.form.get('setorAprovacao').reset();
                        this.form.get('setorAprovacao').disable();
                        this.form.get('usuarioAprovacao').reset();
                        this.form.get('usuarioAprovacao').disable();
                    }
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('unidadeAprovacao').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('setorAprovacao').enable();
                        this.form.get('setorAprovacao').reset();
                        this.form.get('usuarioAprovacao').reset();
                        this.form.get('usuarioAprovacao').disable();
                        this.setorAprovacaoPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorAprovacao').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.form.get('usuarioAprovacao').enable();
                        this.form.get('usuarioAprovacao').reset();
                        this.usuarioAprovacaoPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
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
        if (changes['atividade'] && this.atividade && (!this.atividade.id || (this.atividade.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.atividade});
            this.form.get('destinacaoMinutas').setValue(this.destinacaoMinutas);
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

    checkEspecieAtividade(): void {
        const value = this.form.get('especieAtividade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieAtividade').setValue(null);
        }
    }

    selectEspecieAtividade(especieAtividade: EspecieAtividade): void {
        if (especieAtividade) {
            this.form.get('especieAtividade').setValue(especieAtividade);
        }
        this.activeCard = 'form';
    }

    showEspecieAtividadeGrid(): void {
        this.activeCard = 'especie-atividade-gridsearch';
    }

    checkUsuario(): void {
        const value = this.form.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuario').setValue(null);
        }
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuario').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    checkUsuarioAprovacao(): void {
        const value = this.form.get('usuarioAprovacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuarioAprovacao').setValue(null);
        }
    }

    selectUsuarioAprovacao(usuarioAprovacao: Usuario): void {
        if (usuarioAprovacao) {
            this.form.get('usuarioAprovacao').setValue(usuarioAprovacao);
        }
        this.activeCard = 'form';
    }

    showUsuarioAprovacaoGrid(): void {
        this.activeCard = 'usuario-aprovacao-gridsearch';
    }

    checkSetorAprovacao(): void {
        const value = this.form.get('setorAprovacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorAprovacao').setValue(null);
        }
    }

    selectSetorAprovacao(setorAprovacao: Setor): void {
        if (setorAprovacao) {
            this.form.get('setorAprovacao').setValue(setorAprovacao);
        }
        this.activeCard = 'form';
    }

    showSetorAprovacaoGrid(): void {
        this.activeCard = 'setor-aprovacao-gridsearch';
    }

    selectUnidadeAprovacao(setor: Setor): void {
        if (setor) {
            this.form.get('unidadeAprovacao').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkUnidadeAprovacao(): void {
        const value = this.form.get('unidadeAprovacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidadeAprovacao').setValue(null);
        }
    }

    showUnidadeAprovacaoGrid(): void {
        this.activeCard = 'unidade-aprovacao-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    getFavoritosEspecieAtividade(): void {
        this.especieAtividadeListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\EspecieAtividade',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id + '_especie_atividade'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.especieAtividadePagination.populate)
        ).pipe(
            finalize(() => this.especieAtividadeListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.especieAtividadeList = [];
                response['entities'].forEach((favorito) => {
                    this.especieAtividadeList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosUnidadeAprovacao(): void {
        this.unidadeAprovacaoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id + '_unidade_aprovacao'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.unidadeAprovacaoPagination.populate)
        ).pipe(
            finalize(() => this.unidadeAprovacaoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.unidadeAprovacaoList = [];
                response['entities'].forEach((favorito) => {
                    this.unidadeAprovacaoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosSetorAprovacao(): void {
        this.setorAprovacaoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id + '_setor_aprovacao_unidade_' +
                    this.form.get('unidadeAprovacao').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.setorAprovacaoPagination.populate)
        ).pipe(
            finalize(() => this.setorAprovacaoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.setorAprovacaoList = [];
                response['entities'].forEach((favorito) => {
                    this.setorAprovacaoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosUsuarioAprovacao(): void {
        this.usuarioAprovacaoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Usuario',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id + '_usuario_aprovacao_setor_' +
                    this.form.get('setorAprovacao').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.usuarioAprovacaoPagination.populate)
        ).pipe(
            finalize(() => this.usuarioAprovacaoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.usuarioAprovacaoList = [];
                response['entities'].forEach((favorito) => {
                    this.usuarioAprovacaoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

}
