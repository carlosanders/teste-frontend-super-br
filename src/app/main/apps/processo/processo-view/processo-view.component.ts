import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SecurityContext, ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {JuntadaService} from '@cdk/services/juntada.service';
import {ComponenteDigital, Juntada, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {expandirTela} from './store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from '../../../../store';
import {ActivatedRoute, Router} from '@angular/router';
import {getProcesso} from '../store';
import {MercureService} from '@cdk/services/mercure.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
    CdkBookmarkEditDialogComponent
} from '@cdk/components/bookmark/cdk-bookmark-edit-dialog/cdk-bookmark-edit-dialog.component';
import {Bookmark} from '@cdk/models/bookmark.model';
import {CdkUtils} from '@cdk/utils';
import {SharedBookmarkService} from '../../../../../@cdk/services/shared-bookmark.service';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';

@Component({
    selector: 'processo-view',
    templateUrl: './processo-view.component.html',
    styleUrls: ['./processo-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoViewComponent implements OnInit, OnDestroy {
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
        }
    }

    processo$: Observable<Processo>;
    processo: Processo;

    binary$: Observable<any>;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    index$: Observable<any>;
    index = {};

    totalSteps = 0;

    tarefa: boolean;

    currentStep$: Observable<any>;
    currentStep: any;
    currentJuntada: Juntada;

    animationDirection: 'left' | 'right' | 'none';

    fileName = '';
    zoomSetting = 'auto';
    page = 1;
    spreadMode: 'off' | 'even' | 'odd' = 'off';
    componenteDigital: ComponenteDigital;

    sidebarName = 'juntadas-left-sidebar-1';

    src: any;
    pdfSrc: any = null;
    srcMessage: string;
    loading = false;

    loading$: Observable<boolean>;

    loadingJuntadas$: Observable<boolean>;
    loadingJuntadas: boolean;

    pagination$: any;
    pagination: any;

    routerState: any;
    routerState$: Observable<any>;

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
    isBookmark = false;

    private _unsubscribeAll: Subject<any> = new Subject();

    private pdfViewer: PdfJsViewerComponent;

    /**
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
        private _matDialog: MatDialog
    ) {
        if (this._cdkSidebarService.isRegistered(this.sidebarName)) {
            this._cdkSidebarService.unregister(this.sidebarName);
        }
        this.binary$ = this._store.pipe(select(fromStore.getBinary));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingBinary));
        this.loadingJuntadas$ = this._store.pipe(select(fromStore.getIsLoading));

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.index$ = this._store.pipe(select(fromStore.getIndex));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas)
        ).subscribe((juntadas) => {
            this.juntadas = juntadas;
            this.totalSteps = juntadas.length;
        });

        this.processo$ = this._store.pipe(select(getProcesso));

        this.currentStep$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentStep) => {
            this.currentStep = currentStep;
            if (this.index && this.index[currentStep.step]) {
                this.currentJuntada = this.juntadas[currentStep.step];
            }
        });

        this.index$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((index) => {
            this.index = index;
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
                if (this.currentJuntada && !this.currentJuntada.documento) {
                    this.srcMessage = 'Não há documento';
                } else if (this.currentJuntada && this.currentJuntada.documento?.acessoNegado) {
                    this.srcMessage = 'Acesso negado';
                } else if (this.currentJuntada && this.currentJuntada.documento?.componentesDigitais.length === 0) {
                    this.srcMessage = 'Não há componentes digitais';
                } else if (this.currentJuntada && !this.currentJuntada.ativo) {
                    this.srcMessage = 'Juntada desentranhada do processo';
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

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.pagination = pagination);

        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }

    ngOnInit(): void {
        this._store.pipe(
            select(expandirTela)
        ).subscribe(res => this.expandirTela = res);

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.capa = !routerState.state.params.stepHandle || routerState.state.params.stepHandle === 'capa' ||
                routerState.state.params.stepHandle === 'default';
            this.vinculacao = routerState.state.url.indexOf('/vincular') !== -1;
            this.desentranhamento = routerState.state.url.indexOf('/desentranhar') !== -1;
            this.documentoAvulso = routerState.state.url.indexOf('visualizar/' + routerState.state.params.stepHandle + '/oficio') !== -1;
            this.modelos = routerState.state.url.indexOf('/modelos') !== -1;
            this.tarefa = !!(this.routerState.params.tarefaHandle) && this.routerState.url.indexOf('/documento/') === -1;
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
            if (this.routerState && this.routerState?.queryParams?.pagina &&
                this.page !== this.routerState?.queryParams?.pagina) {
                this.page = parseInt(this.routerState?.queryParams?.pagina, 10);
            }
        });

        this.loadingJuntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loadingJuntadas = loading;
        });

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

        this.capaProcesso = this.routerState.url.split('/').indexOf('oficios') === -1;

        if (this.capa && (this.routerState.url.indexOf('default') === -1 && this.routerState.url.indexOf('mostrar') === -1)) {
            if (this.routerState.url.indexOf('/documento/') !== -1 &&
                (this.routerState.url.indexOf('anexar-copia') !== -1 || this.routerState.url.indexOf('visualizar-processo') !== -1)) {
                const processoId = this.routerState.params['processoCopiaHandle'] ?
                    this.routerState.params.processoCopiaHandle : this.routerState.params.processoHandle;

                // Navegação do processo deve ocorrer por outlet
                this._router.navigate(
                    [
                        this.routerState.url.split('/documento/')[0] + '/documento/' +
                        this.routerState.params.documentoHandle,
                        {
                            outlets: {
                                primary: [
                                    this.routerState.url.indexOf('anexar-copia') === -1 ?
                                        'visualizar-processo' : 'anexar-copia',
                                    processoId,
                                    'visualizar',
                                    'capa',
                                    'mostrar'
                                ]
                            }
                        }
                    ],
                    {
                        relativeTo: this._activatedRoute.parent
                    }
                ).then();
            } else if (this.routerState.url.indexOf('/documento/') === -1) {
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
        this._store.dispatch(new fromStore.UnloadVolumes({reset: true}));
        if (this.routerState.url.indexOf('anexar-copia') === -1 &&
            this.routerState.url.indexOf('processo/' + this.routerState.params['processoHandle'] + '/visualizar') === -1) {
            this._store.dispatch(new fromStore.UnloadJuntadas({reset: true}));
        }
        if (this.tarefa) {
            this._store.dispatch(new fromStore.UnloadDocumentos());
        }
        if (this.processo?.origemDados) {
            this._mercureService.unsubscribe(this.processo.origemDados['@id']);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    disabledNext(): boolean {
        return this.currentStep.step === this.totalSteps - 1 && (this.currentStep.subStep >= this.index[this.currentStep.step]?.length - 1);
    }

    /**
     * Go to next step
     */
    gotoNextStep(): void {
        if (this.currentStep.step === this.totalSteps - 1 && this.currentStep.subStep >= this.index[this.currentStep.step]?.length - 1) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'left';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        let step = (this.currentStep.step + 1) + '-0';

        if ((this.currentStep.subStep + 1) <= this.index[this.currentStep.step].length - 1) {
            step = this.currentStep.step + '-' + (this.currentStep.subStep + 1);
        }

        this.navigateToStep(step);
    }

    disabledBack(): boolean {
        return this.currentStep.step === 0 && this.currentStep.subStep === 0;
    }

    /**
     * Go to previous step
     */
    gotoPreviousStep(): void {
        if (this.currentStep.step === 0 && this.currentStep.subStep === 0) {
            return;
        }

        // Set the animation direction
        this.animationDirection = 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        let step = 0;
        let subStep = 0;

        if ((this.currentStep.subStep - 1) >= 0) {
            subStep = this.currentStep.subStep - 1;
            step = this.currentStep.step;
        } else {
            if (this.currentStep.step > 0) {
                step = this.currentStep.step - 1;
                subStep = (this.index[step].length - 1) >= 0 ? this.index[step].length - 1 : 0;
            }
        }

        this.navigateToStep(step + '-' + subStep);
    }

    navigateToStep(step: string): void {
        const newSteps = step.split('-');
        if (this.index[newSteps[0]]) {
            if (this.routerState.url.indexOf('/documento/') !== -1) {
                const arrPrimary = [];
                arrPrimary.push(this.routerState.url.indexOf('anexar-copia') === -1 ?
                    'visualizar-processo' : 'anexar-copia');
                arrPrimary.push(this.routerState.params['processoCopiaHandle'] ?
                    this.routerState.params.processoCopiaHandle : this.routerState.params.processoHandle);
                if (this.routerState.params.chaveAcessoHandle) {
                    arrPrimary.push('chave');
                    arrPrimary.push(this.routerState.params.chaveAcessoHandle);
                }
                arrPrimary.push('visualizar');
                arrPrimary.push(step);
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
                    this._store.dispatch(new fromStore.SetCurrentStep({step: newSteps[0], subStep: newSteps[1]}));
                });
            } else {
                let url = this.routerState.url.split('/processo/')[0] +
                    '/processo/' +
                    this.routerState.params.processoHandle;
                if (this.routerState.params.chaveAcessoHandle) {
                    url += '/chave/' + this.routerState.params.chaveAcessoHandle;
                }
                url += '/visualizar/' + step;
                this._router.navigateByUrl(url).then(() => {
                    this._store.dispatch(new fromStore.SetCurrentStep({step: newSteps[0], subStep: newSteps[1]}));
                });
            }
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
        if (this.juntadas.length >= this.pagination.total) {
            return;
        }
        if (this.loadingJuntadas) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetJuntadas(nparams));
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
        if (this.routerState && this.routerState?.queryParams?.pagina &&
            this.page !== this.routerState?.queryParams?.pagina) {
            this.page = parseInt(this.routerState?.queryParams?.pagina, 10);
        }
        if (this.page <= this.pdfViewer.PDFViewerApplication.pagesCount) {
            this.pdfViewer.page = this.page;
        }
    }

    public onPagesLoaded(s, event): void {
        this.page = event;
    }
}
