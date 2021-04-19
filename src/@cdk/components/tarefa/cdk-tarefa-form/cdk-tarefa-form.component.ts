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
import {Colaborador, GrupoContato, Lotacao, Tarefa} from '@cdk/models';
import {EspecieTarefa} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {Processo} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Setor} from '@cdk/models';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Pagination} from '@cdk/models';
import {FavoritoService} from '@cdk/services/favorito.service';
import {Responsavel} from '@cdk/models';
import {SetorService} from '@cdk/services/setor.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-tarefa-form',
    templateUrl: './cdk-tarefa-form.component.html',
    styleUrls: ['./cdk-tarefa-form.component.scss'],
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

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    especieTarefaPagination: Pagination;

    @Input()
    processoPagination: Pagination;

    @Input()
    unidadeResponsavelPagination: Pagination;

    @Input()
    setorResponsavelPagination: Pagination;

    @Input()
    setorOrigemPaginationTree: Pagination;

    @Input()
    usuarioResponsavelPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    grupoContatoPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    especieTarefaList: EspecieTarefa[] = [];

    especieTarefaListIsLoading: boolean;

    usuarioResponsavelList: Usuario[] = [];

    usuarioResponsavelListIsLoading: boolean;

    setorResponsavelList: Setor[] = [];

    setorResponsavelListIsLoading: boolean;

    unidadeResponsavelList: Setor[] = [];

    unidadeResponsavelListIsLoading: boolean;

    @Input()
    mode = 'regular';

    inputProcesso: boolean;

    feriados = ['01-01', '21-04', '01-05', '07-09', '12-10', '02-11', '15-11', '25-12'];

    evento = false;

    editable = true;

    _profile: Colaborador;

    @Input()
    blocoEdit = {
        blocoEditEspecie: false,
        blocoEditDistribuicao: false,
        blocoEditInicioPrazo: false,
        blocoEditFinalPrazo: false,
        blocoEditUrgente: false,
        blocoEditObservacao: false
    };

    @Input()
    form: FormGroup;

    activeCard = 'form';

    processos: Processo[] = [];
    blocoResponsaveis: Responsavel[] = [];

    @Output()
    processo = new EventEmitter<Processo>();

    generoProcessos: any[] = [];

    @Input()
    clearForm = false;

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
            diasUteis: [null],
            prazoDias: [null],
            blocoProcessos: [null],
            processos: [null],
            processo: [null, [Validators.required]],
            urgente: [null],
            especieTarefa: [null, [Validators.required]],
            distribuicaoAutomatica: [null],
            dataHoraInicioPrazo: [null, [Validators.required]],
            dataHoraFinalPrazo: [null, [Validators.required]],
            unidadeResponsavel: [null, [Validators.required]],
            setorResponsavel: [null, [Validators.required]],
            usuarioResponsavel: [null],
            blocoResponsaveis: [null],
            grupoContato: [null],
            usuarios: [null],
            setores: [null],
            setorOrigem: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            localEvento: [null, [Validators.maxLength(255)]]
        });

        this.processoPagination = new Pagination();
        this.processoPagination.populate =
            ['especieProcesso', 'especieProcesso.generoProcesso',
                'especieProcesso.workflow', 'setorAtual', 'setorAtual.unidade'
                , 'especieProcesso.workflow.especieTarefaInicial',
                'tarefaAtualWorkflow', 'tarefaAtualWorkflow.especieTarefa'];
        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {parent: 'isNull'};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.populate = ['unidade'];
        this.setorResponsavelPagination.filter = {parent: 'isNotNull'};
        this.usuarioResponsavelPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPaginationTree = new Pagination();
        this.grupoContatoPagination = new Pagination();
        this.grupoContatoPagination.populate = [
            'contatos',
            'contatos.tipoContato',
            'contatos.setor',
            'contatos.setor.unidade',
            'contatos.usuario',
            'contatos.usuario.colaborador',
            'contatos.usuario.colaborador.lotacoes',
            'contatos.usuario.colaborador.lotacoes.setor',
            'contatos.usuario.colaborador.lotacoes.setor.unidade',
        ];
        this.grupoContatoPagination.filter = {'usuario.id': 'eq:'+this._loginService.getUserProfile().id};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.evento = false;

        if (this.form.get('processo').value && this.form.get('processo').value.NUP && this.form.get('processo').value.especieProcesso?.generoProcesso) {
            this.form.get('especieTarefa').enable();
            if (this.form.get('processo').value.especieProcesso.generoProcesso.nome === 'ADMINISTRATIVO') {
                this.especieTarefaPagination.filter = {'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO'};
            } else {
                this.especieTarefaPagination.filter = {
                    'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO,' +
                        this.form.get('processo').value.especieProcesso.generoProcesso.nome.toUpperCase()
                };
            }
            if (this.form.get('processo').value.especieProcesso?.workflow) {
                this.addFilterProcessoWorfkflow();
            }
        } else {
            if (this.mode !== 'bloco-edit') {
                this.form.get('especieTarefa').disable();
            }
        }

        if (this.mode === 'bloco-create') {
            this.form.get('especieTarefa').enable();
        }

        if (this.blocoEdit.blocoEditEspecie) {
            this.form.get('especieTarefa').enable();
        }

        if (this.form.get('unidadeResponsavel').value) {
            this.form.get('setorResponsavel').enable();
            this.setorResponsavelPagination.filter['unidade.id'] = `eq:${this.form.get('unidadeResponsavel').value.id}`;
            this.setorResponsavelPagination.filter['parent'] = `isNotNull`;
        } else {
            this.form.get('setorResponsavel').disable();
            this.form.get('usuarioResponsavel').disable();
        }

        if (this.form.get('setorResponsavel').value) {
            this.form.get('usuarioResponsavel').enable();
            this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
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
                    if (value && this.blocoResponsaveis) {
                        this.blocoResponsaveis = [];
                    }

                    if (this.form.get('setorResponsavel').value) {
                        delete this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.apenasDistribuidor'];
                        this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${this.form.get('setorResponsavel').value.id}`;
                        // Adicionar filtro de coloboradores que são apenas distribuidor lotados no setor
                        if (this.form.get('setorResponsavel').value.apenasDistribuidor) {
                            let lotacoes = this._profile.lotacoes.filter(lotacao => lotacao.setor.id == this.form.get('setorResponsavel').value.id)
                            if (lotacoes.length === 0) {
                                this.usuarioResponsavelPagination['context'].setorApenasDistribuidor = this.form.get('setorResponsavel').value.id;
                            }
                        }
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
                        // this.form.get('distribuicaoAutomatica').reset();
                        this.setorResponsavelPagination.filter['unidade.id'] = `eq:${value.id}`;
                        this.setorResponsavelPagination.filter['parent'] = `isNotNull`;
                        this.editable = true;

                        const unidadesId = [];
                        this._profile.lotacoes.forEach((lotacao: Lotacao) => {
                            unidadesId.push(lotacao.setor.unidade.id);
                        });

                        if (value.apenasProtocolo && unidadesId.indexOf(value.id) === -1) {
                            this.form.get('distribuicaoAutomatica').setValue(true);
                            this.form.get('setorResponsavel').enable();
                            this.getSetorProtocolo();
                            this.editable = false;
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

                    // bloco de processos
                    if (this.form.get('blocoResponsaveis').value && this.form.get('distribuicaoAutomatica').value && typeof value === 'object' && value) {
                        const setor = this.form.get('setorResponsavel').value;
                        const usuario = this.form.get('usuarioResponsavel').value;

                        if (usuario) {
                            const findDuplicate = this.blocoResponsaveis.some(item => (item.setor.id === setor.id) && (item.usuario.id === usuario.id));
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        } else {
                            const findDuplicate = this.blocoResponsaveis.some(item => item.setor.id === setor.id);
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        }
                    }

                    // Adiciona contexto para marcar usuários que estão afastados impedindo seleção
                    this.usuarioResponsavelPagination['context'] = {semAfastamento: true};

                    // Adicionar filtro de coloboradores que são apenas distribuidor lotados no setor
                    if (typeof value === 'object' && value && value.apenasDistribuidor) {
                        let lotacoes = this._profile.lotacoes.filter(lotacao => lotacao.setor.id == value.id)
                        if (lotacoes.length === 0) {
                            this.usuarioResponsavelPagination['context'].setorApenasDistribuidor = value.id;
                        }
                    }

                    // se for bloco de redistribuicao libera controls
                    if (this.blocoEdit.blocoEditDistribuicao) {
                        this.clearValidators();
                    }

                    this._changeDetectorRef.markForCheck();

                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('processo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (this.form.get('blocoProcessos').value && typeof value === 'object' && value) {
                        // bloco de processo so pode ser realizado por processos do mesmo genero
                        if (this.processos.length > 0) {

                            this.form.controls['processo'].setErrors(null);

                            // caso seja o mesmo genero dos processos existentes
                            if (this.generoProcessos.find(genero =>
                                (genero === value.especieProcesso.generoProcesso.nome)
                            )) {
                                const findDuplicate = this.processos.some(item => (item.id === value.id));
                                if (!findDuplicate) {
                                    this.processos.push(value);
                                }
                            }

                            // caso nao seja o mesmo genero mas ainda é um genero que nao existe no array
                            if (this.generoProcessos.find(genero =>
                                (genero !== value.especieProcesso.generoProcesso.nome && this.generoProcessos.length === 0)
                            )) {
                                this.processos.push(value);
                                this.generoProcessos.push(value.especieProcesso.generoProcesso.nome);
                            }

                            // caso nao seja o mesmo genero e já existe generos iguais
                            if (this.generoProcessos.find(genero => genero !==
                                value.especieProcesso.generoProcesso.nome && this.generoProcessos.length > 0)) {
                                this.form.controls['processo'].setErrors({formError: 'Bloco de processos devem ser do mesmo gênero.'});
                            }
                        } else {
                            this.processos.push(value);
                            this.generoProcessos.push(value.especieProcesso.generoProcesso.nome);
                        }

                        this._changeDetectorRef.markForCheck();
                    }

                    if (value && typeof value === 'object') {
                        this.processo.emit(this.form.get('processo').value);
                        this.form.get('especieTarefa').enable();
                        if (this.form.get('processo').value.especieProcesso.generoProcesso.nome === 'ADMINISTRATIVO') {
                            this.especieTarefaPagination.filter = {'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO'};
                        } else {
                            this.especieTarefaPagination.filter = {
                                'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO,' +
                                    this.form.get('processo').value.especieProcesso.generoProcesso.nome.toUpperCase()
                            };
                        }

                        if (this.form.get('blocoProcessos').value && this.processos.length > 0) {
                            this.especieTarefaPagination.filter = {
                                'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO,' +
                                    this.generoProcessos[0].toUpperCase()
                            };
                        }

                        if (value.especieProcesso.workflow &&
                            this.form.get('especieTarefa').value) {
                            this.form.get('especieTarefa').reset();
                        }
                    } else {
                        this.form.get('especieTarefa').disable();
                    }

                    if (this.form.get('blocoProcessos').value) {
                        this.form.get('processo').clearValidators();
                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.form.get('processo').setValidators(Validators.required);
                    }

                    return of([]);
                }
            )
        ).subscribe();

        if (this.form.get('processo').value && this.form.get('processo').value.id) {
            this.processo.emit(this.form.get('processo').value);
        }

        this.form.get('usuarioResponsavel').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {

                    // bloco de processo
                    if (this.form.get('blocoResponsaveis').value && typeof value === 'object' && value) {
                        const setor = this.form.get('setorResponsavel').value;
                        const usuario = this.form.get('usuarioResponsavel').value;

                        if (usuario) {
                            const findDuplicate = this.blocoResponsaveis.some(item => (item.setor.id === setor.id) && (item.usuario.id === usuario.id));
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        } else {
                            const findDuplicate = this.blocoResponsaveis.some(item => item.setor.id === setor.id);
                            if (!findDuplicate) {
                                this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                            }
                        }

                        this.clearValidators();
                        this._changeDetectorRef.markForCheck();
                    }

                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('dataHoraFinalPrazo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(() => {
                    this.clearValidators();
                    this.alteraPrazoDias();
                    this.validaPrazo();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('dataHoraInicioPrazo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(() => {
                    this.clearValidators();
                    this.alteraPrazoDias();
                    this.validaPrazo();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('prazoDias').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(() => {
                    this.alteraPrazoFinal();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('diasUteis').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(() => {
                    this.alteraDiasUteis();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('especieTarefa').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.especieTarefaPagination['context'] = {};
                    if (this.form.get('processo').value?.especieProcesso?.workflow) {
                        if (this.form.get('processo').value.especieProcesso.generoProcesso.nome === 'ADMINISTRATIVO') {
                            this.especieTarefaPagination.filter = {'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO,'};
                        } else {
                            this.especieTarefaPagination.filter = {
                                'generoTarefa.nome': 'in:ADMINISTRATIVO,ARQUIVISTICO,' +
                                    this.form.get('processo').value.especieProcesso.generoProcesso.nome.toUpperCase()
                            };
                        }
                        this.especieTarefaPagination['context'] = {processoId: this.form.get('processo').value.id};
                        this._changeDetectorRef.detectChanges();
                    }

                    if (value) {
                        this.clearValidators();
                        this.evento = value.evento;
                        if (!this.evento) {
                            this.form.get('localEvento').reset();
                        }

                        this._changeDetectorRef.markForCheck();
                    }
                    return of([]);
                }
            )
        ).subscribe();

        if (this.form.get('grupoContato')) {
            this.form.get('grupoContato').valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((value) => {

                    if (value && typeof value === 'object') {
                        this.clearValidators();
                        this._changeDetectorRef.markForCheck();
                        this.processaGrupoContato(value)
                    }
                    return of([]);

                })
            ).subscribe();
        }

        this.alteraPrazoDias();
        this.validaPrazo();
    }

    alteraDiasUteis(): void {
        this.alteraPrazoFinal();
    }

    alteraPrazoDias(): void {

        const dataHoraInicioPrazo = this.form.get('dataHoraInicioPrazo').value;
        const dataHoraFinalPrazo = this.form.get('dataHoraFinalPrazo').value;

        if (dataHoraInicioPrazo || dataHoraFinalPrazo) {
            let diffDays = dataHoraFinalPrazo.diff(dataHoraInicioPrazo, 'days');

            if (this.form.get('diasUteis').value) {
                const curDate = dataHoraInicioPrazo.clone();
                const maxDate = dataHoraFinalPrazo.clone();
                curDate.add(1, 'days');
                while (curDate <= maxDate) {
                    const dayOfWeek = curDate.day();
                    if ((dayOfWeek === 6) || (dayOfWeek === 0) || (this.feriados.indexOf(curDate.format('DD-MM')) > -1)) {
                        --diffDays;
                    }
                    curDate.add(1, 'days');
                }
            }

            if (diffDays !== this.form.get('prazoDias').value) {
                this.form.get('prazoDias').setValue(diffDays);
            }
        }
    }

    alteraPrazoFinal(): void {
        const dataHoraFinalPrazo = this.form.get('dataHoraInicioPrazo').value;
        const dias = this.form.get('prazoDias').value;
        if (!dias) {
            return;
        }
        const dataHoraFinalPrazoCalculado = dataHoraFinalPrazo.clone().add(dias, 'days');

        if (this.form.get('diasUteis').value) {
            const curDate = this.form.get('dataHoraInicioPrazo').value.clone();
            const maxDate = dataHoraFinalPrazoCalculado.clone();
            curDate.add(1, 'days');
            while (curDate <= maxDate) {
                const dayOfWeek = curDate.day();
                if ((dayOfWeek === 6) || (dayOfWeek === 0) || (this.feriados.indexOf(curDate.format('DD-MM')) > -1)) {
                    dataHoraFinalPrazoCalculado.add(1, 'days');
                    maxDate.add(1, 'days');
                }
                curDate.add(1, 'days');
            }
        }

        if (this.form.get('dataHoraFinalPrazo').value.format('YYYY-MM-DDTHH:mm:ss') !== dataHoraFinalPrazo.format('YYYY-MM-DDTHH:mm:ss')) {
            this.form.get('dataHoraFinalPrazo').setValue(dataHoraFinalPrazoCalculado);
        }
    }

    validaPrazo(): void {
        const dataHoraInicioPrazo = this.form.get('dataHoraInicioPrazo').value;
        const dataHoraFinalPrazo = this.form.get('dataHoraFinalPrazo').value;

        if (!dataHoraInicioPrazo || !dataHoraFinalPrazo) {
            return;
        }

        const diffDays = dataHoraFinalPrazo.diff(dataHoraInicioPrazo, 'days');

        if (dataHoraFinalPrazo < dataHoraInicioPrazo) {
            this.form.get('dataHoraFinalPrazo').setErrors({formError: 'A data final do prazo não pode ser anterior a do início!'});
            this._changeDetectorRef.markForCheck();
            return;
        }

        if (diffDays > 180) {
            this.form.get('dataHoraFinalPrazo').setErrors({formError: 'O prazo deve ser de no máximo de 180 (cento e oitenta) dias!'});
            this._changeDetectorRef.markForCheck();
            return;
        }

        if (this.form.get('diasUteis').value) {
            // sabado?
            if (dataHoraFinalPrazo.day() === 6) {
                this.form.get('dataHoraFinalPrazo').setErrors({formError: 'O prazo não pode terminar em um sábado!'});
                this._changeDetectorRef.markForCheck();
                return;
            }

            // domingo?
            if (dataHoraFinalPrazo.day() === 0) {
                this.form.get('dataHoraFinalPrazo').setErrors({formError: 'O prazo não pode terminar em um domingo!'});
                this._changeDetectorRef.markForCheck();
                return;
            }

            if (this.feriados.indexOf(dataHoraFinalPrazo.format('DD-MM')) > -1) {
                this.form.get('dataHoraFinalPrazo').setErrors({formError: 'O prazo não pode terminar em um feriado nacional!'});
                this._changeDetectorRef.markForCheck();
                return;
            }
        }
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        // se clicar no botao de criar novamente limpa o form
        if (this.clearForm) {
            this.form.reset();
            this.clearForm = false;
        }

        if (changes['tarefa'] && this.tarefa && (!this.tarefa.id || (this.tarefa.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tarefa});

            this.inputProcesso = !!this.tarefa.id;

            if (this.tarefa.especieTarefa) {
                this.evento = this.tarefa.especieTarefa.evento;
            }

            if (!this.tarefa.id && this.tarefa.unidadeResponsavel) {
                this.form.get('setorResponsavel').enable();
                this.form.get('setorResponsavel').reset();
                this.form.get('usuarioResponsavel').reset();
                this.form.get('usuarioResponsavel').disable();
                this.setorResponsavelPagination.filter['unidade.id'] = `eq:${this.tarefa.unidadeResponsavel.id}`;
            }

            if (this.tarefa.processo?.especieProcesso?.workflow) {
                this.addFilterProcessoWorfkflow();
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

            // caso usuario selecione Bloco de Processos
            if (this.form.get('blocoProcessos').value && this.processos) {

                this.processos.forEach(processo => {
                    let tarefa;

                    // caso tenha bloco de responsaveis
                    if (this.form.get('blocoResponsaveis').value && this.blocoResponsaveis) {

                        // para cada processo criamos uma tarefa para cada responsavel
                        this.blocoResponsaveis.forEach(responsavel => {

                            // caso seja distribuicao automatica manda somente o setorResponsavel
                            if (this.form.get('distribuicaoAutomatica').value) {
                                tarefa = {
                                    ...this.form.value,
                                    processo: processo,
                                    setorResponsavel: responsavel.setor
                                };
                            } else {
                                tarefa = {
                                    ...this.form.value,
                                    processo: processo,
                                    setorResponsavel: responsavel.setor,
                                    usuarioResponsavel: responsavel.usuario
                                };
                            }
                            this.save.emit(tarefa);
                        });

                    } else {

                        // caso seja apenas bloco de processos e um responsavel
                        tarefa = {
                            ...this.form.value,
                            processo: processo
                        };
                        this.save.emit(tarefa);
                    }
                });

            }

            // caso tenha Bloco de Responsaveis sem Bloco de Processos
            if (this.form.get('blocoResponsaveis').value &&
                !this.form.get('blocoProcessos').value &&
                this.blocoResponsaveis) {
                let tarefa;

                this.blocoResponsaveis.forEach(responsavel => {

                    // caso seja distribuicao automatica manda somente o setorResponsavel
                    if (this.form.get('distribuicaoAutomatica').value) {
                        tarefa = {
                            ...this.form.value,
                            setorResponsavel: responsavel.setor
                        };
                    } else {
                        tarefa = {
                            ...this.form.value,
                            setorResponsavel: responsavel.setor,
                            usuarioResponsavel: responsavel.usuario
                        };
                    }

                    this.save.emit(tarefa);
                });
            }

            // Por fim, cadastro normal, sem Bloco de Processos e Bloco de Responsaveis
            if (!this.form.get('blocoResponsaveis').value &&
                !this.form.get('blocoProcessos').value) {

                this.save.emit(this.form.value);
            }

            this.generoProcessos = ['ADMINISTRATIVO'];
        }
    }

    doAbort(): void {
        this.abort.emit();
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

        this.addFilterProcessoWorfkflow();
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

        if (setor !== null && typeof setor === 'object') {
            if (setor.unidade && setor.unidade !== this.form.get('unidadeResponsavel').value) {
                this.form.get('unidadeResponsavel').setValue(setor.unidade, {emitEvent: false});
            }
        }

        this.activeCard = 'form';
    }

    checkSetorResponsavel(): void {
        const value = this.form.get('setorResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorResponsavel').setValue(null);
        }

        if (value !== null && typeof value === 'object') {
            if (value.unidade && value.unidade !== this.form.get('unidadeResponsavel').value) {
                this.form.get('unidadeResponsavel').setValue(value.unidade, {emitEvent: false});
            }
        }
    }

    showSetorResponsavelGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    showSetorTree(): void {
        this.activeCard = 'setor-tree';
    }

    showSetorOrigemTree(): void {
        this.activeCard = 'setor-origem-tree';
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

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
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

    getFavoritosEspecieTarefa(): void {
        this.especieTarefaListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\EspecieTarefa',
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id + '_especie_tarefa'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.especieTarefaListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
                this.especieTarefaList = [];
                response['entities'].forEach((favorito) => {
                    this.especieTarefaList.push(favorito.objFavoritoClass[0]);
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
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id + '_unidade_responsavel'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.unidadeResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
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
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id +
                    '_setor_responsavel_unidade_' + this.form.get('unidadeResponsavel').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.setorResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
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
                context: 'eq:tarefa_' + this.form.get('processo').value.especieProcesso.id +
                    '_usuario_responsavel_setor_' + this.form.get('setorResponsavel').value.id
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'})
        ).pipe(
            finalize(() => this.usuarioResponsavelListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            response => {
                this.usuarioResponsavelList = [];
                response['entities'].forEach((favorito) => {
                    this.usuarioResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    clearValidators(): void {
        if (this.valid && this.mode !== 'regular') {
            const blocoCampos = {};
            if (this.blocoEdit.blocoEditEspecie) {
                blocoCampos['especieTarefa'] = true;
            }
            if (this.blocoEdit.blocoEditDistribuicao) {
                blocoCampos['distribuicaoAutomatica'] = true;
                blocoCampos['unidadeResponsavel'] = true;
                blocoCampos['setorResponsavel'] = true;
                blocoCampos['usuarioResponsavel'] = true;
            }
            if (this.blocoEdit.blocoEditInicioPrazo) {
                blocoCampos['dataHoraInicioPrazo'] = true;
            }
            if (this.blocoEdit.blocoEditFinalPrazo) {
                blocoCampos['dataHoraFinalPrazo'] = true;
            }
            const controls = this.form.controls;
            for (const name in controls) {
                if (controls[name].invalid && !blocoCampos[name]) {
                    console.log(name);
                    this.form.get(name).clearValidators();
                    this.form.get(name).setErrors(null);
                }
            }
        }
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
            response => {
                response['entities'].forEach((setor) => {
                    this.form.get('setorResponsavel').setValue(setor);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    addFilterProcessoWorfkflow(): void {
        // caso processo seja de workflow verificar espécies permitidas
        this.especieTarefaPagination['context'] = {};
        if (this.form.get('processo').value && this.form.get('processo').value.especieProcesso.workflow) {

            if (!this.form.get('processo').value.tarefaAtualWorkflow) {
                this.especieTarefaPagination.filter['workflows.id'] = 'eq:'
                    + this.form.get('processo').value.especieProcesso.workflow.id;
                this.especieTarefaPagination.filter['id'] = 'eq:'
                    + this.form.get('processo').value.especieProcesso.workflow.especieTarefaInicial.id;
            } else {
                this.especieTarefaPagination.filter['transicoesWorkflowTo.workflow.id'] = 'eq:'
                    + this.form.get('processo').value.especieProcesso.workflow.id;
                this.especieTarefaPagination.filter['transicoesWorkflowTo.especieTarefaFrom.id'] = 'eq:'
                    + this.form.get('processo').value.tarefaAtualWorkflow.especieTarefa.id;
            }

            this.especieTarefaPagination['context'] = {processoId: this.form.get('processo').value.id};
        }
    }

    checkGrupoContato(): void {
        const value = this.form.get('setorResponsavel').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorResponsavel').setValue(null);
        }
    }

    selectGrupoContato(grupoContato: GrupoContato): void {
        this.processaGrupoContato(grupoContato);
        this.activeCard = 'form';
    }

    showGrupoContatoGRID():void {
        this.activeCard = 'grupo-contato-gridsearch';
    }

    processaGrupoContato(grupoContato): void {
        grupoContato.contatos.forEach(contato => {
            if (this.form.get('distribuicaoAutomatica').value && contato.setor) {
                const findDuplicate = this.blocoResponsaveis.some(item => (item.setor.id === contato.setor.id));
                if (!findDuplicate) {
                    let setor = contato.setor;
                    this.blocoResponsaveis = [...this.blocoResponsaveis, {setor}];
                }
            } else if (!this.form.get('distribuicaoAutomatica').value && contato.usuario) {
                const findDuplicate = this.blocoResponsaveis.some(item => (item.usuario.id === contato.usuario.id));
                if (!findDuplicate) {
                    let usuario = contato.usuario;
                    let setor = contato.usuario.colaborador?.lotacoes[0]?.setor;
                    this.blocoResponsaveis = [...this.blocoResponsaveis, {setor, usuario}];
                }
            }
        });
    }
}
