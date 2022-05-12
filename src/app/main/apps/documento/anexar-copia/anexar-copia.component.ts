import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
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
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {JuntadaService} from '@cdk/services/juntada.service';
import {Assinatura, ComponenteDigital, Documento, Juntada, Pagination, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as fromStoreDocumento from '../store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from 'app/store';
import {ActivatedRoute, Router} from '@angular/router';
import {getCurrentComponenteDigitalId} from '../store';
import {MercureService} from '@cdk/services/mercure.service';
import {
    CdkBookmarkEditDialogComponent
} from '@cdk/components/bookmark/cdk-bookmark-edit-dialog/cdk-bookmark-edit-dialog.component';
import {CdkUtils} from '@cdk/utils';
import {SharedBookmarkService} from '@cdk/services/shared-bookmark.service';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';
import {ConnectionPositionPair, Overlay} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatButton} from '@angular/material/button';
import {CdkSearchBarComponent} from '@cdk/components/search-bar/search-bar.component';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'anexar-copia',
    templateUrl: './anexar-copia.component.html',
    styleUrls: ['./anexar-copia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AnexarCopiaComponent implements OnInit, OnDestroy {

    @ViewChild('searchBarComponent') cdkSearchBar: CdkSearchBarComponent;
    // eslint-disable-next-line @angular-eslint/no-output-native
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

    processo$: Observable<Processo>;
    processo: Processo;

    binary$: Observable<any>;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    index = [];

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;
    currentJuntada: Juntada;

    animationDirection: 'left' | 'right' | 'none';

    fileName = '';
    zoomSetting = 'auto';
    page = 1;
    spreadMode: 'off' | 'even' | 'odd' = 'off';
    componenteDigital: ComponenteDigital;

    sidebarName = 'anexar-copia-left-sidebar-' + CdkUtils.makeId(3);

    src: any;
    pdfSrc: any = null;
    srcMessage: string;
    loading = false;

    loading$: Observable<boolean>;

    loadingJuntadas$: Observable<boolean>;
    loadingJuntadas: boolean;

    pagination$: any;
    pagination: any;

    chaveAcesso: string;

    documentoAvulso = false;
    modelos = false;

    zoom: number = 0;

    downloadUrl = null;
    unsafe = false;

    bookmarkDialogRef: MatDialogRef<CdkBookmarkEditDialogComponent>;
    isBookmark = false;

    assinaturasIsLoading$: Observable<boolean>;
    assinaturas$: Observable<Assinatura[]>;
    assinaturasPagination$: Observable<Pagination>;
    assinaturasPagination: Pagination;

    sortOrder: string = 'DESC';

    documento$: Observable<Documento>;
    documento: Documento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    currentComponenteDigitalId$: Observable<number>;
    currentComponenteDigitalId: number;

    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    private pdfViewer: PdfJsViewerComponent;

    /**
     *
     * @param _store
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _router
     * @param _activatedRoute
     * @param _mercureService
     * @param _matDialog
     * @param _overlay
     * @param _viewContainerRef
     */
    constructor(
        private _store: Store<fromStore.AnexarCopiaAppState>,
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _mercureService: MercureService,
        private _matDialog: MatDialog,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
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

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));

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
            filter(juntadas => !!juntadas && juntadas.length !== this.juntadas?.length)
        ).subscribe((juntadas) => {
            this.juntadas = juntadas;
            this.totalSteps = juntadas.length;

            if (juntadas.length !== this.index.length) {
                this.index = [];
                juntadas.forEach((juntada) => {
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
                    const tmpJuntada = {
                        id: juntada.id,
                        numeracaoSequencial: juntada.numeracaoSequencial,
                        componentesDigitais: componentesDigitaisIds
                    };
                    this.index.push(tmpJuntada);
                })
            }

            if (this.currentStep) {
                this.currentJuntada = this.juntadas?.find(juntada => juntada.id === this.currentStep.step);
                this._changeDetectorRef.markForCheck();
            }
        });

        this.currentStep$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(currentStep => currentStep.step !== 0 && currentStep.subStep !== 0)
        ).subscribe((currentStep) => {
            this.currentStep = currentStep;
            if (this.juntadas?.length > 0) {
                this.currentJuntada = this.juntadas?.find(juntada => juntada.id === currentStep.step);
            } else {
                this.currentJuntada = this.index?.find(juntada => juntada.id === currentStep.step);
            }
        });

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

            this.isBookmark = SharedBookmarkService.modeBookmark;

            this.loading = binary.loading;
            this._changeDetectorRef.markForCheck();
        });

        this.documento$ = this._store.pipe(select(fromStoreDocumento.getDocumento));
        this.currentComponenteDigitalId$ = this._store.pipe(select(getCurrentComponenteDigitalId));
        this.isSaving$ = this._store.pipe(select(fromStoreDocumento.getComponenteDigitalIsSaving));
        this.errors$ = this._store.pipe(select(fromStoreDocumento.getComponenteDigitalErrors));

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.pagination = pagination);

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.documentoAvulso = routerState.state.url.indexOf('visualizar/' + routerState.state.params.stepHandle + '/oficio') !== -1;
            this.modelos = routerState.state.url.indexOf('/modelos') !== -1;
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
            if (this.routerState && this.routerState?.queryParams?.pagina &&
                this.page !== this.routerState?.queryParams?.pagina) {
                this.page = parseInt(this.routerState?.queryParams?.pagina, 10);
            }
        });

        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');

        this.assinaturas$ = this._store.pipe(select(fromStore.getAssinaturas));
        this.assinaturasPagination$ = this._store.pipe(select(fromStore.getAssinaturasPagination));
        this.assinaturasIsLoading$ = this._store.pipe(select(fromStore.getAssinaturasIsLoading));

        this.assinaturasPagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => this.assinaturasPagination = pagination);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
            this.documento = documento;
        });

        this.currentComponenteDigitalId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentComponenteDigitalId) => {
            this.currentComponenteDigitalId = currentComponenteDigitalId;
        });

        this.loadingJuntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loadingJuntadas = loading;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._store.dispatch(new fromStore.UnloadCopia());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadVolumes({reset: true}));
        if (this.processo?.origemDados) {
            this._mercureService.unsubscribe(this.processo.origemDados['@id']);
        }
    }

    back(): void {
        const rota = 'componente-digital/' + this.currentComponenteDigitalId + '/editor/ckeditor';
        this._router.navigate(
            [
                {outlets: {primary: rota}}
            ],
            {relativeTo: this._activatedRoute.parent.parent}).then();
    }

    anexarCopia(): void {
        const componenteDigital = new ComponenteDigital();

        componenteDigital.documentoOrigem = this.currentJuntada.documento;

        componenteDigital.fileName = this.componenteDigital.fileName;
        componenteDigital.hash = this.componenteDigital.hash;
        componenteDigital.tamanho = this.componenteDigital.tamanho;
        componenteDigital.mimetype = this.componenteDigital.mimetype;
        componenteDigital.extensao = this.componenteDigital.extensao;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStoreDocumento.SaveComponenteDigital({
            componenteDigital: componenteDigital,
            operacaoId: operacaoId
        }));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    disabledBack(): boolean {
        if (this.juntadas?.length && this.index?.length) {
            const firstJuntada = this.index?.find(juntadaIndex => juntadaIndex?.id === this.juntadas[0]?.id);
            if (firstJuntada) {
                return this.currentStep.step === firstJuntada.id && (firstJuntada.componentesDigitais.length === 0 || this.currentStep.subStep === firstJuntada.componentesDigitais[0]);
            }
        }
        return true;
    }

    disabledNext(): boolean {
        if (this.juntadas?.length && this.index?.length) {
            const lastJuntada = this.index?.find(juntadaIndex => juntadaIndex.id === this.juntadas[this.juntadas?.length - 1].id);
            if (lastJuntada) {
                return this.currentStep.step === lastJuntada.id && (lastJuntada.componentesDigitais.length === 0 || this.currentStep.subStep === lastJuntada.componentesDigitais[lastJuntada.componentesDigitais.length - 1]);
            }
        }
        return true;
    }

    /**
     * Search
     *
     * @param emissao
     */
    search(emissao): void {
        this.cdkSearchBar.collapse();
        let rota = 'anexar-copia/' + emissao.id;
        if (this.routerState.params.chaveAcessoHandle) {
            rota += '/chave/' + this.routerState.params.chaveAcessoHandle;
        }

        if (emissao.id !== this.routerState.params['processoCopiaHandle']) {
            this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
        }

        this._router.navigate(
            [
                {outlets: {primary: rota}}
            ],
            {relativeTo: this._activatedRoute.parent.parent}
        ).then(() => {});
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
        const currentJuntadaPosition = this.juntadas?.findIndex(juntada => juntada.id === this.currentStep.step);
        const currentIndex = this.index?.find(juntadaIndex => juntadaIndex.id === this.currentStep.step);
        const currentComponenteDigitalPosition = currentIndex.componentesDigitais.findIndex(cd => cd === this.currentStep.subStep);
        if ((currentComponenteDigitalPosition - 1) >= 0) {
            subStep = currentIndex.componentesDigitais[currentComponenteDigitalPosition - 1];
            step = this.currentStep.step;
        } else {
            if (currentJuntadaPosition > 0) {
                step = this.juntadas[currentJuntadaPosition - 1].id;
                const newIndex = this.index?.find(juntada => juntada.id === step);
                if (newIndex.componentesDigitais.length > 0) {
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
        const currentJuntadaPosition = this.juntadas?.findIndex(juntada => juntada.id === this.currentStep.step);
        const currentIndex = this.index?.find(juntadaIndex => juntadaIndex.id === this.currentStep.step);
        const currentComponenteDigitalPosition = currentIndex.componentesDigitais.findIndex(cd => cd === this.currentStep.subStep);
        let newJuntadaPosition;
        let nextComponenteDigitalPosition;
        if (currentComponenteDigitalPosition + 1 <= currentIndex.componentesDigitais.length - 1) {
            nextComponenteDigitalPosition = currentComponenteDigitalPosition + 1;
            step = this.currentStep.step;
            subStep = currentIndex.componentesDigitais[nextComponenteDigitalPosition];
        } else {
            newJuntadaPosition = currentJuntadaPosition + 1 <= this.juntadas?.length - 1 ? currentJuntadaPosition + 1 : this.juntadas?.length - 1;
            nextComponenteDigitalPosition = 0;
            step = this.juntadas[newJuntadaPosition].id;
            const newIndex = this.index?.find(juntada => juntada.id === step);
            if (newIndex.componentesDigitais.length > 0) {
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
        const index = this.index?.find(juntadaIndex => juntadaIndex.id === currentStep.step);
        if (index !== undefined && (!subStep || index.componentesDigitais.indexOf(subStep) !== -1)) {
            this._store.dispatch(new fromStore.SetCurrentStep(currentStep));
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

        return 'compact-panel';
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

    public onPageRendered(event): void {
        if (this.routerState && this.routerState?.queryParams?.pagina &&
            this.page !== this.routerState?.queryParams?.pagina) {
            this.page = parseInt(this.routerState?.queryParams?.pagina, 10);
        }
        if (this.page <= this.pdfViewer?.PDFViewerApplication?.pagesCount) {
            this.pdfViewer.page = this.page;
        }
    }

    public onPagesLoaded(s, event): void {
        this.page = event;
    }

    doLoadAssinaturas(): void {
        const overlay = this._overlay.create({
            panelClass: 'mat-menu-panel',
            backdropClass: 'cdk-overlay-transparent-backdrop',
            maxWidth: 340,
            width: 340,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy: (this._overlay
                .position()
                .flexibleConnectedTo(this.btnAssinaturas._elementRef.nativeElement)
                .withPositions([
                    new ConnectionPositionPair(
                        {originX: 'end', originY: 'bottom'},
                        {overlayX: 'end', overlayY: 'top'}
                    )
                ])
                .withFlexibleDimensions(false)
                .withPush(false)),
            disposeOnNavigation: true,
            hasBackdrop: true
        });

        overlay.attach(new TemplatePortal(this.assinaturasTemplateRef, this._viewContainerRef));
        overlay.backdropClick()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => overlay.detach())

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
}
