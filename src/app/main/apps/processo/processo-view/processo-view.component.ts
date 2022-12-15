import {ConnectionPositionPair, Overlay} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SecurityContext,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

import {cdkAnimations} from '@cdk/animations';
import {
    CdkBookmarkEditDialogComponent
} from '@cdk/components/bookmark/cdk-bookmark-edit-dialog/cdk-bookmark-edit-dialog.component';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {Assinatura, ComponenteDigital, Documento, Juntada, Pagination, Processo} from '@cdk/models';
import {Bookmark} from '@cdk/models/bookmark.model';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

import {JuntadaService} from '@cdk/services/juntada.service';
import {MercureService} from '@cdk/services/mercure.service';
import {SharedBookmarkService} from '@cdk/services/shared-bookmark.service';
import {CdkUtils} from '@cdk/utils';
import {select, Store} from '@ngrx/store';
import {ResizeEvent} from 'angular-resizable-element';
import {getRouterState} from 'app/store';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';
import {Observable, Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {getProcesso} from '../store';
import * as fromStore from './store';
import {expandirTela} from './store';
import {CdkAssinaturaEletronicaPluginComponent} from "@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component";
import * as AssinaturaStore from "../../../../store";
import {CacheModelService} from "@cdk/services/cache.service";

@Component({
    selector: 'processo-view',
    templateUrl: './processo-view.component.html',
    styleUrls: ['./processo-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoViewComponent implements OnInit, OnDestroy {
    @Output() select: EventEmitter<ComponenteDigital> = new EventEmitter();

    @ViewChildren(CdkPerfectScrollbarDirective)
    cdkScrollbarDirectives: QueryList<CdkPerfectScrollbarDirective>;

    @ViewChild('pdfViewer', {static: false}) set content(content: PdfJsViewerComponent) {
        if (content) {
            this.pdfViewer = content;
            if (!this.pdfViewer.pdfSrc && this.componenteDigital && this.componenteDigital.mimetype === 'application/pdf' && this.pdfSrc) {
                if (this.pdfViewer.pdfSrc !== this.pdfSrc) {
                    this.pdfViewer.pdfSrc = this.pdfSrc;
                }
                this.pdfViewer.refresh();
                this.src = null;
            }
            this._changeDetectorRef.detectChanges();
        } else {
            this.pdfViewer = undefined;
            this._changeDetectorRef.detectChanges();
        }
    }

    @ViewChild('assinaturasTemplate', {static: false}) assinaturasTemplateRef: TemplateRef<any>;
    @ViewChild('btnAssinaturas', {static: false}) btnAssinaturas: MatButton;
    @ViewChild('sidebarElement', {read: ElementRef, static: false}) sidebarElement: ElementRef;

    processo$: Observable<Processo>;
    processo: Processo;

    binary$: Observable<any>;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    index = [];

    totalSteps = 0;

    tarefa: boolean;

    currentStep$: Observable<any>;
    currentStep: any;
    currentJuntada: Juntada;

    animationDirection: 'left' | 'right' | 'none';

    fileName = '';
    zoomSetting = 'auto';
    pagina$: Observable<number>;
    pagina = null;
    page = 1;
    spreadMode: 'off' | 'even' | 'odd' = 'off';
    componenteDigital: ComponenteDigital;
    documento: Documento;
    overlay: any;

    sidebarName = 'juntadas-left-sidebar-' + CdkUtils.makeId(3);

    src: any;
    pdfSrc: any = null;
    srcMessage: string;
    loading = false;

    loading$: Observable<boolean>;

    loadingJuntadas$: Observable<boolean>;
    loadingJuntadas: boolean;

    pagination$: any;
    pagination: any;
    activeCard: fromStore.ProcessoViewActiveCard = 'juntadas';

    routerState: any;

    chaveAcesso: string;
    capaProcesso: boolean;

    capa = false;

    vinculacao = false;

    desentranhamento = false;

    documentoAvulso = false;

    modelos = false;

    zoom: number = 0;
    expandirTela: boolean = false;

    downloadUrl = null;
    unsafe = false;

    bookmarkDialogRef: MatDialogRef<CdkBookmarkEditDialogComponent>;

    assinaturasIsLoading$: Observable<boolean>;
    assinaturas$: Observable<Assinatura[]>;
    assinaturasPagination$: Observable<Pagination>;
    assinaturasPagination: Pagination;

    sortOrder: string = 'DESC';
    sidebarSize: number = 10;
    sidebarOriginalSize: number;

    private _unsubscribeAll: Subject<any> = new Subject();

    private pdfViewer: PdfJsViewerComponent;

    /**
     *
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _store
     * @param _router
     * @param _activatedRoute
     * @param _mercureService
     * @param _matDialog
     * @param _overlay
     * @param _viewContainerRef
     * @param _cacheComponenteDigitalModelService
     */
    constructor(
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.ProcessoViewAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _mercureService: MercureService,
        private _matDialog: MatDialog,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _cacheComponenteDigitalModelService: CacheModelService<ComponenteDigital>,
    ) {
        if (this._cdkSidebarService.isRegistered(this.sidebarName)) {
            this._cdkSidebarService.unregister(this.sidebarName);
        }
        this.binary$ = this._store.pipe(select(fromStore.getBinary));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingBinary));
        this.loadingJuntadas$ = this._store.pipe(select(fromStore.getIsLoading));

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));

        this.processo$ = this._store.pipe(select(getProcesso));
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        this.pagina$ = this._store.pipe(select(fromStore.getPaginaBookmark));

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            if (this.processo && processo && (this.processo.id !== processo.id) && this.processo.origemDados) {
                this._mercureService.unsubscribe(this.processo.origemDados['@id']);
            }
            if (processo?.origemDados) {
                this._mercureService.subscribe(processo.origemDados['@id']);
            }
            this.processo = processo;
            this._changeDetectorRef.markForCheck();
        });

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas && (juntadas.length !== this.juntadas?.length || juntadas != this.juntadas))
        ).subscribe((juntadas) => {
            this.juntadas = juntadas;
            this.totalSteps = juntadas.length;

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

            if (this.currentStep && this.currentStep.step !== 0) {
                this.currentJuntada = this.juntadas?.find(juntada => juntada.id === this.currentStep.step);
                this._changeDetectorRef.markForCheck();
            }
        });

        this.currentStep$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(currentStep => currentStep.subStep !== 0)
        ).subscribe((currentStep) => {
            this.currentStep = currentStep;
            if (this.juntadas?.length > 0 && currentStep.step !== 0) {
                this.currentJuntada = this.juntadas?.find(juntada => juntada.id === currentStep.step);
            } else {
                this.currentJuntada = this.index?.find(juntada => juntada.componentesDigitais.includes(currentStep.subStep));
            }
        });

        this._store
            .pipe(
                select(fromStore.getActiveCard),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((activeCard) => {
                this.activeCard = activeCard;
                SharedBookmarkService.modeBookmark = activeCard === 'bookmark';
            });

        this.pagina$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagina) => {
            this.pagina = pagina;
        })

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.pagination = pagination);

        this.assinaturas$ = this._store.pipe(select(fromStore.getAssinaturas));
        this.assinaturasPagination$ = this._store.pipe(select(fromStore.getAssinaturasPagination));
        this.assinaturasIsLoading$ = this._store.pipe(select(fromStore.getAssinaturasIsLoading));

        this.assinaturasPagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => this.assinaturasPagination = pagination);
    }

    ngOnInit(): void {
        this.binary$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((binary) => {
            if (binary.src && binary.src.conteudo) {
                this.srcMessage = null;
                this.pdfSrc = null;
                this.componenteDigital = binary.src;
                this.page = 1;
                const byteCharacters = atob(binary.src.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: binary.src.mimetype});
                const URL = window.URL;

                switch (binary.src.mimetype) {
                    case 'text/html':
                        this.downloadUrl = null;
                        this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                        break;
                    case 'application/pdf':
                        this.downloadUrl = null;
                        if (this.pdfViewer) {
                            if (this.pdfViewer.pdfSrc !== byteArray) {
                                this.pdfViewer.pdfSrc = byteArray;
                            }
                            this.pdfViewer.refresh();
                        } else {
                            this.pdfSrc = byteArray;
                        }
                        break;
                    default:
                        this.downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                }

                if (binary.src.unsafe) {
                    this.unsafe = true;
                    this.fileName = binary.src.fileName + ' - Exibido em PDF por Segurança!';
                } else {
                    this.fileName = binary.src.fileName;
                    this.unsafe = false;
                }
                this.select.emit(binary.src);
            } else {
                this.fileName = '';
                this.src = false;
                this.pdfSrc = null;
                this.componenteDigital = null;
                if (this.routerState?.params['stepHandle'] === 'latest') {
                    this.srcMessage = null;
                } else {
                    if (this.currentJuntada && !this.currentJuntada.ativo) {
                        this.srcMessage = 'Juntada desentranhada do processo';
                    } else if (this.currentJuntada && !this.currentJuntada.documento) {
                        this.srcMessage = 'Não há documento';
                    } else if (this.currentJuntada && this.currentJuntada.documento?.acessoNegado) {
                        this.srcMessage = 'Acesso negado';
                    } else if (this.currentJuntada && this.currentJuntada.documento?.componentesDigitais.length === 0) {
                        this.srcMessage = 'Não há componentes digitais';
                    } else if (this.currentStep && !this.currentStep.subStep) {
                        this.srcMessage = 'Não há componentes digitais';
                    }
                }
            }

            if (this.componenteDigital &&
                !(this.currentJuntada?.documento?.componentesDigitais.some(i => i.id === this.componenteDigital.id)) &&
                this.currentJuntada?.documento?.vinculacoesDocumentos.length > 0) {
                this.currentJuntada?.documento?.vinculacoesDocumentos.map((d) => {
                    (d?.documentoVinculado?.componentesDigitais.map((c) => {
                        if (c.id === this.componenteDigital.id) {
                            SharedBookmarkService.juntadaAtualSelect = d.documentoVinculado.juntadaAtual;
                        }
                    }));
                });
            } else {
                SharedBookmarkService.juntadaAtualSelect = SharedBookmarkService.modeBookmark ?
                    SharedBookmarkService.juntadaAtualSelect : this.currentJuntada;
            }

            this.loading = binary.loading;
            this._changeDetectorRef.detectChanges();
        });

        this._store.pipe(
            select(expandirTela)
        ).subscribe(res => this.expandirTela = res);

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.capa = !routerState.state.params.stepHandle || routerState.state.params.stepHandle === 'capa';
            this.vinculacao = routerState.state.url.indexOf('/vincular') !== -1;
            this.desentranhamento = routerState.state.url.indexOf('/desentranhar') !== -1;
            this.documentoAvulso = routerState.state.url.indexOf('visualizar/' + routerState.state.params.stepHandle + '/oficio') !== -1;
            this.modelos = routerState.state.url.indexOf('/modelos') !== -1;
            this.tarefa = !!(this.routerState.params.tarefaHandle) && this.routerState.url.indexOf('/documento/') === -1;
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.loadingJuntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loadingJuntadas = loading;
        });

        this.capaProcesso = this.routerState.url.split('/').indexOf('oficios') === -1;

        if (this.capa && (this.routerState.url.indexOf('mostrar') === -1)) {
            if (this.routerState.url.indexOf('/documento/') === -1) {
                this._router.navigateByUrl(this.routerState.url.split('/processo/')[0] +
                    '/processo/' +
                    this.routerState.params.processoHandle + '/visualizar/capa/mostrar').then();
            }
        }
    }

    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        if (this.routerState.url.indexOf('processo/' + this.routerState.params['processoHandle']) === -1) {
            this._store.dispatch(new fromStore.SetCurrentStepFailed(null));
            this._store.dispatch(new fromStore.UnloadVolumes({reset: true}));
            this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
        }
        if (this.processo?.origemDados) {
            this._mercureService.unsubscribe(this.processo.origemDados['@id']);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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

    disabledBack(): boolean {
        if (this.juntadas?.length && this.index?.length) {
            const firstJuntada = this.index?.find(juntadaIndex => juntadaIndex?.id === this.juntadas[0]?.id);
            if (firstJuntada) {
                if (this.currentStep?.step === 0) {
                    return firstJuntada.componentesDigitais.includes(this.currentStep?.subStep);
                }
                return this.currentStep?.step === firstJuntada.id && (firstJuntada.componentesDigitais.length === 0 || this.currentStep?.subStep === firstJuntada.componentesDigitais[0]);
            }
        }
        return true;
    }

    disabledNext(): boolean {
        if (this.juntadas?.length && this.index?.length) {
            const lastJuntada = this.index?.find(juntadaIndex => juntadaIndex.id === this.juntadas[this.juntadas?.length - 1].id);
            if (lastJuntada) {
                if (this.currentStep?.step === 0) {
                    return lastJuntada.componentesDigitais.includes(this.currentStep?.subStep);
                }
                return this.currentStep?.step === lastJuntada.id && (lastJuntada.componentesDigitais.length === 0 || this.currentStep?.subStep === lastJuntada.componentesDigitais[lastJuntada.componentesDigitais.length - 1]);
            }
        }
        return true;
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.disabledBack()) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        let step;
        let subStep = null;
        let currentIndex;
        if (this.currentStep.step !== 0) {
            currentIndex = this.index?.find(juntadaIndex => juntadaIndex.id === this.currentStep.step);
        } else {
            currentIndex = this.index?.find(juntadaIndex => juntadaIndex.componentesDigitais.includes(this.currentStep.subStep));
        }
        const currentJuntadaPosition = this.juntadas?.findIndex(juntada => juntada.id === currentIndex.id);
        const currentComponenteDigitalPosition = currentIndex.componentesDigitais.findIndex(cd => cd === this.currentStep.subStep);
        if ((currentComponenteDigitalPosition - 1) >= 0 && currentIndex.ativo) {
            subStep = currentIndex.componentesDigitais[currentComponenteDigitalPosition - 1];
            step = this.currentStep.step;
        } else {
            if (currentJuntadaPosition > 0) {
                step = this.juntadas[currentJuntadaPosition - 1].id;
                const newIndex = this.index?.find(juntada => juntada.id === step);
                if (newIndex.componentesDigitais.length > 0 && newIndex.ativo) {
                    subStep = (newIndex.componentesDigitais.length - 1) >= 0 ?
                        newIndex.componentesDigitais[newIndex.componentesDigitais.length - 1] :
                        newIndex.componentesDigitais[0];
                }
            }
        }

        this.navigateToStep(step, subStep);
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.disabledNext()) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        let step;
        let subStep = null;
        let currentIndex;
        if (this.currentStep.step !== 0) {
            currentIndex = this.index?.find(juntadaIndex => juntadaIndex.id === this.currentStep.step);
        } else {
            currentIndex = this.index?.find(juntadaIndex => juntadaIndex.componentesDigitais.includes(this.currentStep.subStep));
        }
        const currentJuntadaPosition = this.juntadas?.findIndex(juntada => juntada.id === currentIndex?.id);
        const currentComponenteDigitalPosition = currentIndex.componentesDigitais.findIndex(cd => cd === this.currentStep.subStep);
        let newJuntadaPosition;
        let nextComponenteDigitalPosition;
        if (currentComponenteDigitalPosition + 1 <= currentIndex.componentesDigitais.length - 1 && currentIndex.ativo) {
            nextComponenteDigitalPosition = currentComponenteDigitalPosition + 1;
            step = this.currentStep.step;
            subStep = currentIndex.componentesDigitais[nextComponenteDigitalPosition];
        } else {
            newJuntadaPosition = currentJuntadaPosition + 1 <= this.juntadas?.length - 1 ? currentJuntadaPosition + 1 : this.juntadas?.length - 1;
            nextComponenteDigitalPosition = 0;
            step = this.juntadas[newJuntadaPosition].id;
            const newIndex = this.index?.find(juntada => juntada.id === step);
            if (newIndex.componentesDigitais.length > 0 && newIndex.ativo) {
                subStep = newIndex.componentesDigitais[nextComponenteDigitalPosition];
            }
        }

        this.navigateToStep(step, subStep);
    }

    navigateToStep(step: number, subStep: number = null): void {
        const currentStep = {
            step: step,
            subStep: subStep
        };
        let stepHandle: string = step.toString();
        if (subStep) {
            stepHandle += '-' + subStep.toString();
        }

        const index = this.index?.find(juntadaIndex => juntadaIndex.id === step);
        if (index !== undefined && (!subStep || index.componentesDigitais.indexOf(subStep) !== -1)) {
            let url = this.routerState.url.split('/processo/')[0] +
                '/processo/' +
                this.routerState.params.processoHandle;
            if (this.routerState.params.chaveAcessoHandle) {
                url += '/chave/' + this.routerState.params.chaveAcessoHandle;
            }
            url += '/visualizar/' + stepHandle;
            this._router.navigateByUrl(url).then(() => {
                this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
            });
        }
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    onScroll(): void {
        if (this.juntadas?.length >= this.pagination.total) {
            return;
        }
        if (this.loadingJuntadas) {
            return;
        }

        const nparams = {
            ...this.pagination,
            processoId: this.processo.id,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetJuntadas(nparams));
    }

    onSort(order: string): void {
        this.sortOrder = order;
        this._changeDetectorRef.detectChanges();
    }

    zoomIn(): void {
        if (this.zoom < 10) {
            this.zoom++;
        }
    }

    zoomOut(): void {
        if (this.zoom > 0) {
            this.zoom--;
        }
    }

    getZoomClass(filename): string {
        return this.isHtml(filename) ? `zoom-${this.zoom}x` : '';
    }

    getLayoutClass(filename): string {
        if (!this.isHtml(filename)) {
            return;
        }

        return this.expandirTela ? 'expanded-panel' : 'compact-panel';
    }

    isHtml(filename): boolean {
        const name = filename.split('.');
        return ('HTML' === [...name].pop()) || ('html' === [...name].pop());
    }

    doDownload(): void {
        const downloadLink = document.createElement('a');
        const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.downloadUrl);
        downloadLink.target = '_blank';
        downloadLink.href = sanitizedUrl;
        downloadLink.download = this.fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(sanitizedUrl);
        }, 100);
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        setTimeout(() => {
            const element: HTMLIFrameElement = document.getElementById('iframe-juntadas') as HTMLIFrameElement;
            const iframe = element?.contentWindow?.document;
            if (iframe !== null) {
                iframe.open();
                // eslint-disable-next-line max-len
                iframe.write('<html><head><title></title><style>html, body, .center-container { height: 100%; overflow: hidden } .center-container { display: flex; align-items: center; justify-content: center; }</style></head><body><div class="center-container">Download Realizado!</div></body></html>');
                iframe.close();
            }
        });
        this.downloadUrl = null;
    }

    criarBookmark(componenteDigitalId): void {
        this.bookmarkDialogRef = this._matDialog.open(CdkBookmarkEditDialogComponent, {
            data: {
                componenteDigital: componenteDigitalId,
                fileName: this.fileName,
                nome: '',
                pagina: this.page,
                descricao: '',
                totalPaginas: this.pdfViewer.PDFViewerApplication.pagesCount
            },
            width: '600px',
            height: '475px',
        });

        this.bookmarkDialogRef.componentInstance.edit.subscribe((result) => {
            const bookmark = new Bookmark();

            Object.entries(result).forEach(
                ([key, value]) => {
                    bookmark[key] = value;
                }
            );

            const componenteDigital = new ComponenteDigital();
            componenteDigital.id = componenteDigitalId;
            bookmark.processo = this.processo;
            bookmark.componenteDigital = componenteDigital;
            bookmark.juntada = SharedBookmarkService.juntadaAtualSelect;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveBookmark({
                bookmark: bookmark,
                operacaoId: operacaoId
            }));
            this.page = result.pagina;
            this._changeDetectorRef.detectChanges();
        });

        this.bookmarkDialogRef.afterClosed().subscribe(() => {
            this.bookmarkDialogRef = null;
        });
    }

    public onPageRendered(event): void {
        if (this.pagina && this.pagina !== this.page) {
            this.page = parseInt(this.pagina, 10);
        }
        if (this.page <= this.pdfViewer?.PDFViewerApplication?.pagesCount) {
            this.pdfViewer.page = this.page;
        }
    }

    public onPagesLoaded(s, event): void {
        this.page = event;
    }

    doLoadAssinaturas(): void {
        this.overlay = this._overlay.create({
            panelClass: ['mat-menu-panel', 'processo-view-assinatura-panel'],
            backdropClass: 'cdk-overlay-transparent-backdrop',
            maxWidth: 340,
            width: 340,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy: (this._overlay
                .position()
                .flexibleConnectedTo(this.btnAssinaturas._elementRef)
                .withPositions([
                    new ConnectionPositionPair(
                        {originX: 'end', originY: 'bottom'},
                        {overlayX: 'end', overlayY: 'top'}
                    )
                ])
                .setOrigin(this.btnAssinaturas._elementRef)
                .withFlexibleDimensions(false)
                .withPush(false)),
            disposeOnNavigation: true,
            hasBackdrop: true
        });

        this.overlay.attach(new TemplatePortal(this.assinaturasTemplateRef, this._viewContainerRef));
        this.overlay.backdropClick()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => this.overlay.detach())

        const params = {
            filter: {
                'componenteDigital.id': `eq:${this.componenteDigital.id}`
            },
            listFilter: {},
            limit: 10,
            offset: 0,
            sort: {id: 'DESC'},
            populate: ['populateAll']
        };
        this._store.dispatch(new fromStore.GetAssinaturas(params))
    }

    doReloadAssinaturas(params: any): void {
        this._store.dispatch(new fromStore.GetAssinaturas({
            ...this.assinaturasPagination,
            filter: {
                ...this.assinaturasPagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.assinaturasPagination.populate
        }));
    }

    print(): void {
        window.frames['iframe-juntadas'].focus();
        window.frames['iframe-juntadas'].print();
    }

    onResizingSidebar(event: ResizeEvent): void {
        const viewContainerSize = this._viewContainerRef.element.nativeElement.offsetWidth;
        let pct = 100;

        if (event.rectangle.width < viewContainerSize) {
            pct = event.rectangle.width/viewContainerSize * 100;
        }

        if (pct < 20) {
            pct = 20;
        }

        if (pct > 90) {
            pct = 90;
        }

        this.sidebarSize = pct;
    }

    /**
     * Assina um Documento
     */
    doAssinaDocumento(): void {
        this.overlay.backdropClick();
        this.overlay.detach();

        this.documento = this.currentJuntada ? this.currentJuntada.documento : this.juntadas[0].documento;

        if((this.documento.componentesDigitais.filter(
            (componente) => {return componente.id === this.componenteDigital.id})).length < 1){
            this.documento.vinculacoesDocumentos.forEach((vincDoc) => {
                if((vincDoc.documentoVinculado.componentesDigitais.filter((componenteDigital) => {
                    return componenteDigital.id === this.componenteDigital.id
                })).length > 0){
                    this.documento = vincDoc.documentoVinculado;
                }
            });
        }

        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });
        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            assinaSub.unsubscribe();
            if (result.certificadoDigital) {
                this._store.dispatch(new AssinaturaStore.AssinaDocumento([this.documento.id]));
                this.documento.componentesDigitais.forEach((componenteDigital) => {
                    this._cacheComponenteDigitalModelService.delete(componenteDigital.id.toString());
                });
            } else {
                    this.documento.componentesDigitais.forEach((componenteDigital) => {
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
                            documento: this.documento,
                            componenteDigital: componenteDigital,
                            operacaoId: operacaoId
                        }));
                        this._cacheComponenteDigitalModelService.delete(componenteDigital.id.toString());
                    });
                }
        });
    }
}
