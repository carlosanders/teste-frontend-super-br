import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarRef,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

import {cdkAnimations} from '@cdk/animations';
import {
    CdkAssinaturaEletronicaPluginComponent
} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {CdkUploadDialogComponent} from '@cdk/components/documento/cdk-upload-dialog/cdk-upload-dialog.component';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {
    Assinatura,
    ComponenteDigital,
    Documento,
    Juntada,
    Pagination,
    Processo,
    Tarefa,
    VinculacaoDocumento,
    Volume
} from '@cdk/models';
import {Bookmark} from '@cdk/models/bookmark.model';
import {Contador} from '@cdk/models/contador';
import {JuntadaService} from '@cdk/services/juntada.service';
import {MercureService} from '@cdk/services/mercure.service';
import {CdkUtils} from '@cdk/utils';
import {select, Store} from '@ngrx/store';
import * as AssinaturaStore from 'app/store';
import {DndDragImageOffsetFunction, DndDropEvent} from 'ngx-drag-drop';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, take, takeUntil} from 'rxjs/operators';
import {SharedBookmarkService} from '../../../../../../../@cdk/services/shared-bookmark.service';
import {modulesConfig} from '../../../../../../../modules/modules-config';
import {getMercureState, getRouterState, LimpaMercure} from '../../../../../../store';
import {LoginService} from '../../../../../auth/login/login.service';
import {getTarefa} from '../../../../tarefas/tarefa-detail/store';
import {getProcesso} from '../../../store';
import * as fromStore from '../../store';
import {getDocumentosHasLoaded, getSelectedVolume, getVolumes} from '../../store';
import {DynamicService} from "../../../../../../../modules/dynamic.service";

