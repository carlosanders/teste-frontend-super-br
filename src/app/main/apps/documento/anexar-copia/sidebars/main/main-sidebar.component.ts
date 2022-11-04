import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {
    ComponenteDigital,
    Documento,
    Juntada,
    Processo,
    Volume
} from '@cdk/models';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {
    getSelectedVolume,
    getVolumes
} from '../../store';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {getMercureState, getRouterState, LimpaMercure} from '../../../../../../store';
import {getProcesso} from '../../store';
import {modulesConfig} from '../../../../../../../modules/modules-config';
import {LoginService} from '../../../../../auth/login/login.service';
import {CdkUtils} from '@cdk/utils';
import {MercureService} from '@cdk/services/mercure.service';
import {Contador} from '@cdk/models/contador';
import {AnexarCopiaService} from '../../anexar-copia.service';
import {getCurrentComponenteDigitalId} from "../../../store";

@Component({
    selector: 'anexar-copia-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AnexarCopiaMainSidebarComponent implements OnInit, OnDestroy {

    @Input()
    name: string = 'anexar-copia-left-sidebar-1';

    @Output()
    scrolled = new EventEmitter<any>();

    @Output()
    sorted = new EventEmitter<string>();

    sort: string = 'DESC';

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];

    processoId: string = undefined;
    processo$: Observable<Processo>;
    processo: Processo;

    volumes$: Observable<Volume[]>;
    volumes: Volume[];

    juntadasByVolume: any;

    loadingVolumes$: Observable<boolean>;

    selectedVolume$: Observable<any>;
    selectedVolume: number = null;

    currentComponenteDigitalId$: Observable<number>;
    currentComponenteDigitalId: number;
    savingComponentesDigitaisIds$: Observable<number[]>;
    uploadedAnexosIds: number[] = [];
    savedComponentesDigitaisIds$: Observable<number[]>;
    errorsComponentesDigitaisIds$: Observable<number[]>;
    errors$: Observable<any>;

    isLoading$: Observable<boolean>;

    totalSteps = 0;

    currentStep$: Observable<any>;
    currentStep: any;
    currentJuntada: Juntada;
    currentDocumento$: Observable<Documento>;
    currentDocumento: Documento;

    index = [];

    animationDirection: 'left' | 'right' | 'none';

    pagination$: any;
    pagination: any;

    listFilter: Record<string, string> = {};
    listSort: Record<string, string> = {};

    showListFilter = false;

    form: FormGroup;

    volumesPagination$: Observable<any>;
    volumesPagination: any;

    routerState: any;

    links: any;

    novaJuntada = false;

    placeholderId = null;

    isOpen: boolean[] = [];

    contador: Contador = new Contador();
    contadorVinculacoes: Contador = new Contador();

    isJuntadas = true;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param anexarCopiaService
     * @param _store
     * @param _formBuilder
     * @param _router
     * @param _activatedRoute
     * @param _loginService
     * @param _mercureService
     */
    constructor(
        private _juntadaService: JuntadaService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        public anexarCopiaService: AnexarCopiaService,
        private _store: Store<fromStore.AnexarCopiaAppState>,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        public _loginService: LoginService,
        private _mercureService: MercureService,
    ) {
        this.form = this._formBuilder.group({
            volume: [null],
            tipoDocumento: [null],
            numeracaoSequencial: [null],
            descricao: [null],
            criadoPor: [null],
            atualizadoPor: [null],
            unidade: [null],
            origemDados: ['']
        });

        // Set the defaults
        this.animationDirection = 'none';

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.loadingVolumes$ = this._store.pipe(select(fromStore.getIsLoadingVolumes));
        this.currentStep$ = this._store.pipe(select(fromStore.getCurrentStep));
        this.currentDocumento$ = this._store.pipe(select(fromStore.getDocumento));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.volumesPagination$ = this._store.pipe(select(fromStore.getVolumesPagination));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.volumes$ = this._store.pipe(select(getVolumes));
        this.selectedVolume$ = this._store.pipe(select(getSelectedVolume));

        this.errors$ = this._store.pipe(select(fromStore.getErrorsComponentesDigitais));
        this.savingComponentesDigitaisIds$ = this._store.pipe(select(fromStore.getSavingComponentesDigitaisIds));
        this.savedComponentesDigitaisIds$ = this._store.pipe(select(fromStore.getSavedComponentesDigitaisIds));
        this.errorsComponentesDigitaisIds$ = this._store.pipe(select(fromStore.getErrorsComponentesDigitaisIds));

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas && juntadas.length !== this.juntadas?.length)
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
                this.currentDocumento = this.currentJuntada.documento;
                this._changeDetectorRef.markForCheck();
            }
            this.juntadasByVolume = CdkUtils.groupArrayByFunction(juntadas, juntada => juntada.volume.numeracaoSequencial);
            this._changeDetectorRef.markForCheck();
        });

        this.selectedVolume$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            volume => this.selectedVolume = volume
        );

        this.currentStep$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentStep) => {
            this.currentStep = currentStep;
            this.isJuntadas = true;
            if (this.juntadas?.length > 0 && currentStep.step !== 0) {
                this.currentJuntada = this.juntadas?.find(juntada => juntada.id === currentStep.step);
            } else {
                const tmpJuntada = this.index?.find(juntada => juntada.componentesDigitais.includes(currentStep.subStep));
                if (this.juntadas?.length > 0) {
                    this.currentJuntada = this.juntadas.find(juntada => juntada.id === tmpJuntada.id);
                    if (currentStep.documentoId === 0) {
                        this.currentDocumento = this.currentJuntada.documento;
                    }
                } else {
                    this.currentJuntada = tmpJuntada;
                }
            }
            this._changeDetectorRef.markForCheck();
        });

        this.currentDocumento$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(currentDocumento => !!currentDocumento)
        ).subscribe((currentDocumento) => {
            this.currentDocumento = currentDocumento;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
            this.listFilter = {...this.pagination.listFilter};
            const sort = {...this.pagination.sort};
            if (sort['numeracaoSequencial'] === 'ASC') {
                this.sort = 'ASC';
            } else {
                this.sort = 'DESC';
            }
        });

        this.currentComponenteDigitalId$ = this._store.pipe(select(getCurrentComponenteDigitalId));

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

        const path = 'app/main/apps/processo/processo-view/sidebars/main';
        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
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

            if (routerState.state.params['processoCopiaHandle'] && this.processoId !== routerState.state.params['processoCopiaHandle']) {
                if (this.processoId) {
                    this._mercureService.unsubscribe('juntadas_' + this.processoId);
                }
                this.processoId = routerState.state.params['processoCopiaHandle'];
                this._mercureService.subscribe('juntadas_' + this.processoId);
            }
        });

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

        this.currentComponenteDigitalId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((currentComponenteDigitalId) => {
            this.currentComponenteDigitalId = currentComponenteDigitalId;
        });
    }

    ngOnDestroy(): void {
        if (this.processoId) {
            this._mercureService.unsubscribe('juntadas_' + this.processoId);
        }
        this._changeDetectorRef.detach();
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
     * @param documentoId
     * @param event
     */
    goToJuntada(juntadaId, restrito, componenteDigitalId = null, documentoId = null, event = null): void {
        const step = juntadaId;
        let substep = 0;

        if (event?.ctrlKey && componenteDigitalId) {
            this._store.dispatch(new fromStore.VisualizarJuntada(componenteDigitalId));
        } else {
            const juntada = this.index?.find(junt => junt.id === juntadaId);
            if (juntada === undefined) {
                return;
            }

            if (!componenteDigitalId && juntada.componentesDigitais.length > 0) {
                substep = juntada.componentesDigitais[0];
            } else if (componenteDigitalId && juntada.componentesDigitais.indexOf(componenteDigitalId) !== -1) {
                substep = componenteDigitalId;
            } else {
                substep = null;
            }

            // Decide the animation direction
            this.animationDirection = this.currentStep.step < step ? 'left' : 'right';

            // Run change detection so the change
            // in the animation direction registered
            this._changeDetectorRef.detectChanges();

            this._store.dispatch(new fromStore.SetCurrentStep({step: step, subStep: substep, documentoId: documentoId}));
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

        if (this.selectedVolume) {
            andXFilter.push({'volume.id': `eq:${this.selectedVolume}`});
        }

        const request = {
            filters: {},
        };
        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }
        this.listFilter = request.filters;
        this.reload({listFilter: this.listFilter, listSort: this.listSort});
        this.toggleFilter();
    }

    pesquisar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset({origemDados: ''});
        this._store.dispatch(new fromStore.SelectVolume(false));
        this.emite();
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

    doTogglePanel(id): void {
        this.isOpen[id] = !this.isOpen[id];
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

    isCurrent(juntadaId: number, componenteDigitalId: number = null): boolean {
        if (componenteDigitalId && this.currentStep.step === 0) {
            // latest ou inicial
            const juntadaLatest = this.index.find(juntada => juntada.componentesDigitais.includes(this.currentStep.subStep));
            return juntadaLatest && juntadaId === juntadaLatest.id && this.currentStep.subStep === componenteDigitalId;
        }
        if (!componenteDigitalId) {
            if (this.currentStep.step === 0) {
                // latest ou inicial
                const juntadaLatest = this.index.find(juntada => juntada.componentesDigitais.includes(this.currentStep.subStep));
                return juntadaLatest && juntadaId === juntadaLatest.id;
            }
            return juntadaId === this.currentStep.step;
        }
        return !!this.index && this.currentStep.step === juntadaId && this.currentStep.subStep === componenteDigitalId;
    }

    isCompleted(juntadaId: number): boolean {
        if (this.index) {
            const juntada = this.index?.find(junt => junt.id === juntadaId);
            const currentJuntada = this.index?.find(junt => junt.id === this.currentStep.step);
            if (this.sort === 'ASC') {
                return juntada?.numeracaoSequencial < currentJuntada?.numeracaoSequencial;
            }
            return juntada?.numeracaoSequencial > currentJuntada?.numeracaoSequencial;
        }
    }

    /**
     * Método que, informada uma juntada e um componenteDigitalId, retorna -1 caso o checkbox de anexar componente
     * digital não deva ser exibido, 0 caso deva ser exibido desmarcado, e 1 caso deva ser exibido já marcado e desabilitado
     * @param juntadaId
     * @param componenteDigitalId
     */
    showCheckboxAnexo(juntadaId: number, componenteDigitalId: number): number {
        if (!this.currentJuntada || juntadaId !== this.currentJuntada.id) {
            // Juntada questionada não está sendo exibida atualmente no editor
            return -1;
        }
        if (this.currentStep.subStep === componenteDigitalId) {
            // Componente digital questionado é o que está sendo exibido no editor
            return 1;
        }
        return 0;
    }

    doToggleSelectAnexo(componenteDigital: ComponenteDigital): void {
        this.anexarCopiaService.toggleSelectComponenteDigital(componenteDigital);
    }

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar(this.name).isLockedOpen) {
            this._cdkSidebarService.getSidebar(this.name).close();
        }
    }
}
