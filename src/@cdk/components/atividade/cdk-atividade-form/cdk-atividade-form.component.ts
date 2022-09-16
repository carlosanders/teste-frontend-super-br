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
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    Atividade,
    Colaborador,
    DocumentoAvulso,
    EspecieAtividade,
    Lotacao,
    Pagination,
    Setor,
    Tarefa,
    Usuario
} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FavoritoService} from '@cdk/services/favorito.service';
import {SetorService} from '@cdk/services/setor.service';
import {LoginService} from 'app/main/auth/login/login.service';
import * as _ from 'lodash';

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
    lixeiraMinutas: boolean = false;

    @Input()
    mode = 'horizontal';

    @Input()
    actions: string[] = ['save', 'abort'];

    @Output()
    save = new EventEmitter<Atividade>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() abort = new EventEmitter<any>();

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
    unidadeResponsavelPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    usuarioResponsavelPagination: Pagination;

    @Input()
    temMinutas = false;

    @Input()
    documentoAvulsoVinculado: DocumentoAvulso;

    @Input()
    blocoTarefasFavorito: Tarefa[] = [];

    @Output()
    changeEncerramentoTarefa: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
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
    unidadeResponsavelList: Setor[] = [];
    unidadeResponsavelListIsLoading: boolean;
    setorResponsavelList: Setor[] = [];
    setorResponsavelListIsLoading: boolean;
    usuarioResponsavelList: Usuario[] = [];
    usuarioResponsavelListIsLoading: boolean;

    private _profile: Colaborador;


    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService,
        private _setorService: SetorService,
        private _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile().colaborador;

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
            usuarioAprovacao: [null, [Validators.required]],
            unidadeResponsavel: [null, [Validators.required]],
            setorResponsavel: [null, [Validators.required]],
            usuarioResponsavel: [null],
            distribuicaoAutomatica: [null],
        });

        this.especieAtividadePagination = new Pagination();
        this.usuarioPagination = new Pagination();
        this.usuarioAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination.filter = {parent: 'isNull'};
        this.setorAprovacaoPagination = new Pagination();
        this.setorAprovacaoPagination.filter = {parent: 'isNotNull'};
        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {parent: 'isNull'};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade'];
        this.setorResponsavelPagination.filter = {parent: 'isNotNull'};
        this.usuarioResponsavelPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
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

        if (!this.atividade?.tarefa?.vinculacaoWorkflow || this.atividade?.tarefa?.vinculacaoWorkflow?.transicaoFinalWorkflow === true) {
            this.form.get('unidadeResponsavel').disable();
            this.form.get('setorResponsavel').disable();
            this.form.get('usuarioResponsavel').disable();
            this.form.get('distribuicaoAutomatica').disable();
        } else {
            if (this.form.get('unidadeResponsavel').value) {
                this.form.get('setorResponsavel').enable();
                this.setorResponsavelPagination.filter['unidade.id'] = `eq:${this.form.get('unidadeResponsavel').value.id}`;
                this.setorResponsavelPagination.filter['parent'] = 'isNotNull';
            } else {
                this.form.get('setorResponsavel').disable();
                this.form.get('usuarioResponsavel').disable();
            }

            if (this.form.get('setorResponsavel')?.value) {
                this.form.get('usuarioResponsavel').enable();
                this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
            } else {
                this.form.get('usuarioResponsavel').disable();
            }

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
                            this.setorResponsavelPagination.filter['parent'] = 'isNotNull';

                            const unidadesId = [];

                            this._profile.lotacoes.forEach((lotacao: Lotacao) => {
                                unidadesId.push(lotacao.setor.unidade.id);
                            });

                            if (value.apenasProtocolo && unidadesId.indexOf(value.id) === -1) {
                                this.form.get('distribuicaoAutomatica').setValue(true);
                                this.form.get('setorResponsavel').enable();
                                this.getSetorProtocolo();
                            }

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
                        delete this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.apenasDistribuidor'];

                        // criacao normal de tarefa sem distribuicao automatica
                        if (value && typeof value === 'object' && !this.form.get('distribuicaoAutomatica').value) {
                            this.form.get('usuarioResponsavel').enable();
                            this.form.get('usuarioResponsavel').reset();
                            this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
                        }

                        // Adiciona contexto para marcar usuários que estão afastados impedindo seleção
                        this.usuarioResponsavelPagination['context'] = {semAfastamento: true};

                        // Adicionar filtro de coloboradores que são apenas distribuidor lotados no setor
                        if (typeof value === 'object' && value && value.apenasDistribuidor) {
                            const lotacoes = this._profile.lotacoes.filter(lotacao => lotacao.setor.id === parseInt(value.id, 10));
                            if (lotacoes.length === 0) {
                                this.usuarioResponsavelPagination['context'].setorApenasDistribuidor = value.id;
                            }
                        }

                        this._changeDetectorRef.markForCheck();

                        return of([]);
                    }
                )
            ).subscribe();

            this.form.get('distribuicaoAutomatica').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {
                        if (value) {
                            this.form.get('usuarioResponsavel').disable();
                        } else {
                            this.form.get('usuarioResponsavel').enable();
                        }

                        this.form.get('usuarioResponsavel').reset();
                        this._changeDetectorRef.markForCheck();

                        return of([]);
                    }
                )
            ).subscribe();
        }

        this.form.get('encerraTarefa').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                this.form.get('unidadeResponsavel').reset();
                this.form.get('setorResponsavel').reset();
                this.form.get('usuarioResponsavel').reset();
                this.form.get('distribuicaoAutomatica').reset();

                if (!this.atividade?.tarefa?.vinculacaoWorkflow || this.atividade?.tarefa?.vinculacaoWorkflow?.transicaoFinalWorkflow === true) {
                    this.form.get('unidadeResponsavel').disable();
                    this.form.get('setorResponsavel').disable();
                    this.form.get('usuarioResponsavel').disable();
                    this.form.get('distribuicaoAutomatica').disable();
                } else if (value) {
                    this.form.get('unidadeResponsavel').enable();
                    this.form.get('distribuicaoAutomatica').enable();
                } else {
                    this.form.get('unidadeResponsavel').disable();
                    this.form.get('setorResponsavel').disable();
                    this.form.get('usuarioResponsavel').disable();
                    this.form.get('distribuicaoAutomatica').disable();
                }

                this.changeEncerramentoTarefa.emit(value);
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();

    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['atividade'] && this.atividade && (!this.atividade.id || (this.atividade.tarefa.id !== this.form.get('tarefa').value.id))) {
            this.form.reset();
            this.form.patchValue({...this.atividade});
            this.ajustaDestinacao();
            this.changeEncerramentoTarefa.emit(this.atividade.encerraTarefa);
        } else {
            if (changes['temMinutas']) {
                this.ajustaDestinacao();
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

        if (!this.errors && !changes['temMinutas'] && !changes['lixeiraMinutas']) {
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

    ajustaDestinacao(): void {
        if (!this.temMinutas) {
            this.form.get('destinacaoMinutas').setValue('juntar');
            this.form.get('unidadeAprovacao').disable();
        } else {
            if (this.destinacaoMinutas === 'submeter_aprovacao') {
                this.form.get('unidadeAprovacao').enable();
            } else {
                this.form.get('unidadeAprovacao').disable();
            }
            this.form.get('destinacaoMinutas').setValue(this.destinacaoMinutas); //destinação minutas padrão
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    getSetorProtocolo(): void {
        this._setorService.query(
            JSON.stringify({
                'unidade.id': `eq:${this.form.get('unidadeResponsavel').value.id}`,
                'parent': 'isNotNull', 'nome': 'eq:PROTOCOLO'
            }),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify(['unidade', 'parent'])
        ).pipe(
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                response['entities'].forEach((setor) => {
                    this.form.get('setorResponsavel').setValue(setor);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    checkAutocomplete(formEl: AbstractControl): void {
        if (!formEl.value || !_.isObject(formEl.value)) {
            formEl.setValue(null);
        }
    }

    changeActiveCard(activeCard: string): void
    {
        this.activeCard = activeCard;
    }

    selectFormElementValue(formEl:AbstractControl, value: any): void {
        if (value) {
            formEl.setValue(value);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    getFavoritosEspecieAtividade(): void {
        let especieTarefaIdFavorito = 0;
        if (this.atividade && this.atividade.tarefa) {
            especieTarefaIdFavorito = this.atividade.tarefa.especieTarefa.id;
        }
        if (this.blocoTarefasFavorito && this.blocoTarefasFavorito.length > 0) {
            especieTarefaIdFavorito = this.blocoTarefasFavorito[0].especieTarefa.id;
        }

        this.especieAtividadeListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\EspecieAtividade',
                context: 'eq:atividade_' + especieTarefaIdFavorito + '_especie_atividade'
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
        const favoritosUnidadeAprovacao = this.blocoTarefasFavorito[0]?.especieTarefa ? this.blocoTarefasFavorito[0].especieTarefa.id : this.atividade.tarefa.especieTarefa.id;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:atividade_' + favoritosUnidadeAprovacao + '_unidade_aprovacao'
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

    getFavoritosUnidadeResponsavel(): void {
        this.unidadeResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id + '_unidade_responsavel'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.unidadeResponsavelPagination.populate)
        ).pipe(
            finalize(() => this.unidadeResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.unidadeResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.unidadeResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosSetorResponsavel(): void {
        this.setorResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id +
                    '_setor_responsavel_unidade_' + this.form.get('unidadeResponsavel').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.setorResponsavelPagination.populate)
        ).pipe(
            finalize(() => this.setorResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.setorResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.setorResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosUsuarioResponsavel(): void {
        this.usuarioResponsavelListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Usuario',
                context: 'eq:atividade_' + this.atividade.tarefa.especieTarefa.id +
                    '_usuario_responsavel_setor_' + this.form.get('setorResponsavel').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.usuarioResponsavelPagination.populate)
        ).pipe(
            finalize(() => this.usuarioResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.usuarioResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.usuarioResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

}