@Component({
    selector: 'processo-view-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoViewMainSidebarComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    capaProcesso: boolean;

    @Input()
    capa: boolean = true;

    @Input()
    name: string = 'juntadas-left-sidebar-1';

    @Output()
    scrolled = new EventEmitter<any>();

    @Output()
    sorted = new EventEmitter<string>();

    @Output()
    aprovarDocumento: EventEmitter<any> = new EventEmitter<Documento>();

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    @ViewChild('menuTriggerOficios') menuTriggerOficios: MatMenuTrigger;

    @ViewChild('autoCompleteModelos', {static: false, read: MatAutocompleteTrigger})
    autoCompleteModelos: MatAutocompleteTrigger;

    @ViewChild('dynamicComponent', {read: ViewContainerRef})
    container: ViewContainerRef;

    sort: string = 'DESC';

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    processoId: string = undefined;
    processo$: Observable<Processo>;
    processo: Processo;

    expandir$: Observable<boolean>;

    tarefaOrigem: Tarefa;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    oficios: Documento[] = [];

    volumes$: Observable<Volume[]>;
    volumes: Volume[];

    juntadasByVolume: any;

    loadingVolumes$: Observable<boolean>;

    selectedVolume$: Observable<any>;
    selectedVolume: number = null;

    errors$: Observable<any>;
    errorsDocumento$: Observable<any>;

    isLoading$: Observable<boolean>;

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;

    index = [];

    animationDirection: 'left' | 'right' | 'none';

    pagination$: any;
    pagination: any;

    listFilter: Record<string, string> = {};
    listSort: Record<string, string> = {};

    showListFilter = false;

    form: FormGroup;

    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[];
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentoIds$: Observable<number[]>;
    removendoVinculacoesDocumentoIds$: Observable<number[]>;
    removendoVinculacoesDocumentoIds: number[];
    lixeiraMinutas$: Observable<boolean>;
    loadingDocumentosExcluidos$: Observable<boolean>;

    lixeiraMinutas: boolean;

    tarefa$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    tarefa: boolean;

    volumesPagination$: Observable<any>;
    volumesPagination: any;

    routerState: any;

    links: any;

    formEditor: FormGroup;

    habilitarTipoDocumentoSalvar = false;

    modeloPagination: Pagination;

    tipoDocumentoPagination: Pagination;

    loadedMinutas: any;

    routeAtividadeDocumento = 'atividade';
    routeOficioDocumento = 'oficio';

    minutasLoading$: Observable<boolean>;

    minutasSaving$: Observable<boolean>;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;
    documentoEdit: any = {uuid: null, open: false};

    formEditorValid = false;
    formTipoDocumentoValid = false;

    novaJuntada = false;

    placeholderId = null;

    draggedJuntada: number = null;
    isOpen: boolean[] = [];

    // Upload de anexo em minuta/ofício
    isSaving$: Observable<boolean>;
    isLoadingDocumentosVinculados$: Observable<boolean>;
    documentosVinculados$: Observable<Documento[]>;
    documentosVinculados: Documento[];
    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    alterandoDocumentosVinculadosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    documentosVinculadosPagination$: Observable<any>;
    documentosVinculadosPagination: any;

    contador: Contador = new Contador();
    contadorVinculacoes: Contador = new Contador();
    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    bookMarkselected: any;
    bookMarkJuntadaselected: any;
    isSavingBookmark$: Observable<boolean>;
    isLoadingBookmarks$: Observable<boolean>;
    bookmarks$: Observable<Bookmark[]>;
    bookmarks: Bookmark[] = [];
    bookmarksBySequencial: any;
    paginationBookmark$: any;
    paginationBookmark: any;
    deletingBookmarkId$: Observable<number[]>;
    deletingVisibilidadeDocumentosIdErros$: Observable<number[]>;

    documentosRestritos: number[] = [];
    documentosRestritosErros: number[] = [];
    selectedOrigemDados: string = 'todos';
    activeCard: fromStore.ProcessoViewActiveCard = 'juntadas';
    selectedJuntadasId: number[] = [];
    selectedJuntadasVinculadasId: number[] = [];
    savingDownloadProcesso: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject();
    private _unsubscribeDocs: Subject<any> = new Subject();

    /**
     *
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param dialog
     * @param _cdkSidebarService
     * @param _store
     * @param _formBuilder
     * @param _router
     * @param _activatedRoute
     * @param _loginService
     * @param _mercureService
     * @param _snackBar
     * @param _dynamicService
     * @param _matDialog
     */
    constructor(
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.ProcessoViewAppState>,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        public _loginService: LoginService,
        private _mercureService: MercureService,
        private _snackBar: MatSnackBar,
        private _dynamicService: DynamicService,
        private _matDialog: MatDialog
    ) {
        this.form = this._formBuilder.group({
            volume: [null],
            tipoDocumento: [null],
            tipoDocumentoMinutas: [null],
            numeracaoSequencial: [null],
            descricao: [null],
            criadoPor: [null],
            atualizadoPor: [null],
            unidade: [null],
            origemDados: ['todos'],
            idDocumento: [null],
            numeroUnicoDocumento: [null]
        });

        this.formEditor = this._formBuilder.group({
            modelo: [null]
        });

        // Set the defaults
        this.animationDirection = 'none';

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.expandir$ = this._store.pipe(select(fromStore.expandirTela));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.loadingVolumes$ = this._store.pipe(select(fromStore.getIsLoadingVolumes));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.volumesPagination$ = this._store.pipe(select(fromStore.getVolumesPagination));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.volumes$ = this._store.pipe(select(getVolumes));
        this.selectedVolume$ = this._store.pipe(select(getSelectedVolume));

        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.errorsDocumento$ = this._store.pipe(select(fromStore.getErrorsDocumentos));

        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.removendoVinculacoesDocumentoIds$ = this._store.pipe(select(fromStore.getRemovendoVinculacoesDocumentoIds));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.lixeiraMinutas$ = this._store.pipe(select(fromStore.getLixeiraMinutas));
        this.loadingDocumentosExcluidos$ = this._store.pipe(select(fromStore.getLoadingDocumentosExcluidos));
        this.downloadP7SDocumentoIds$ = this._store.pipe(select(fromStore.getDownloadDocumentoP7SId));
        this.isSavingBookmark$ = this._store.pipe(select(fromStore.getIsSavingBookmark));
        this.isLoadingBookmarks$ = this._store.pipe(select(fromStore.getIsLoadingBookmark));
        this.bookmarks$ = this._store.pipe(select(fromStore.getBookmarks));
        this.paginationBookmark$ = this._store.pipe(select(fromStore.getPaginationBookmark));
        this.deletingBookmarkId$ = this._store.pipe(select(fromStore.getDeletingBookmarkId));
        this.deletingVisibilidadeDocumentosIdErros$ = this._store.pipe(select(fromStore.getErrorsDeleteVisibilidadeDocumentos));
        this.removendoVinculacoesDocumentoIds$ = this._store.pipe(select(fromStore.getRemovendoVinculacoesDocumentoIds));

        this.currentStep$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentStep) => {
            this.currentStep = currentStep;
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(fromStore.getActiveCard),
            takeUntil(this._unsubscribeAll)
        ).subscribe((activeCard) => this.activeCard = activeCard);

        this._store.pipe(
            select(fromStore.getSelectedJuntadasId),
            takeUntil(this._unsubscribeAll),
        ).subscribe((selectedJuntadasId) => this.selectedJuntadasId = selectedJuntadasId);

        this._store.pipe(
            select(fromStore.getSelectedJuntadasVinculadasId),
            takeUntil(this._unsubscribeAll),
        ).subscribe((selectedJuntadasVinculadasId) => this.selectedJuntadasVinculadasId = selectedJuntadasVinculadasId);

        this._store.pipe(
            select(fromStore.getSavingDownloadProcesso),
            takeUntil(this._unsubscribeAll),
        ).subscribe((savingDownloadProcesso) => this.savingDownloadProcesso = savingDownloadProcesso);

        this.tipoDocumentoPagination = new Pagination();

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas && (juntadas.length !== this.juntadas?.length || juntadas !== this.juntadas))
        ).subscribe((juntadas) => {
            this.juntadas = juntadas;
            this.totalSteps = juntadas.length;
            if (this.listFilter?.id && this.juntadas?.length === 1) {
                delete this.listFilter.id;
                const numeracaoSequencial = this.juntadas[0].numeracaoSequencial;
                this.listFilter['numeracaoSequencial'] = ':eq:' + numeracaoSequencial;
                this.form.get('numeracaoSequencial').setValue(numeracaoSequencial);
            } else {
                this.form.get('numeracaoSequencial').setValue(null);
            }
            if (juntadas.length !== this.index.length || this.compareAtivo(juntadas, this.index)) {
                this.index = [];
                juntadas.forEach((juntada) => {
                    let componentesDigitaisIds = [];
                    if (juntada.ativo) {
                        if (juntada.documento?.componentesDigitais) {
                            componentesDigitaisIds = juntada.documento.componentesDigitais.map(cd => cd.id);
                        }
                        if (juntada.documento?.vinculacoesDocumentos) {
                            juntada.documento.vinculacoesDocumentos.forEach((vd) => {
                                vd.documentoVinculado.componentesDigitais.forEach((dvcd) => {
                                    componentesDigitaisIds.push(dvcd.id);
                                })
                            })
                        }
                    } else {
                        if (juntada.documento?.componentesDigitais) {
                            componentesDigitaisIds = juntada.documento.componentesDigitais.map(cd => cd.id);
                        }
                    }
                    const tmpJuntada = {
                        id: juntada.id,
                        numeracaoSequencial: juntada.numeracaoSequencial,
                        ativo: juntada.ativo,
                        componentesDigitais: componentesDigitaisIds
                    };
                    this.index.push(tmpJuntada);
                })
            }

            juntadas.filter(juntada => {
                return (juntada.documento.acessoRestrito === true &&
                    !this.documentosRestritos.includes(juntada.documento.id))
            }).forEach(juntada => {
                    this.documentosRestritos.push(juntada.documento.id);
            });

            this.juntadasByVolume = CdkUtils.groupArrayByFunction(juntadas, juntada => juntada?.volume?.numeracaoSequencial);
            this._changeDetectorRef.markForCheck();
        });

        this.selectedVolume$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            volume => this.selectedVolume = volume
        );

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
            this.listFilter = {...this.pagination.listFilter};
            const sort = {...this.pagination.sort};
            if (this.listFilter.id && this.juntadas?.length) {
                delete this.listFilter.id;
                const numeracaoSequencial = this.juntadas[0].numeracaoSequencial;
                this.listFilter['numeracaoSequencial'] = ':eq:' + numeracaoSequencial;
                this.form.get('numeracaoSequencial').setValue(numeracaoSequencial);
            } else {
                this.form.get('numeracaoSequencial').setValue(null);
            }
            if (sort['numeracaoSequencial'] === 'ASC') {
                this.sort = 'ASC';
            } else {
                this.sort = 'DESC';
            }
        });

        this.volumesPagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            pagination => this.volumesPagination = pagination
        );

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this.volumes$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            volumes => this.volumes = volumes
        );

        this.formEditor.get('modelo').valueChanges.subscribe((value) => {
            this.formEditorValid = value && typeof value === 'object';
        });

        this.form.get('tipoDocumentoMinutas').valueChanges.subscribe((value) => {
            this.formTipoDocumentoValid = value && typeof value === 'object';
        });

        const path = 'app/main/apps/processo/processo-view/sidebars/main';
        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });

        this.modeloPagination = new Pagination();
        this.modeloPagination.populate = [
            'documento',
            'documento.componentesDigitais'
        ];
        this.modeloPagination.filter = {
            orX: [
                {
                    'modalidadeModelo.valor': 'eq:EM BRANCO'
                },
                {
                    // Modelos individuais
                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                },
            ]
        };
        // Upload de anexos em minutas
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSavingDocumentosVinculados));
        this.isLoadingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsLoadingDocumentosVinculados));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.alterandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosVinculadosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.documentosVinculadosPagination$ = this._store.pipe(select(fromStore.getDocumentosVinculadosPagination));

        this.errorsDocumento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            if (errors && errors.status && errors.status === 422) {
                const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
                this._snackBar.open(error, null, {
                    duration: 5000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    panelClass: ['danger-snackbar']
                });
            }
        });

        this.bookmarks$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (bookmarks) => {
                if (bookmarks) {
                    this.bookmarks = bookmarks;
                    this.bookmarksBySequencial = CdkUtils.groupArrayByFunction(bookmarks, book => book?.juntada?.numeracaoSequencial);
                    this.bookmarksBySequencial = Array.from(this.bookmarksBySequencial, ([key, value]) => ({
                        key,
                        value
                    })).sort((a, b) => b.key - a.key);
                    this._changeDetectorRef.markForCheck();
                }
            }
        );

        this.paginationBookmark$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            pagination => this.paginationBookmark = pagination
        );

        this.deletingVisibilidadeDocumentosIdErros$.pipe(
            distinctUntilChanged(),
            filter(idErros => !!idErros),
            takeUntil(this._unsubscribeAll)
        ).subscribe((idErros) => {
            const errosId = idErros;
            if(errosId.length>0 && this.documentosRestritosErros.length>0){
                const error = 'O usuário não possui acesso ao(s) Documento(s) de id ' + errosId +
                    '. A Restrição não pôde ser retirada.';
                this._snackBar.open(error, null, {
                    duration: 5000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    panelClass: ['danger-snackbar']
                });
                this.documentosRestritosErros = [];
            }
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.novaJuntada = false;

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;

            if (routerState.state.params['processoHandle'] && this.processoId !== routerState.state.params['processoHandle']) {
                if (this.processoId) {
                    this._mercureService.unsubscribe('juntadas_' + this.processoId);
                }
                this.processoId = routerState.state.params['processoHandle'];
                this._mercureService.subscribe('juntadas_' + this.processoId);
            }

            this.tarefa$.next(!!(this.routerState.params.tarefaHandle) && this.routerState.url.indexOf('/documento/') === -1);

            //caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.snackSubscription) {
                this.sheetRef.dismiss();
            }
        });

        this.removendoVinculacoesDocumentoIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(removendoVinculacoesDocumentoIds => this.removendoVinculacoesDocumentoIds = removendoVinculacoesDocumentoIds);

        this.assinandoDocumentosId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(assinandoDocumentosId => this.assinandoDocumentosId = assinandoDocumentosId);

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
            if (message && message.type === 'nova_juntada') {
                this.novaJuntada = true;
                this._changeDetectorRef.detectChanges();
                this._store.dispatch(new LimpaMercure());
            }
        });

        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged((x, y) => x === y && this.documentoEdit.uuid === this.routerState.queryParams.documentoEdit),
        ).subscribe((value) => {
            this.tarefa = value;
            this.documentoEdit.uuid = this.routerState.queryParams.documentoEdit;
            this.documentoEdit.open = false;

            if (value) {
                this._unsubscribeDocs.next(true);
                this._unsubscribeDocs.complete();
                this._unsubscribeDocs = new Subject();
                this._store.pipe(
                    select(getTarefa),
                    takeUntil(this._unsubscribeDocs)
                ).subscribe((tarefa) => {
                    this.tarefaOrigem = tarefa;
                });
                this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
                this.minutasLoading$ = this._store.pipe(select(fromStore.getMinutasLoading));
                this.minutasSaving$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
                this._store.pipe(select(getDocumentosHasLoaded)).pipe(
                    takeUntil(this._unsubscribeDocs)
                ).subscribe(
                    loaded => this.loadedMinutas = loaded
                );
                this._changeDetectorRef.markForCheck();
                this.lixeiraMinutas$.pipe(
                    takeUntil(this._unsubscribeDocs)
                ).subscribe((lixeira) => {
                    this.lixeiraMinutas = lixeira;
                });

                this.documentosVinculadosPagination$.pipe(
                    takeUntil(this._unsubscribeAll)
                ).subscribe(pagination => this.documentosVinculadosPagination = pagination);

                this.documentosVinculados$.pipe(
                    takeUntil(this._unsubscribeAll)
                ).subscribe(documentosVinculados => this.documentosVinculados = documentosVinculados);

                this.documentos$.pipe(
                    filter(cd => !!cd),
                    takeUntil(this._unsubscribeDocs)
                ).subscribe(
                    (documentos) => {
                        this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa) && !documento.apagadoEm);
                        this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa && !documento.apagadoEm);

                        if (this.lixeiraMinutas) {
                            this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa) && documento.apagadoEm);
                            this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa && documento.apagadoEm);
                        }

                        this._changeDetectorRef.markForCheck();
                        if (this.documentoEdit.uuid && !this.documentoEdit.open) {
                            documentos.forEach((documento) => {
                                if (!documento.documentoAvulsoRemessa && documento.uuid === this.documentoEdit.uuid) {
                                    this.documentoEdit.open = true;
                                    this._store.dispatch(new fromStore.ClickedDocumento({
                                        documento: documento,
                                        routeAtividade: this.routeAtividadeDocumento,
                                        routeOficio: this.routeOficioDocumento
                                    }));
                                } else if (documento.documentoAvulsoRemessa && documento.documentoAvulsoRemessa.uuid === this.documentoEdit.uuid) {
                                    this.documentoEdit.open = true;
                                    this._store.dispatch(new fromStore.ClickedDocumento({
                                        documento: documento,
                                        routeAtividade: this.routeAtividadeDocumento,
                                        routeOficio: this.routeOficioDocumento
                                    }));
                                }
                            });
                        }
                    }
                );
            }
        });

        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('oficio') &&
                module.routerLinks[pathDocumento]['oficio'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeOficioDocumento = module.routerLinks[pathDocumento]['oficio'][this.routerState.params.generoHandle];
            }
        });

        this._store.dispatch(new fromStore.ExpandirProcesso(false));
    }

    ngAfterViewInit(): void {

        let path = 'app/main/apps/processo/sidebar';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    if (this.container !== undefined) {
                        this._dynamicService.loadComponent(c)
                            .then((componentFactory) => {
                                this.container.createComponent(componentFactory);
                                this._changeDetectorRef.markForCheck();
                            });
                    }
                }));
            }
        });
    }

    ngOnDestroy(): void {
        if (this.processoId) {
            this._mercureService.unsubscribe('juntadas_' + this.processoId);
        }
        this._changeDetectorRef.detach();

        this._store.dispatch(new fromStore.ExpandirProcesso(false));
        this._unsubscribeDocs.next(true);
        this._unsubscribeDocs.complete();
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    onScroll(): void {
        this.scrolled.emit();
    }

    /**
     *
     * @param juntadaId
     * @param restrito
     * @param componenteDigitalId
     * @param event
     */
    goToJuntada(juntadaId, restrito, componenteDigitalId = null, event = null): void {
        const step = juntadaId;
        let substep = 0;
        let stepHandle = juntadaId;

        if (event?.ctrlKey && componenteDigitalId) {
            this._store.dispatch(new fromStore.VisualizarJuntada(componenteDigitalId));
        } else {
            const juntada = this.index?.find(junt => junt.id === juntadaId);
            if (juntada === undefined) {
                this._store.dispatch(new fromStore.GetCapaProcesso());
                return;
            }

            if (!componenteDigitalId && juntada.ativo && juntada.componentesDigitais.length > 0) {
                substep = juntada.componentesDigitais[0];
                stepHandle += '-' + substep;
            } else if (componenteDigitalId && juntada.ativo && juntada.componentesDigitais.indexOf(componenteDigitalId) !== -1) {
                substep = componenteDigitalId;
                stepHandle += '-' + substep;
            } else {
                substep = null;
            }

            // Decide the animation direction
            this.animationDirection = this.currentStep.step < step ? 'left' : 'right';

            // Run change detection so the change
            // in the animation direction registered
            this._changeDetectorRef.detectChanges();

            let url = this.routerState.url.split('/processo/')[0] +
                '/processo/' +
                this.routerState.params.processoHandle;
            if (this.routerState.params.chaveAcessoHandle) {
                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
            }
            url += '/visualizar/' + stepHandle;
            this._router.navigateByUrl(url).then(() => {
                this._store.dispatch(new fromStore.SetCurrentStep({step: step, subStep: substep}));
                this.fecharSidebar();
            });
        }
    }

    compareAtivo(juntadas, index): boolean {
        let houveMudanca = false;
        juntadas.forEach((juntada) => {
            const indexEl = index.find((index) => index.id === juntada.id);
            if (juntada.ativo !== indexEl?.ativo) {
                houveMudanca = true;
            }
            if (!houveMudanca) {
                let componentesDigitaisIds = [];
                if (juntada.documento?.componentesDigitais) {
                    componentesDigitaisIds = juntada.documento.componentesDigitais.map(cd => cd.id);
                }
                if (juntada.documento?.vinculacoesDocumentos) {
                    juntada.documento.vinculacoesDocumentos.forEach((vd) => {
                        vd.documentoVinculado.componentesDigitais.forEach((dvcd) => {
                            componentesDigitaisIds.push(dvcd.id);
                        })
                    })
                }
                if (componentesDigitaisIds !== indexEl.componentesDigitais) {
                    houveMudanca = true;
                }
            }
        });
        return houveMudanca;
    }

    reload(params): void {
        this.novaJuntada = false;
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: false}));

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            processoId: this.processo.id,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort,
            default: true
        };
        this._store.dispatch(new fromStore.GetJuntadas(nparams));
    }

    reloadJuntadas(): void {
        this.novaJuntada = false;
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
        this._store.dispatch(new fromStore.ReloadJuntadas());
    }

    doTodasJuntadas(): void {
        let filtroOrigemDados = {};
        delete this.listFilter['origemDados.id'];
        this.selectedOrigemDados = 'todos';
        this.form.get('origemDados').setValue('');
        this.reload(filtroOrigemDados);
    }
    doAdmJuntadas(): void {
        let filtroOrigemDados;
        this.selectedOrigemDados = 'administrativo';
        filtroOrigemDados = {
            listFilter: {'origemDados.id': 'isNull'}
        };
        this.form.get('origemDados').setValue('administrativo');
        this.reload(filtroOrigemDados);
    }
    doIntegraJuntadas(): void {
        let filtroOrigemDados;
        this.selectedOrigemDados = 'integracao';
        filtroOrigemDados = {
            listFilter: {'origemDados.id': 'isNotNull'}
        };
        this.form.get('origemDados').setValue('integracao');
        this.reload(filtroOrigemDados);
    }

    offsetFunction: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element) => ({x: 0, y: 0});

    onStartDrag(event: DragEvent, juntada: Juntada): void {
        const customJuntada = JSON.stringify({
            id: juntada.id,
            vinculacoesDocumentos: juntada.documento.vinculacoesDocumentos?.length,
            vinculacaoDocumentoPrincipal: juntada.documento?.estaVinculada,
            ativo: juntada.ativo
        });
        event.dataTransfer.setData(customJuntada, '');
        this.draggedJuntada = juntada.id;
    }

    onCancelDrag(event: DragEvent): void {
        this.draggedJuntada = null;
    }

    onCopied(event: DragEvent, juntada: Juntada): void {
        this.draggedJuntada = null;
    }

    dragOver($event: DragEvent, element: HTMLElement, enabled: boolean): void {
        if (enabled && this.placeholderId !== element.id) {
            this.placeholderId = element.id;
            const elementClass = element.getAttribute('class').replace('custom-drag-over-disabled', '');
            element.setAttribute('class', elementClass + ' custom-drag-over');
            this._changeDetectorRef.detectChanges();
        }
        if (!enabled && element.getAttribute('class').indexOf('custom-drag-over-disabled') === -1) {
            this.placeholderId = null;
            element.setAttribute('class', element.getAttribute('class') + ' custom-drag-over-disabled');
            this._changeDetectorRef.detectChanges();
        }
    }

    /**
     * Verifica se é permitido arrastar juntada para uma determinada juntada
     * Caso a juntada já esteja vinculada como acessório em outra juntada, não permitir
     *
     * @param event: DndDropEvent
     * @param juntada: Juntada
     */
    dropzoneEnabledJuntada(event: DragEvent, juntada: Juntada): boolean {
        const tmpJuntadaArrastada = JSON.parse(event.dataTransfer.types[0]);
        const juntadaArrastada = this.juntadas?.find(aJuntada => aJuntada.id == tmpJuntadaArrastada.id);
        // eslint-disable-next-line max-len
        return juntadaArrastada.id !== juntada.id && juntadaArrastada.documento.vinculacoesDocumentos.length === 0 && !juntadaArrastada.documento?.estaVinculada && juntadaArrastada.ativo;
    }

    /**
     * Verifica se é permitido soltar juntada em uma determinado juntada
     *
     * @param event: DndDropEvent
     * @param juntada: Juntada
     */
    dropEnabledJuntada(event: DndDropEvent, juntada: Juntada): boolean {
        const juntadaArrastadaId = event.data;
        const juntadaArrastada = this.juntadas?.find(aJuntada => aJuntada.id == juntadaArrastadaId);
        // eslint-disable-next-line max-len
        return juntadaArrastadaId !== juntada.id && juntadaArrastada.documento.vinculacoesDocumentos.length === 0 && !juntadaArrastada.documento?.estaVinculada && juntadaArrastada.ativo;
    }

    onDrop($event, enabled: boolean): void {
        if (enabled) {
            const juntadaAcessorio = $event[0].data;
            const juntadaPrincipal = $event[1];
            // Navegar para vinculação de juntadas
            this._router.navigate([
                this.routerState.url.split('/visualizar/' + this.routerState.params.stepHandle)[0] +
                '/visualizar/' + this.routerState.params.stepHandle + '/vincular/' + juntadaPrincipal.id + '/' + juntadaAcessorio
            ]).then();
        }
        this.placeholderId = null;
    }

    checkModelo(): void {
        const value = this.formEditor.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.habilitarTipoDocumentoSalvar = false;
            this.formEditor.get('modelo').setValue(null);
        } else {
            this.habilitarTipoDocumentoSalvar = true;
        }
    }

    doSort(sort: string): void {
        this.sort = sort;
        this.listSort = {
            'numeracaoSequencial': sort
        };
        this.reload({listFilter: this.listFilter, listSort: this.listSort});
        this.sorted.emit(sort);
    }

    toggleFilter(): void {
        this.showListFilter = !this.showListFilter;
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];
        if (this.form.get('tipoDocumento').value) {
            andXFilter.push({'documento.tipoDocumento.id': `eq:${this.form.get('tipoDocumento').value.id}`});
        }

        if (this.form.get('numeracaoSequencial').value) {
            andXFilter.push({'numeracaoSequencial': `eq:${this.form.get('numeracaoSequencial').value}`});
        }

        if (this.form.get('descricao').value) {
            this.form.get('descricao').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'descricao': `like:%${bit}%`});
            });
        }

        if (this.form.get('criadoPor').value) {
            andXFilter.push({'criadoPor.id': `eq:${this.form.get('criadoPor').value.id}`});
        }

        if (this.form.get('unidade').value) {
            andXFilter.push({'documento.setorOrigem.unidade.id': `eq:${this.form.get('unidade').value.id}`});
        }

        if (this.form.get('origemDados').value) {
            if (this.form.get('origemDados').value === 'administrativo') {
                andXFilter.push({'origemDados.id': 'isNull'});
            } else if (this.form.get('origemDados').value === 'integracao') {
                andXFilter.push({'origemDados.id': 'isNotNull'});
            }
        }

        if (this.form.get('idDocumento').value) {
            andXFilter.push({'documento.id': `eq:${this.form.get('idDocumento').value}`});
        }

        if (this.form.get('numeroUnicoDocumento').value) {
            andXFilter.push({'documento.numeroUnicoDocumento.sequencia': `eq:${this.form.get('numeroUnicoDocumento').value}`});
        }

        if (this.selectedVolume) {
            andXFilter.push({'volume.id': `eq:${this.selectedVolume}`});
        }

        const request = {
            filters: {},
        };
        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }
        this.selectedOrigemDados = this.form.get('origemDados').value;
        this.listFilter = request.filters;
        this.reload({listFilter: this.listFilter, listSort: this.listSort});
        this.toggleFilter();
    }

    pesquisar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset({origemDados: ''});
        this.selectedOrigemDados = 'todos';
        this._store.dispatch(new fromStore.SelectVolume(false));
        this.emite();
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    doEditor(): void {
        const modelo = this.formEditor.get('modelo').value;

        //this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.tarefaOrigem,
            processoOrigem: this.processo,
            routeAtividadeDocumento: this.routeAtividadeDocumento,
            operacaoId: operacaoId
        }));
        this.formEditor.get('modelo').setValue(null);
        this.menuTriggerList.closeMenu();
    }

    onClickedMinuta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento({
            documento: documento,
            routeAtividade: this.routeAtividadeDocumento,
            routeOficio: this.routeOficioDocumento
        }));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
    }

    criarOficio(): void {
        this._router.navigate([
            this.routerState.url.split('/visualizar/' + this.routerState.params.stepHandle)[0] +
            '/visualizar/' + this.routerState.params.stepHandle + '/oficio'
        ]).then();
    }

    showModelosGrid(): void {
        this.autoCompleteModelos.closePanel();
        this._changeDetectorRef.markForCheck();
        this.menuTriggerList.closeMenu();
        this._changeDetectorRef.markForCheck();
        this._router.navigate([
            this.routerState.url.split('/visualizar/' + this.routerState.params.stepHandle)[0] +
            '/visualizar/' + this.routerState.params.stepHandle + '/modelos/modelo'
        ]).then(() => {
            this.closeAutocomplete();
        });
    }

    doVisualizarModelo(): void {
        this._store.dispatch(new fromStore.VisualizarModelo(this.formEditor.get('modelo').value.documento?.componentesDigitais[0].id));
    }

    closeAutocomplete(): void {
        this.autoCompleteModelos.closePanel();
        this.formEditor.get('modelo').setValue(null);
        this._changeDetectorRef.markForCheck();
    }

    doAssinatura(documento: Documento): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            result.documento = documento;
            this.assinaDocumento(result);
            assinaSub.unsubscribe();
        });
    }

    assinaDocumento(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento,
                    operacaoId: operacaoId
                }));
            });
        }

    }

    doAssinaturaJuntada(documento: Documento, juntadaId: number): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) => {
            result.documento = documento;
            if (result.certificadoDigital) {
                this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
            } else {
                result.documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: result.documento,
                        operacaoId: operacaoId
                    }));
                });
            }
        });
    }

    doAdicionarVinculacao(juntadaId: number): void {
        this._router.navigate([
            this.routerState.url.split('/visualizar/' + this.routerState.params.stepHandle)[0] +
            '/visualizar/' + this.routerState.params.stepHandle + '/vincular/' + juntadaId
        ]).then();
    }

    doRemoverVinculacoes(juntada: Juntada): void {
        if (juntada.documento.vinculacoesDocumentos.length === 1) {
            this.confirmDialogRef = this.dialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    message: 'Deseja realmente remover as vinculações da juntada?',
                    cancelLabel: 'Não',
                },
                disableClose: false
            });

            this.confirmDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    juntada.documento.vinculacoesDocumentos.forEach(vinculacao => this.removeVinculacao(vinculacao, juntada.documento.id));
                }
            });
        } else {
            // Possui mais de uma vinculação de documento
            // Ativar o modo de remoção de vinculações de documento
            this._store.dispatch(new fromStore.SetActiveCard('juntadas-desvincular'));
        }
    }

    removeVinculacao(vinculacao: VinculacaoDocumento, documentoId: number): void {
        this._store.dispatch(new fromStore.RemoveVinculacaoDocumento({
            vinculacaoDocumento: vinculacao,
            documentoId: documentoId,
            processoId: this.processo.id
        }));
    }

    doDesentranharSimples(juntadaId: number): void {
        this._router.navigate([
            this.routerState.url.split('/visualizar/' + this.routerState.params.stepHandle)[0] +
            '/visualizar/' + this.routerState.params.stepHandle + '/desentranhar/' + juntadaId
        ]).then();
    }

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumentoMinutas').value;
        if (!value || typeof value !== 'object') {
            this.habilitarTipoDocumentoSalvar = false;
            this.form.get('tipoDocumentoMinutas').setValue(null);
        } else {
            this.habilitarTipoDocumentoSalvar = true;
        }
    }

    salvarTipoDocumento(documento: Documento): void {
        const tipoDocumento = this.form.get('tipoDocumentoMinutas').value;
        this.menuTrigger?.closeMenu();
        this.doAlterarTipoDocumento({documento: documento, tipoDocumento: tipoDocumento});
        this.form.get('tipoDocumentoMinutas').setValue(null);
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doDelete(documento: Documento, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documento.id,
            operacaoId: operacaoId,
            loteId: loteId,
            redo: [
                new fromStore.DeleteDocumento({
                    documentoId: documento.id,
                    operacaoId: operacaoId,
                    loteId: loteId,
                    redo: 'inherent',
                    undo: 'inherent'
                    // redo e undo são herdados da ação original
                }),
                new fromStore.DeleteDocumentoFlush()
            ],
            undo: new fromStore.UndeleteDocumento({
                documento: documento,
                operacaoId: operacaoId,
                loaded: this.loadedMinutas,
                redo: null,
                undo: null
            })
        }));

        if (this.snackSubscription) {
            // temos um snack aberto, temos que ignorar
            this.snackSubscription.unsubscribe();
            this.sheetRef.dismiss();
            this.snackSubscription = null;
        }

        this.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletado(s)'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteDocumentoCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteDocumentoFlush());
            }
            this.snackSubscription.unsubscribe();
            this.snackSubscription = null;
        });
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais?.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadToP7S(componenteDigital.id));
        });
    }

    doAbreMinutaOutraAba(documento: Documento): void {
        window.open(
            this.routerState.url.split('/capa/')[0] + '/documento/' + documento.id
            + '/(componente-digital/' + documento.id + '/editor/ckeditor//sidebar:editar/atividade)'
        );
    }

    goToCapaProcesso(): void {
        this._store.dispatch(new fromStore.GetCapaProcesso());
        this.fecharSidebar();
    }

    enviarDocumentoEmail(juntadaId): void {
        this._router.navigateByUrl(this.routerState.url.split('/processo/' +
                this.routerState.params.processoHandle +
                '/visualizar')[0] + '/processo/' +
            this.routerState.params.processoHandle + '/envia-email/' + juntadaId).then();
    }

    doRestaurar(documento: Documento): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.UndeleteDocumento({
            documento: documento,
            operacaoId: operacaoId,
            redo: null,
            undo: null
        }));
    }

    expandirTela(valor: boolean): void {
        this._store.dispatch(new fromStore.ExpandirProcesso(valor));
    }

    filtraVolume(volume: Volume): void {
        this._store.dispatch(new fromStore.SelectVolume(volume.id));
    }

    paginaVolumes(): void {
        if (this.volumes.length >= this.volumesPagination.total) {
            return;
        }

        const nparams = {
            ...this.volumesPagination,
            offset: this.volumesPagination.offset + this.volumesPagination.limit
        };

        this._store.dispatch(new fromStore.GetVolumes(nparams));
    }

    doJuntadaOutraAba(documento: Documento, juntada: Juntada): void {
        if (this.routerState.params.stepHandle !== 'capa' && this.routerState.params.stepHandle === 'latest') {
            if ((documento?.vinculacoesDocumentos.length > 0 || documento?.componentesDigitais.length > 1) &&
                juntada.id === Number(this.routerState.params.stepHandle.split('-')[0])) {
                this._store.dispatch(new fromStore.VisualizarJuntada(this.routerState.params.stepHandle.split('-')[1]));
                return;
            }
        } else if (this.isCurrent(juntada.id)) {
            this._store.dispatch(new fromStore.VisualizarJuntada(this.currentStep.subStep));
            return;
        }
        this._store.dispatch(new fromStore.VisualizarJuntada(documento?.componentesDigitais[0].id));
    }

    uploadAnexo(documento: Documento): void {
        this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
        const documentoId = `eq:${documento.id}`;

        const params = {
            filter: {
                'vinculacaoDocumentoPrincipal.documento.id': documentoId,
                'juntadaAtual': 'isNull'
            },
            limit: 10,
            offset: 0,
            sort: {id: 'DESC'},
            populate: [
                'tipoDocumento',
                'vinculacaoDocumentoPrincipal',
                'vinculacaoDocumentoPrincipal.documento',
                'vinculacaoDocumentoPrincipal.documento.componentesDigitais',
                'componentesDigitais',
                'processoOrigem',
                'setorOrigem',
                'tarefaOrigem',
                'tarefaOrigem.usuarioResponsavel',
                'tarefaOrigem.vinculacoesEtiquetas',
                'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
            ],
            context: {'incluiVinculacaoDocumentoPrincipal': true}
        };
        this._store.dispatch(new fromStore.GetDocumentosVinculados({filters: params, documento: documento}));
        const dialogRef = this.dialog.open(CdkUploadDialogComponent, {
            width: '600px',
            data: {
                documento: documento,
                saving$: this.isSaving$,
                isLoading$: this.isLoadingDocumentosVinculados$,
                documentosVinculados$: this.documentosVinculados$,
                selectedDocumentosVinculados$: this.selectedDocumentosVinculados$,
                deletingDocumentosVinculadosId$: this.deletingDocumentosVinculadosId$,
                assinandoDocumentosVinculadosId$: this.assinandoDocumentosId$,
                removendoAssinaturaDocumentosVinculadosId$: this.removendoAssinaturaDocumentosId$,
                alterandoDocumentosId$: this.alterandoDocumentosVinculadosId$,
                downloadP7SDocumentosId$: this.downloadP7SDocumentosId$,
                documentosPagination$: this.documentosVinculadosPagination$
            }
        });
        // Subscribe nos eventos do componente
        const alteraTipoSub = dialogRef.componentInstance.alteraTipoDocumento.subscribe((values) => {
            this._store.dispatch(new fromStore.UpdateDocumentoVinculado(values));
        });
        const aprovaSub = dialogRef.componentInstance.aprovarDocumento.subscribe((aDocumento: Documento) => {
            this._store.dispatch(new fromStore.AprovarComponenteDigital({
                documentoOrigem: aDocumento
            }));
            this.dialog.closeAll();
        });
        const atualizaSub = dialogRef.componentInstance.atualizaDocumentosVinculados.subscribe((aDocumento: Documento) => {
            this._store.dispatch(new fromStore.GetDocumentosVinculados(aDocumento));
        });
        const assinaBlocoSub = dialogRef.componentInstance.assinaBloco.subscribe((result) => {
            if (result.certificadoDigital) {
                const documentosId = [];
                result.documentos.forEach((aDocumento) => {
                    documentosId.push(aDocumento.id);
                });
                this._store.dispatch(new AssinaturaStore.AssinaDocumento(documentosId));
            } else {
                const loteId = CdkUtils.makeId();
                result.documentos.forEach((aDocumento) => {
                    aDocumento.componentesDigitais.forEach((componenteDigital) => {
                        const assinatura = new Assinatura();
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;

                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: aDocumento,
                            operacaoId: operacaoId,
                            loteId: loteId
                        }));
                    });
                });
            }
        });
        const assinaSub = dialogRef.componentInstance.assina.subscribe((result) => {
            if (result.certificadoDigital) {
                this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
            } else {
                result.documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: result.documento,
                        operacaoId: operacaoId
                    }));
                });
            }
        });
        const changeSelectedSub = dialogRef.componentInstance.changeSelected.subscribe((selectedIds) => {
            this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
        });
        const clickedSub = dialogRef.componentInstance.clickDocumento.subscribe((aDocumento) => {
            this._store.dispatch(new fromStore.ClickedDocumento({
                documento: aDocumento,
                routeAtividade: this.routeAtividadeDocumento,
                routeOficio: this.routeOficioDocumento
            }));
            dialogRef.close();
        });
        const completeSub = dialogRef.componentInstance.completeDocumentoVinculado.subscribe(() => {
            this._store.dispatch(new fromStore.SetSavingComponentesDigitais());
        });
        const deleteSub = dialogRef.componentInstance.deleteDocumento.subscribe((result) => {
            this.doDeleteDocumentoVinculado(result.documentoId, result.loteId);
        });
        const downloadP7SSub = dialogRef.componentInstance.downloadP7S.subscribe((aDocumento: Documento) => {
            aDocumento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
                this._store.dispatch(new fromStore.DownloadVinculadoP7S(componenteDigital));
            });
        });
        const getMoreSub = dialogRef.componentInstance.getMore.subscribe(() => {
            if (this.documentosVinculados.length >= this.documentosVinculadosPagination.total) {
                return;
            }

            const nparams = {
                ...this.documentosVinculadosPagination,
                offset: this.documentosVinculadosPagination.offset + this.documentosVinculadosPagination.limit
            };

            this._store.dispatch(new fromStore.GetDocumentosVinculados({filters: nparams, documento: documento}));
        });
        const removeAssinaturaSub = dialogRef.componentInstance.removeAssinatura.subscribe((docId: number) => {
            this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(docId));
        });
        // Unsubscribe em todas as assinaturas de eventos
        dialogRef.afterClosed().subscribe(() => {
            alteraTipoSub.unsubscribe();
            aprovaSub.unsubscribe();
            atualizaSub.unsubscribe();
            assinaBlocoSub.unsubscribe();
            assinaSub.unsubscribe();
            changeSelectedSub.unsubscribe();
            clickedSub.unsubscribe();
            completeSub.unsubscribe();
            deleteSub.unsubscribe();
            downloadP7SSub.unsubscribe();
            getMoreSub.unsubscribe();
            removeAssinaturaSub.unsubscribe();
            this._store.dispatch(new fromStore.ReloadDocumento(documento.id));
            this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
        });
    }

    aprovar(documento: Documento): void {
        this._store.dispatch(new fromStore.AprovarComponenteDigital({
            documentoOrigem: documento
        }));
        this.aprovarDocumento.emit(documento);
    }

    doDeleteDocumentoVinculado(documentoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado({
            documentoId: documentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doTogglePanel(id): void {
        this.isOpen[id] = !this.isOpen[id];
    }

    onScrollBookmark(): void {
        if (this.bookmarks.length >= this.paginationBookmark.total) {
            return;
        }

        const nparams = {
            filter: this.paginationBookmark.filter,
            sort: this.paginationBookmark.sort,
            limit: this.paginationBookmark.limit,
            offset: this.paginationBookmark.offset + this.paginationBookmark.limit,
            populate: this.paginationBookmark.populate
        };

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.GetBookmarks({
            params: nparams,
            operacaoId: operacaoId
        }));
    }

    abreJuntadas(): void {
        SharedBookmarkService.pagina = null;
        this._store.dispatch(new fromStore.SetActiveCard('juntadas'));
        this._store.dispatch(new fromStore.SetCurrentStep(this.currentStep));
    }

    reloadBookmarks(): void {
        this._store.dispatch(new fromStore.ReloadBookmarks());
    }

    getBookmark(): void {
        this._store.dispatch(new fromStore.SetActiveCard('bookmark'));
        this.bookMarkselected = 0;
        this._store.dispatch(new fromStore.ReloadBookmarks());
    }

    viewBookmark(bookmark: any, pagina: any, key: any): void {
        this.bookMarkselected = bookmark.id;
        this.bookMarkJuntadaselected = key;
        SharedBookmarkService.juntadaAtualSelect = bookmark.juntada;
        SharedBookmarkService.pagina = pagina;
        this._store.dispatch(new fromStore.SetBinaryView({
            juntadaId: bookmark.juntada.id,
            componenteDigitalId: bookmark.componenteDigital.id,
            pagina: pagina
        }));
    }

    deleteBookmark(bookmarkId: any): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteBookmark({
            bookmarkId: bookmarkId,
            operacaoId: operacaoId,
        }));
    }

    doCopyNumDoc(numDoc: string): void {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (numDoc));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }

    doCopyBookmark(bookmarks: any[] = []): void {
        let copyBookmark = '';
        bookmarks.forEach((book) => {
            book.value.forEach((b) => {
                copyBookmark += '- ' + JSON.stringify(b.nome)
                    + ' (Sequencial:' + JSON.stringify(book.key)
                    + ', Página:' + JSON.stringify(b.pagina)
                    + ',' + JSON.stringify(b.componenteDigital.fileName) + ')\r\n\n';
                if (b.descricao) {
                    copyBookmark += '     ' + JSON.stringify((b.descricao)) + '\r\n\n';
                }
            })
        });
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (copyBookmark));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }

    isCurrent(juntadaId: number, componenteDigitalId: any = null): boolean {
        if (componenteDigitalId && this.currentStep.step === 0) {
            // latest ou inicial
            const juntadaLatest = this.index.find(juntada => juntada.componentesDigitais.includes(this.currentStep.subStep));
            return !this.capa && juntadaLatest && juntadaId === juntadaLatest.id && this.currentStep.subStep === componenteDigitalId;
        }
        if (!componenteDigitalId) {
            if (this.currentStep.step === 0) {
                // latest ou inicial
                const juntadaLatest = this.index.find(juntada => juntada.componentesDigitais.includes(this.currentStep.subStep));
                return juntadaLatest && !this.capa && juntadaId === juntadaLatest.id;
            }
            return !this.capa && juntadaId === this.currentStep.step;
        }
        return !this.capa && !!this.index && this.currentStep.step === juntadaId && this.currentStep.subStep === componenteDigitalId;
    }

    isCompleted(juntadaId: number): boolean {
        if (this.index) {
            const juntada = this.index?.find(junt => junt.id === juntadaId);
            let currentJuntada;
            if (this.currentStep.step === 0) {
                // latest ou inicial
                currentJuntada = this.index.find(juntada => juntada.componentesDigitais.includes(this.currentStep.subStep));
            } else {
                currentJuntada = this.index?.find(junt => junt.id === this.currentStep.step);
            }
            if (this.sort === 'ASC') {
                return !this.capa && juntada?.numeracaoSequencial < currentJuntada?.numeracaoSequencial;
            }
            return !this.capa && juntada?.numeracaoSequencial > currentJuntada?.numeracaoSequencial;
        }
    }

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar(this.name)?.isLockedOpen) {
            this._cdkSidebarService.getSidebar(this.name).close();
        }
    }

    doDeleteRestricoesDocs(processoId: string): void {
        this.confirmDialogRef = this.dialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'Este procedimento retira todas as ' +
                    'Restrições dos Documentos que o usuário tem acesso.' +
                    ' Deseja realmente continuar?'
            },
            disableClose: false
        });
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._store.dispatch(new fromStore.DeleteVisibilidadeDocumentos({
                    processoId: processoId
                }));
            }
            this.confirmDialogRef = null;
            this.documentosRestritosErros = this.documentosRestritos;
            this.documentosRestritos = [];
            this.reloadJuntadas();
        });
    }

    doModoSelecao(): void {
        this._store.dispatch(new fromStore.SetActiveCard('juntadas-select'));
    }

    doModoAssinatura(): void {
        this._store.dispatch(new fromStore.SetActiveCard('juntadas-assinar'));
    }

    doCancelarModoSelecao(): void {
        this._store.dispatch(new fromStore.SetActiveCard('juntadas'));
    }

    doCancelarModoRemoverVinculacoes(): void {
        this._store.dispatch(new fromStore.SetActiveCard('juntadas'));
    }

    doCancelarAssinaturas(): void {
        this._store.dispatch(new fromStore.SetActiveCard('juntadas'));
    }

    doToggleSelectJuntadaId(id: number): void {
        this._store.dispatch(new fromStore.ToggleSelectJuntadaId(id));
    }

    doToggleSelectJuntadaVinculadaId(id: number): void {
        this._store.dispatch(new fromStore.ToggleSelectJuntadaVinculadaId(id));
    }

    doDownloadJuntadasSelecionadas(formato: string): void {
        let numeracoesSequenciais = [];
        this.selectedJuntadasId
            .map((id) => this.juntadas.find((juntada) => juntada.id === id))
            .forEach((juntada) => {
                numeracoesSequenciais = [
                    numeracoesSequenciais.filter(numeracaoSequencial => numeracaoSequencial !== juntada.numeracaoSequencial),
                    juntada.numeracaoSequencial
                ];

                juntada.documento.vinculacoesDocumentos.forEach((vinculacaoDocumento) => {

                    numeracoesSequenciais = [
                        numeracoesSequenciais.filter(numeracaoSequencial => numeracaoSequencial !== vinculacaoDocumento.documentoVinculado.juntadaAtual.numeracaoSequencial),
                        vinculacaoDocumento.documentoVinculado.juntadaAtual.numeracaoSequencial
                    ];
                });
            });


        const params = {
            sequencial: numeracoesSequenciais
                .sort()
                .join(','),
            tipoDownload: formato
        }

        this._store.dispatch(new fromStore.DownloadProcesso(params));
    }

    doAssinarJuntadasSelecionadas(): void {
        let documentos = [];

        this.selectedJuntadasId
            .map((id) => this.juntadas.find((juntada) => juntada.id === id))
            .forEach((juntada) => {
                documentos.push(juntada.documento);
            });

        this.juntadas.forEach((juntada) => {
            if((this.selectedJuntadasVinculadasId.length > 0) && (juntada.documento.vinculacoesDocumentos.length > 0)){
                console.log(juntada);
                this.selectedJuntadasVinculadasId
                    .map((id) => juntada.documento.vinculacoesDocumentos.find((vinculacaoDocumento) =>
                        vinculacaoDocumento.documentoVinculado.juntadaAtual.id === id))
                    .forEach((vinculacaoDocumento) => documentos.push(vinculacaoDocumento.documentoVinculado));
            }
        });

        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });
        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            assinaSub.unsubscribe();
            if (result.certificadoDigital) {
                documentos.forEach((documento) =>{
                        this._store.dispatch(new AssinaturaStore.AssinaDocumento([documento.id]));
                    }
                )
            } else {
                documentos.forEach((documento) =>{
                    documento.componentesDigitais.forEach((componenteDigital) => {
                        const assinatura = new Assinatura();
                        assinatura.componenteDigital = componenteDigital;
                        assinatura.algoritmoHash = 'A1';
                        assinatura.cadeiaCertificadoPEM = 'A1';
                        assinatura.cadeiaCertificadoPkiPath = 'A1';
                        assinatura.assinatura = 'A1';
                        assinatura.plainPassword = result.plainPassword;
                        const operacaoId = CdkUtils.makeId();
                        this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                            assinatura: assinatura,
                            documento: documento,
                            componenteDigital: componenteDigital,
                            operacaoId: operacaoId
                        }));
                    });
                });
            }
        });
    }
}
