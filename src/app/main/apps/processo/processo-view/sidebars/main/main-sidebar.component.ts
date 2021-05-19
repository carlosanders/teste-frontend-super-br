import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Assinatura, ComponenteDigital, Documento, Juntada, Pagination, Processo, Tarefa, Volume} from '@cdk/models';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {getDocumentosHasLoaded, getSelectedVolume, getVolumes} from '../../store';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, filter, take, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {getMercureState, getRouterState} from '../../../../../../store';
import {getProcesso} from '../../../store';
import {modulesConfig} from '../../../../../../../modules/modules-config';
import {MatMenuTrigger} from '@angular/material/menu';
import {GetTarefa, getTarefa} from '../../../../tarefas/tarefa-detail/store';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {LoginService} from '../../../../../auth/login/login.service';
import {CdkUtils} from '@cdk/utils';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {MatDialog} from '@angular/material/dialog';
import {CdkAssinaturaEletronicaPluginComponent} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {CdkModeloAutocompleteComponent} from "@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.component";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {getAssinandoDocumentosEletronicamenteId, getAssinandoDocumentosId} from "../../../../tarefas/store";

@Component({
    selector: 'processo-view-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoViewMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    private _unsubscribeDocs: Subject<any> = new Subject();

    sort: string = 'DESC';

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

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

    isLoading$: Observable<boolean>;

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;

    index$: Observable<any>;
    index: {};

    animationDirection: 'left' | 'right' | 'none';

    pagination$: any;
    pagination: any;

    listFilter: {} = {};
    listSort: {} = {};

    showListFilter = false;

    form: FormGroup;

    assinaturaInterval = null;
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoTarefaDocumentosId$: Observable<number[]>;
    assinandoTarefaEletronicamenteDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentoIds$: Observable<number[]>;
    javaWebStartOK = false;
    lixeiraMinutas$: Observable<boolean>;
    loadingDocumentosExcluidos$: Observable<boolean>;

    lixeiraMinutas: boolean;

    @Input()
    capaProcesso: boolean;

    @Input()
    capa: boolean = true;

    tarefa$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    tarefa: boolean;

    @Output()
    scrolled = new EventEmitter<any>();

    @ViewChild('menuTriggerList') menuTriggerList: MatMenuTrigger;

    volumesPagination$: Observable<any>;
    volumesPagination: any;

    routerState: any;

    links: any;

    formEditor: FormGroup;

    habilitarTipoDocumentoSalvar = false;

    modeloPagination: Pagination;

    tipoDocumentoPagination: Pagination;

    loadedMinutas: any;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    routeAtividadeDocumento = 'atividade';
    routeOficioDocumento = 'oficio';

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    @ViewChild('menuTriggerOficios') menuTriggerOficios: MatMenuTrigger;

    @ViewChild('autoCompleteModelos', {static: false, read: MatAutocompleteTrigger})
    autoCompleteModelos: MatAutocompleteTrigger;

    minutasLoading$: Observable<boolean>;

    minutasSaving$: Observable<boolean>;

    minutasOpen = true;

    sheetRef: MatSnackBarRef<SnackBarDesfazerComponent>;
    snackSubscription: any;
    lote: string;
    documentoEdit: any = {uuid: null, open: false};

    formEditorValid = false;

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
     * @param _snackBar
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
        private _snackBar: MatSnackBar
    ) {
        this.form = this._formBuilder.group({
            volume: [null],
            tipoDocumento: [null],
            tipoDocumentoMinutas: [null]
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
        this.index$ = this._store.pipe(select(fromStore.getIndex));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.volumesPagination$ = this._store.pipe(select(fromStore.getVolumesPagination));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.volumes$ = this._store.pipe(select(getVolumes));
        this.selectedVolume$ = this._store.pipe(select(getSelectedVolume));

        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.assinandoTarefaDocumentosId$ = this._store.pipe(select(getAssinandoDocumentosId));
        this.assinandoTarefaEletronicamenteDocumentosId$ = this._store.pipe(select(getAssinandoDocumentosEletronicamenteId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.lixeiraMinutas$ = this._store.pipe(select(fromStore.getLixeiraMinutas));
        this.loadingDocumentosExcluidos$ = this._store.pipe(select(fromStore.getLoadingDocumentosExcluidos));
        this.downloadP7SDocumentoIds$ = this._store.pipe(select(fromStore.getDownloadDocumentoP7SId));

        this.tipoDocumentoPagination = new Pagination();

        this.juntadas$.pipe(filter(juntadas => !!juntadas)).subscribe(
            juntadas => {
                this.juntadas = juntadas;
                this.totalSteps = juntadas.length;

                this.juntadasByVolume = CdkUtils.groupArrayByFunction(juntadas, juntada => juntada.volume.numeracaoSequencial);
            }
        );

        this.currentStep$.subscribe(
            currentStep => {
                this.currentStep = currentStep;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.index$.subscribe(
            index => this.index = index
        );

        this.selectedVolume$.subscribe(
            volume => this.selectedVolume = volume
        );

        this.pagination$.subscribe(
            pagination => this.pagination = pagination
        );

        this.volumesPagination$.subscribe(
            pagination => this.volumesPagination = pagination
        );

        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.volumes$.subscribe(
            volumes => this.volumes = volumes
        );

        this.formEditor.get('modelo').valueChanges.subscribe(value => {
            this.formEditorValid = value && typeof value === 'object';
        });

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;

                this.tarefa$.next(!!(this.routerState.params.tarefaHandle) && this.routerState.url.indexOf('/documento/') === -1);
            }
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
        /*
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.modeloPagination.filter.orX = [
                ...this.modeloPagination.filter.orX,
                {
                    // Modelos do setor
                    'modalidadeModelo.valor': 'eq:LOCAL',
                    'vinculacoesModelos.setor.id': 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')
                },
                {
                    // Modelos da unidade por especie de setor
                    'modalidadeModelo.valor': 'eq:LOCAL',
                    'vinculacoesModelos.unidade.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                },
                {
                    // Modelos nacionais
                    'modalidadeModelo.valor': 'eq:NACIONAL',
                    'vinculacoesModelos.modalidadeOrgaoCentral.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                }

            ];
        }
        */
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.tarefa$
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged((x, y) => {
                    return x === y && this.documentoEdit.uuid === this.routerState.queryParams.documentoEdit;
                }),
            )
            .subscribe((value) => {
                this.tarefa = value;
                this.documentoEdit.uuid = this.routerState.queryParams.documentoEdit;
                this.documentoEdit.open = false;
                if (value) {
                    this._unsubscribeDocs.next();
                    this._unsubscribeDocs.complete();
                    this._unsubscribeDocs = new Subject();
                    this._store.pipe(select(getTarefa)).pipe(
                        takeUntil(this._unsubscribeDocs)
                    ).subscribe(tarefa => {
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
                    ).subscribe(lixeira => {
                        this.lixeiraMinutas = lixeira;
                    });
                    this.documentos$.pipe(
                        filter(cd => !!cd),
                        takeUntil(this._unsubscribeDocs)
                    ).subscribe(
                        documentos => {
                            this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa) && !documento.apagadoEm);
                            this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa && !documento.apagadoEm);

                            if (this.lixeiraMinutas) {
                                this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa) && documento.apagadoEm);
                                this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa && documento.apagadoEm);
                            }

                            this._changeDetectorRef.markForCheck();
                            if (this.documentoEdit.uuid && !this.documentoEdit.open) {
                                documentos.forEach(documento => {
                                    if (documento.uuid === this.documentoEdit.uuid) {
                                        this.documentoEdit.open = true;
                                        this._store.dispatch(new fromStore.ClickedDocumento({
                                            documento: documento,
                                            routeAtividade: this.routeAtividadeDocumento,
                                            routeOficio: this.routeOficioDocumento
                                        }));
                                    }
                                })
                            }
                        }
                    );
                    this._store
                        .pipe(
                            select(getMercureState),
                            takeUntil(this._unsubscribeDocs)
                        ).subscribe(message => {
                        if (message && message.type === 'assinatura') {
                            switch (message.content.action) {
                                case 'assinatura_iniciada':
                                    this.javaWebStartOK = true;
                                    break;
                                case 'assinatura_cancelada':
                                    this.javaWebStartOK = false;
                                    this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                                    break;
                                case 'assinatura_erro':
                                    this.javaWebStartOK = false;
                                    this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                                    break;
                                case 'assinatura_finalizada':
                                    this.javaWebStartOK = false;
                                    this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                                    this._store.dispatch(new UpdateData<Documento>({
                                        id: message.content.documentoId,
                                        schema: documentoSchema,
                                        changes: {assinado: true}
                                    }));
                                    break;
                            }
                        }
                    });

                    this.assinandoDocumentosId$.pipe(
                        takeUntil(this._unsubscribeDocs)
                    ).subscribe(assinandoDocumentosId => {
                        if (assinandoDocumentosId.length > 0) {
                            this.assinaturaInterval = setInterval(() => {
                                // monitoramento do java
                                if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                                    assinandoDocumentosId.forEach(
                                        documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                                    );
                                }
                            }, 30000);
                        } else {
                            clearInterval(this.assinaturaInterval);
                        }
                        this.assinandoDocumentosId = assinandoDocumentosId;
                    });
                }
            });

        this.form.get('tipoDocumento').valueChanges.subscribe(value => {
            if (typeof value === 'object' && value) {
                this.listFilter = {
                    ...this.listFilter,
                    'documento.tipoDocumento.id': `eq:${value.id}`
                };
            } else {
                if (this.listFilter.hasOwnProperty('documento.tipoDocumento.id')) {
                    delete this.listFilter['documento.tipoDocumento.id'];
                }
            }
        });

        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('oficio') &&
                module.routerLinks[pathDocumento]['oficio'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeOficioDocumento = module.routerLinks[pathDocumento]['oficio'][this.routerState.params.generoHandle];
            }
        });

        this._store.dispatch(new fromStore.ExpandirProcesso(false));
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.ExpandirProcesso(false));
        this._unsubscribeDocs.next();
        this._unsubscribeDocs.complete();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onScroll(): void {
        this.scrolled.emit();
    }

    /**
     *
     * @param step
     * @param ativo
     * @param componenteDigitalId
     */
    gotoStep(step, ativo, componenteDigitalId = null): void {
        let substep = 0;

        if (this.juntadas[step] === undefined) {
            this._store.dispatch(new fromStore.GetCapaProcesso());
            return;
        }

        if (componenteDigitalId) {
            substep = this.index[step].indexOf(componenteDigitalId);
        }

        // Decide the animation direction
        this.animationDirection = this.currentStep.step < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        if (this.routerState.url.indexOf('/documento/') !== -1) {
            let arrPrimary = [];
            arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                'visualizar-processo' : 'anexar-copia');
            this.routerState.params['processoCopiaHandle'] ?
                arrPrimary.push(this.routerState.params.processoCopiaHandle) : arrPrimary.push(this.routerState.params.processoHandle);
            if (this.routerState.params.chaveAcessoHandle) {
                arrPrimary.push('chave');
                arrPrimary.push(this.routerState.params.chaveAcessoHandle);
            }
            arrPrimary.push('visualizar');
            arrPrimary.push(step + '-' + substep);
            // Navegação do processo deve ocorrer por outlet
            this._router.navigate(
                [
                    this.routerState.url.split('/documento/')[0] + '/documento/' +
                    this.routerState.params.documentoHandle,
                    {
                        outlets: {
                            primary: arrPrimary
                        }
                    }
                ],
                {
                    relativeTo: this._activatedRoute.parent
                }
            ).then(() => {
                this._store.dispatch(new fromStore.SetCurrentStep({step: step, subStep: substep}));
            });
        } else {
            let url = this.routerState.url.split('/processo/')[0] +
                '/processo/' +
                this.routerState.params.processoHandle;
            if (this.routerState.params.chaveAcessoHandle) {
                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
            }
            url += '/visualizar/' + step + '-' + substep;
            this._router.navigateByUrl(url).then(() => {
                this._store.dispatch(new fromStore.SetCurrentStep({step: step, subStep: substep}));
            });
        }
    }

    reload(params): void {
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: false}));

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
        };

        this._store.dispatch(new fromStore.GetJuntadas(nparams));
    }

    reloadDocumentos(): void {
        this._store.dispatch(new fromStore.UnloadDocumentos());

        this._store.dispatch(new fromStore.GetDocumentos());
    }

    onOpenMinutas(): void {
        this.minutasOpen = true;
    }

    onCloseMinutas(): void {
        this.minutasOpen = false;
        this.reloadDocumentos();
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
        this.listSort = {'volume.numeracaoSequencial': sort, 'numeracaoSequencial': sort};
        this.reload({listFilter: this.listFilter, listSort: this.listSort});
    }

    toggleFilter(): void {
        this.showListFilter = !this.showListFilter;
    }

    pesquisar(): void {
        if (this.selectedVolume) {
            this.listFilter = {
                ...this.listFilter,
                'volume.id': `eq:${this.selectedVolume}`
            };
        }
        this.reload({listFilter: this.listFilter, listSort: this.listSort});
        this.toggleFilter();
    }

    limpar(): void {
        this.listFilter = {};
        this._store.dispatch(new fromStore.SelectVolume(false));
        this.reload({listFilter: this.listFilter});
        this.toggleFilter();
        this.form.reset();
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    doEditor(): void {
        const modelo = this.formEditor.get('modelo').value;

        //this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.tarefaOrigem,
            processoOrigem: this.processo,
            routeAtividadeDocumento: this.routeAtividadeDocumento
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
            '/visualizar/' + this.routerState.params.stepHandle + '/modelos'
        ]).then(() => {
            this.closeAutocomplete();
        });
    }

    doVisualizarModelo(): void {
        this._store.dispatch(new fromStore.VisualizarModelo(this.formEditor.get('modelo').value.documento.componentesDigitais[0].id));
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

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            result.documento = documento;
            if (result.certificadoDigital) {
                this._store.dispatch(new fromStore.AssinaDocumento(result.documento.id));
            } else {
                result.documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: result.documento
                    }));
                });
            }
        });
    }

    doAssinaturaJuntada(documento: Documento): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            result.documento = documento;
            if (result.certificadoDigital) {
                this._store.dispatch(new fromStore.AssinaJuntada(result.documento.id));
            } else {
                result.documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    this._store.dispatch(new fromStore.AssinaJuntadaEletronicamente({
                        assinatura: assinatura,
                        documento: result.documento
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
        juntada.documento.vinculacoesDocumentos.forEach(vinculacao => this.removeVinculacao(vinculacao.id));
    }

    removeVinculacao(vinculacaoDocumentoId: number): void {
        this._store.dispatch(new fromStore.RemoveVinculacaoDocumento(vinculacaoDocumentoId));
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
        this.menuTrigger.closeMenu();
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
                text: 'Deletando'
            }
        });

        this.snackSubscription = this.sheetRef.afterDismissed().subscribe((data) => {
            if (data.dismissedByAction === true) {
                this._store.dispatch(new fromStore.DeleteDocumentoCancel());
            } else {
                this._store.dispatch(new fromStore.DeleteDocumentoFlush());
            }
        });
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
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

    doAbreMinutaOutraAba(documento: Documento): void{
        window.open(
            this.routerState.url.split('/capa/')[0] + '/documento/' + documento.id
             + '/(componente-digital/' + documento.id + '/editor/ckeditor//sidebar:editar/atividade)'
             );
    }

    onComplete(): void {
        if (this.routerState.params['tarefaHandle']) {
            this._store.dispatch(new GetTarefa({id: this.routerState.params['tarefaHandle']}));
        }
        this._store.dispatch(new fromStore.GetDocumentos());
    }

    goToCapaProcesso(): void {
        this._store.dispatch(new fromStore.GetCapaProcesso());
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

    minutasExcluidas(): void {
        this._store.dispatch(new fromStore.GetDocumentosExcluidos());
    }

    doSairLixeiraMinutas(): void {
        this._store.dispatch(new fromStore.GetDocumentos());
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

    doJuntadaOutraAba(documento: Documento): void {
        this._store.dispatch(new fromStore.VisualizarJuntada(documento.id));
    }
}
