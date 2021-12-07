import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';
import {ModalidadeTransicao, Processo} from '@cdk/models';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromStore from 'app/main/apps/arquivista/arquivista-list/store';
import {ToggleMaximizado} from 'app/main/apps/arquivista/arquivista-list/store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {locale as english} from 'app/main/apps/arquivista/i18n/en';
import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../auth/login/login.service';
import {Usuario} from '@cdk/models/usuario.model';
import {getTransicaoProcessoIds} from '../transicao-arquivista-bloco/store';
import {CdkUtils} from "../../../../../@cdk/utils";

@Component({
    selector: 'arquivista-list',
    templateUrl: './arquivista-list.component.html',
    styleUrls: ['./arquivista-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaListComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('processoListElement', {read: ElementRef, static: true}) processoListElement: ElementRef;
    routerState: any;

    processoId: any;
    conteudo: any;

    searchInput: FormControl;

    currentProcessoId: number;
    processos: Processo[] = [];
    processoListSize = 30;
    processoListOriginalSize: number;

    processos$: Observable<Processo[]>;
    loading$: Observable<boolean>;
    loading: boolean;

    transicaoIds$: Observable<number[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

    selectedProcessos$: Observable<Processo[]>;
    selectedProcessos: Processo[] = [];

    modalidadeTransicao$: Observable<ModalidadeTransicao>;

    screen$: Observable<any>;

    filter = {};

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;
    maximizado = false;

    mobileMode = false;
    private _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _processoService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _processoService: ProcessoService,
        private _router: Router,
        private _store: Store<fromStore.ArquivistaAppState>,
        private _loginService: LoginService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.selectedProcessos$ = this._store.pipe(select(fromStore.getSelectedProcessos));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedProcessoIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.transicaoIds$ = this._store.pipe(select(getTransicaoProcessoIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this.modalidadeTransicao$ = this._store.pipe(select(fromStore.getModalidadeTransicao));
        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.currentProcessoId = parseInt(routerState.state.params['processoHandle'], 10);
        });

        this.loading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loading = loading;
        });

        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe((processos) => {
            processos.forEach((processo) => {
                processo.lembretes = processo.lembretes.reverse();
            });
            this.processos = processos;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((maximizado) => {
            this.maximizado = maximizado;
        });

        this.selectedProcessos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedProcessos) => {
            this.selectedProcessos = selectedProcessos;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedIds) => {
            this.selectedIds = selectedIds;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
                if (this.maximizado) {
                    this._store.dispatch(new ToggleMaximizado());
                }
            } else {
                this.mobileMode = false;
            }
        });
    }

    ngAfterViewInit(): void {
        this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(params): void {

        this._store.dispatch(new fromStore.UnloadProcessos({reset: false}));

        const nparams = {
            ...this.pagination,
            listFilter: params.listFilter,
            sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
        };

        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

    onScroll(): void {
        if (this.processos.length >= this.pagination.total) {
            return;
        }

        if (this.loading) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetProcessos(nparams));
    }

    setCurrentProcesso(processo: Processo): void {
        this._store.dispatch(new fromStore.SetCurrentProcesso({
            processoId: processo.id,
            populate: [
                'especieProcesso',
                'especieProcesso.generoProcesso',
                'modalidadeMeio',
                'modalidadeFase',
                'documentoAvulsoOrigem',
                'classificacao',
                'classificacao.modalidadeDestinacao',
                'setorInicial',
                'setorAtual',
                'vinculacoesEtiquetas',
                'vinculacoesEtiquetas.etiqueta'

            ],
            acessoNegado: processo.acessoNegado
        }));
    }


    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    changeSelectedIds(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeSelectedProcessos(ids));
    }

    onResizeEndProcessoList(event: ResizeEvent): void {
        this.processoListOriginalSize = event.rectangle.width;
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doEditarBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/arquivista-editar-bloco']).then();
    }

    doTransicaoArquivistaBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/temporalidade-destinacao-bloco']).then();
    }

    doDesarquivarBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/desarquivar-bloco']).then();
    }

    doRegistrarExtravioBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/registrar-extravio-bloco']).then();
    }

    salvarLembrete(params): void {
        params.operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveLembrete(params));
    }

    editar(processoId): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
        + this.routerState.params.typeHandle + '/detalhe/' + processoId + '/editar']).then();
    }

    realizarTransicao(processoId): any {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
        + this.routerState.params.typeHandle + '/detalhe/' + processoId + '/temporalidade-destinacao']).then();
    }

    desarquivar(processoId): any {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
        + this.routerState.params.typeHandle + '/detalhe/' + processoId + '/desarquivar']).then();
    }

    registrarExtravio(processoId): any {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/'
        + this.routerState.params.typeHandle + '/detalhe/' + processoId + '/registrar-extravio']).then();
    }

    retornar(): void {
        this.currentProcessoId = null;
    }
}
