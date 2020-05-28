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
import {Pessoa, Tarefa} from '@cdk/models';
import {EspecieTarefa} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {Processo} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Setor} from '@cdk/models';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Pagination} from '@cdk/models';
import {Favorito} from '@cdk/models';
import {FavoritoService} from '@cdk/services/favorito.service';
import {LoginService} from '../../../../app/main/auth/login/login.service';
import {Responsavel} from '@cdk/models';

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

    @Output()
    favorito = new EventEmitter<any>();

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
    logEntryPagination: Pagination;

    especieTarefaList: EspecieTarefa[] = [];

    especieTarefaListIsLoading: boolean;

    setorResponsavelList: Setor[] = [];

    setorResponsavelListIsLoading: boolean;

    @Input()
    favoritosList: Favorito[] = [];

    _profile: any;

    @Input()
    mode = 'regular';

    inputProcesso: boolean;

    feriados = ['01-01', '21-04', '01-05', '07-09', '12-10', '02-11', '15-11', '25-12'];

    evento = false;

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
    blocoResponsaveis: Responsavel[] = [];

    @Output()
    processo = new EventEmitter<Processo>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _favoritoService: FavoritoService,
        public _loginService: LoginService
    ) {
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
            usuarios: [null],
            setores: [null],
            setorOrigem: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            localEvento: [null, [Validators.maxLength(255)]]
        });

        this.processoPagination = new Pagination();
        this.processoPagination.populate = ['setorAtual', 'setorAtual.unidade'];
        this.especieTarefaPagination = new Pagination();
        this.unidadeResponsavelPagination = new Pagination();
        this.unidadeResponsavelPagination.filter = {parent: 'isNull'};
        this.setorResponsavelPagination = new Pagination();
        this.setorResponsavelPagination.filter = {parent: 'isNotNull'};
        this.usuarioResponsavelPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();

        this._profile = _loginService.getUserProfile();
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
                    if (this.blocoResponsaveis)
                    {
                        this.blocoResponsaveis = [];
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
                        this.setorResponsavelPagination.filter['parent'] = `isNotNull`;
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

                    // criacao normal de tarefa sem distribuicao automatica
                    if (value && typeof value === 'object' && !this.form.get('distribuicaoAutomatica').value) {
                        this.form.get('usuarioResponsavel').enable();
                        this.form.get('usuarioResponsavel').reset();
                        this.usuarioResponsavelPagination.filter['colaborador.lotacoes.setor.id'] = `eq:${value.id}`;
                        this._changeDetectorRef.markForCheck();
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
                    if (this.form.get('blocoProcessos').value && typeof value === 'object' && value) {
                        this.processos.push(value);
                        this._changeDetectorRef.markForCheck();
                    }

                    if (value && typeof value === 'object') {
                        this.processo.emit(this.form.get('processo').value);
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

                        this._changeDetectorRef.markForCheck();
                    }

                    if (this.valid && this.blocoEdit.blocoEditDistribuicao) {
                        this.form.get('processo').clearValidators();
                        this.form.get('dataHoraInicioPrazo').clearValidators();
                        this.form.get('dataHoraFinalPrazo').clearValidators();
                        this.form.get('especieTarefa').clearValidators();
                        this.form.get('setorOrigem').clearValidators();
                    }

                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('dataHoraFinalPrazo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.alteraPrazoDias();
                    this.validaPrazo();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('dataHoraInicioPrazo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.alteraPrazoDias();
                    this.validaPrazo();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('prazoDias').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.alteraPrazoFinal();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('diasUteis').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.alteraDiasUteis();
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('especieTarefa').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value) {
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
                        console.log('descontando: ' + curDate.format('DD-MM') + ' - ' + diffDays);
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

        // if (diffDays === 0) {
        //    this.form.get('dataHoraFinalPrazo').setErrors({formError: 'O prazo deve ser no mínimo de 24 (vinte e quatro) horas!'});
        //    this._changeDetectorRef.markForCheck();
        //    return;
        // }

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
        if (changes['tarefa'] && this.tarefa && (!this.tarefa.id || (this.tarefa.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tarefa});

            if (this.tarefa.id) {
                this.inputProcesso = true;
            } else {
                this.inputProcesso = false;
            }

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

        this._changeDetectorRef.markForCheck();

        this.form.get('processo').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
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

        if(this.favoritosList)
        {
            let tipoFavorito = this.favoritosList[0] ? this.favoritosList[0].objectClass : '';

            if (tipoFavorito === "SuppCore\\AdministrativoBackend\\Entity\\EspecieTarefa") {
                this.especieTarefaList = [];
                this.favoritosList.forEach((favorito) => {
                    this.especieTarefaList.push(favorito.objFavoritoClass[0]);
                });
                this.especieTarefaListIsLoading = false;
            }

            if (tipoFavorito === "SuppCore\\AdministrativoBackend\\Entity\\Setor") {
                this.setorResponsavelList = [];
                this.favoritosList.forEach((favorito) => {
                    this.setorResponsavelList.push(favorito.objFavoritoClass[0]);
                });
                this.setorResponsavelListIsLoading = false;
            }

            if (tipoFavorito === '') {
                this.especieTarefaListIsLoading = false;
                this.setorResponsavelListIsLoading = false;
            }

            this._changeDetectorRef.markForCheck();
        }
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
                            if (this.form.get('distribuicaoAutomatica').value){
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
                    if (this.form.get('distribuicaoAutomatica').value){
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

    showEspecieTarefaList(): void {
        this.especieTarefaListIsLoading = true;
        this.favorito.emit('EspecieTarefa');
    }

    showSetorResponsavelList(): void {
        this.setorResponsavelListIsLoading = true;
        this.favorito.emit('Setor');
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
}
