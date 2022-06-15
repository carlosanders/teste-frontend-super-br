import {
    AfterViewInit,
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
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    Criteria,
    DocumentoAvulso,
    EspecieDocumentoAvulso,
    Modelo,
    Pagination,
    Pessoa,
    Processo,
    Setor
} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FavoritoService} from '../../../services/favorito.service';
import {DynamicService} from '../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../modules/modules-config';
import {CdkConfigService} from '../../../services/config.service';

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
export class CdkDocumentoAvulsoFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

    @Input()
    documentoAvulso: DocumentoAvulso;

    @Input()
    prazoCriteriaList: Criteria[];

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

    @Input()
    logEntryPagination: Pagination;

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
    modeloPaginationAndx: any;

    @Input()
    setorDestinoPagination: Pagination;

    @Input()
    pessoaDestinoPagination: Pagination;

    @Input()
    mecanismoRemessa: string = 'interna';

    @Input()
    destinatarios = [];

    @Output()
    gerirPessoaDestino = new EventEmitter();

    @Output()
    editPessoaDestino = new EventEmitter<number>();

    @Input()
    pessoaDestino: Pessoa;

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    selected = false;

    form: FormGroup;

    activeCard = 'form';

    processos: Processo[] = [];

    inputReadOnly: boolean;
    inputProcesso: boolean;

    especieDocumentoAvulsoList: EspecieDocumentoAvulso[] = [];

    especieDocumentoAvulsoListIsLoading: boolean;

    modeloList: Modelo[] = [];

    modeloListIsLoading: boolean;

    pessoaDestinoList: Pessoa[] = [];

    pessoaDestinoListIsLoading: boolean;

    setorDestinoList: Setor[] = [];

    setorDestinoListIsLoading: boolean;

    generoProcessos: any[] = [];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dynamicService: DynamicService,
        private _favoritoService: FavoritoService,
        public _cdkConfigService: CdkConfigService,
    ) {

        const controlConfig = {
            id: [null],
            blocoProcessos: [null],
            processos: [null],
            processo: [null],
            mecanismoRemessa: [null],
            tarefaOrigem: [null],
            blocoDestinatarios: [null],
            destinatarios: [null],
            urgente: [null],
            prazoFinal: [null],
            especieDocumentoAvulso: [null, [Validators.required]],
            modelo: [null, [Validators.required]],
            dataHoraInicioPrazo: [null, [Validators.required]],
            dataHoraFinalPrazo: [null, [Validators.required]],
            setorDestino: [null, [Validators.required]],
            pessoaDestino: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]]
        };

        this.form = this._formBuilder.group(controlConfig);
        this.prazoCriteriaList = [];
        this.processoPagination = new Pagination();
        this.processoPagination.populate = ['especieProcesso', 'especieProcesso.generoProcesso', 'setorAtual', 'setorAtual.unidade'];
        this.especieDocumentoAvulsoPagination = new Pagination();
        this.modeloPagination = new Pagination();
        this.pessoaDestinoPagination = new Pagination();
        this.setorDestinoPagination = new Pagination();
        this.modeloPaginationAndx = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this.mode === 'trigger-etiqueta') {
            this.form.get('dataHoraInicioPrazo').setValidators(null);
            this.form.get('dataHoraFinalPrazo').setValidators(null);
            this.form.controls['prazoFinal'].setValidators(Validators.required);
        }

        if (!this.documentoAvulso.id) {
            this.form.get('pessoaDestino').reset();
            this.form.get('pessoaDestino').disable();
        }

        this.form.get('mecanismoRemessa').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    this.selected = false;
                    if (value === 'interna') {
                        this.form.get('pessoaDestino').reset();
                        this.form.get('pessoaDestino').disable();
                        this.form.get('setorDestino').enable();
                    } else {
                        this.form.get('setorDestino').reset();
                        this.form.get('setorDestino').disable();
                        this.form.get('pessoaDestino').enable();
                        this.pessoaDestinoPagination.filter = {};
                        if (value === 'barramento') {
                            this.pessoaDestinoPagination.filter['vinculacaoPessoaBarramento'] = 'isNotNull';
                        }
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
                        this.adicionaBlocoProcesso(value);
                    }
                    return of([]);
                }
            )
        ).subscribe();

        this.form.get('setorDestino').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                if (!value) {
                    this.selected = false;
                }
                if (value && typeof value === 'object') {
                    this.selected = true;
                }
                if (value && typeof value === 'object' && this.form.get('blocoDestinatarios').value) {
                    this.destinatarios.push(value);
                }

                if (value && typeof value === 'object') {
                    if (this.form.get('processo').value?.especieProcesso?.generoProcesso?.nome === 'ADMINISTRATIVO') {
                        this.especieDocumentoAvulsoPagination.filter = {'generoDocumentoAvulso.nome': 'in:ADMINISTRATIVO'};
                    } else {
                        this.especieDocumentoAvulsoPagination.filter = {
                            'generoDocumentoAvulso.nome': 'in:ADMINISTRATIVO,' +
                                this.form.get('processo').value?.especieProcesso?.generoProcesso?.nome.toUpperCase()
                        };
                    }

                    if (this.form.get('blocoProcessos').value && this.processos.length > 0) {
                        this.especieDocumentoAvulsoPagination.filter = {
                            'generoDocumentoAvulso.nome': 'in:ADMINISTRATIVO,' +
                                this.generoProcessos[0].toUpperCase()
                        };
                    }
                }

                this._changeDetectorRef.markForCheck();

                return of([]);
            })
        ).subscribe();

        this.form.get('pessoaDestino').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap((value) => {
                    if (!value) {
                        this.selected = false;
                    }
                    if (value && typeof value === 'object') {
                        this.selected = true;
                        this.form.markAsDirty({onlySelf: false});
                    }
                    if (value && typeof value === 'object' && this.form.get('blocoDestinatarios').value) {
                        this.destinatarios.push(value);
                    }
                    this._changeDetectorRef.markForCheck();
                    return of([]);
                }
            )
        ).subscribe();

        if (this.form.get('processo').value && this.form.get('processo').value.NUP && this.form.get('processo').value.especieProcesso?.generoProcesso) {
            if (this.form.get('processo').value.especieProcesso?.generoProcesso?.nome === 'ADMINISTRATIVO') {
                this.especieDocumentoAvulsoPagination.filter = {'generoDocumentoAvulso.nome': 'in:ADMINISTRATIVO'};
            } else {
                const path = '@cdk/components/documento-avulso/cdk-documento-avulso-form';
                let generoAffinity = '';
                modulesConfig.forEach((module) => {
                    if (module.generoAffinity?.hasOwnProperty(path) &&
                        module.generoAffinity[path].hasOwnProperty(this.form.get('processo').value.especieProcesso?.generoProcesso?.nome.toUpperCase())
                    ) {
                        generoAffinity = ',' + module.generoAffinity[path][this.form.get('processo').value.especieProcesso?.generoProcesso?.nome.toUpperCase()].join(',');
                    }
                });
                this.especieDocumentoAvulsoPagination.filter = {
                    'generoDocumentoAvulso.nome': 'in:ADMINISTRATIVO,' +
                        this.form.get('processo').value.especieProcesso?.generoProcesso?.nome.toUpperCase() +
                        generoAffinity
                };
            }
        }
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form#radio';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        if (changes['documentoAvulso'] && this.documentoAvulso && (!this.documentoAvulso.id || (this.documentoAvulso.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.documentoAvulso});

            if (this.documentoAvulso.id) {
                this.inputProcesso = true;
                this.inputReadOnly = true;
                if (this.documentoAvulso.pessoaDestino) {
                    this.form.get('setorDestino').clearValidators();
                }
                if (this.documentoAvulso.setorDestino) {
                    this.form.get('pessoaDestino').clearValidators();
                }
            }
        }

        if (changes['pessoaDestino'] && this.pessoaDestino) {
            this.form.get('pessoaDestino').setValue(this.pessoaDestino);
            this.form.markAsDirty({onlySelf: false});
        }

        if (changes['mode'] && !!this.mode) {
            if (this.mode === 'editor') {
                this.form.get('modelo').disable();
            } else {
                this.form.get('modelo').enable();
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

        if (!this.errors && !changes['pessoaDestino']) {
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
            if (this.form.get('blocoProcessos').value && this.processos) {

                // percorrendo o bloco de processos
                this.processos.forEach((processo) => {
                    let docAvulso;

                    // caso tenha bloco de Destinatarios
                    if (this.form.get('blocoDestinatarios').value) {

                        // para cada processo criamos um oficio para cada Destinatario
                        this.destinatarios.forEach((destinatario) => {

                            if (destinatario instanceof Setor) {
                                docAvulso = {
                                    ...this.form.value,
                                    processo: processo,
                                    setorDestino: destinatario,
                                    pessoaDestino: null
                                };
                            }

                            if (destinatario instanceof Pessoa) {
                                docAvulso = {
                                    ...this.form.value,
                                    processo: processo,
                                    pessoaDestino: destinatario,
                                    setorDestino: null
                                };
                            }
                            this.save.emit(docAvulso);
                        });

                    } else {

                        // caso seja apenas bloco de processos e um destinatario
                        docAvulso = {
                            ...this.form.value,
                            processo: processo
                        };
                        this.save.emit(docAvulso);
                    }
                });

            }

            // caso tenha bloco de Destinatarios sem Bloco de Processos
            if (this.form.get('blocoDestinatarios').value &&
                !this.form.get('blocoProcessos').value &&
                this.destinatarios) {
                let docAvulso;

                this.destinatarios.forEach((destinatario) => {

                    if (destinatario instanceof Setor) {
                        docAvulso = {
                            ...this.form.value,
                            setorDestino: destinatario,
                            pessoaDestino: null
                        };
                    }

                    if (destinatario instanceof Pessoa) {
                        docAvulso = {
                            ...this.form.value,
                            pessoaDestino: destinatario,
                            setorDestino: null
                        };
                    }
                    this.save.emit(docAvulso);
                });
            }

            // Por fim, cadastro normal, sem BlocodeProcessos e BlocodeDestinatarios
            if (!this.form.get('blocoDestinatarios').value &&
                !this.form.get('blocoProcessos').value) {

                this.save.emit(this.form.value);
            }
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    deleteProcessos(processoId): void {
        this.processos = this.processos.filter(processo => processo.id !== processoId);
        this._changeDetectorRef.markForCheck();
    }

    deleteDestinatarios(destinatarioId): void {
        this.destinatarios = this.destinatarios.filter(destinatario => destinatario.id !== destinatarioId);
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
            this.adicionaBlocoProcesso(processo);
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

    showPessoaDestinoGrid(): void {
        this.activeCard = 'pessoa-gridsearch';
    }

    selectPessoaDestino(pessoaDestino: Pessoa): void {
        if (pessoaDestino) {
            this.form.get('pessoaDestino').setValue(pessoaDestino);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }

    getFavoritosEspecieDocumentoAvulso(): void {
        this.especieDocumentoAvulsoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\EspecieDocumentoAvulso',
                context: 'eq:documento_avulso_' + this.form.get('processo').value.especieProcesso.id + '_especie_documento_avulso'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.especieDocumentoAvulsoPagination.populate)
        ).pipe(
            finalize(() => this.especieDocumentoAvulsoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.especieDocumentoAvulsoList = [];
                response['entities'].forEach((favorito) => {
                    this.especieDocumentoAvulsoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosModelo(): void {
        this.modeloListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Modelo',
                context: 'eq:documento_avulso_' + this.form.get('processo').value.especieProcesso.id + '_modelo'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.modeloPagination.populate)
        ).pipe(
            finalize(() => this.modeloListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.modeloList = [];
                response['entities'].forEach((favorito) => {
                    this.modeloList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosPessoaDestino(): void {
        this.pessoaDestinoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Pessoa',
                context: 'eq:documento_avulso_' + this.form.get('processo').value.especieProcesso.id + '_pessoa_destino'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.pessoaDestinoPagination.populate)
        ).pipe(
            finalize(() => this.pessoaDestinoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.pessoaDestinoList = [];
                response['entities'].forEach((favorito) => {
                    this.pessoaDestinoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    getFavoritosSetorDestino(): void {
        this.setorDestinoListIsLoading = true;
        this._favoritoService.query(
            JSON.stringify({
                objectClass: 'eq:SuppCore\\AdministrativoBackend\\Entity\\Setor',
                context: 'eq:documento_avulso_' + this.form.get('processo').value.especieProcesso.id + '_setor_destino'
            }),
            5,
            0,
            JSON.stringify({prioritario: 'DESC', qtdUso: 'DESC'}),
            JSON.stringify(this.setorDestinoPagination.populate)
        ).pipe(
            finalize(() => this.setorDestinoListIsLoading = false),
            catchError(() => of([]))
        ).subscribe(
            (response) => {
                this.setorDestinoList = [];
                response['entities'].forEach((favorito) => {
                    this.setorDestinoList.push(favorito.objFavoritoClass[0]);
                });
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    adicionaBlocoProcesso(value): void {
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
        }
    }

}
