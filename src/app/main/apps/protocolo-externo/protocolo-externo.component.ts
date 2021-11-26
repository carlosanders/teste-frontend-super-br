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

import * as fromStore from './store';

import {getRouterState, getScreenState} from 'app/store/reducers';

import {locale as english} from './i18n/en';

import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../auth/login/login.service';
import {ToggleMaximizado} from 'app/main/apps/protocolo-externo/store';
import {Etiqueta, Pagination, Processo, Usuario} from '@cdk/models';
import {CdkUtils} from '../../../../@cdk/utils';

@Component({
    selector: 'protocolo-externo',
    templateUrl: './protocolo-externo.component.html',
    styleUrls: ['./protocolo-externo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloExternoComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('processoListElement', {read: ElementRef, static: true}) processoListElement: ElementRef;

    routerState: any;
    searchInput: FormControl;
    currentProcessoId: number;
    processos: Processo[] = [];
    processoListSize = 35;
    processoListOriginalSize: number;
    processos$: Observable<Processo[]>;
    loading$: Observable<boolean>;
    loading: boolean;
    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;
    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];
    selectedProcessos$: Observable<Processo[]>;
    selectedProcessos: Processo[] = [];
    screen$: Observable<any>;
    filter = {};
    etiquetas: Etiqueta[] = [];
    pagination$: Observable<any>;
    pagination: any;
    routerState$: Observable<any>;
    maximizado$: Observable<boolean>;
    maximizado = false;
    vinculacaoEtiquetaPagination: Pagination;
    mobileMode = false;
    loadingAssuntosProcessosId$: Observable<number[]>;
    loadingInteressadosProcessosId$: Observable<number[]>;
    pessoasConveniadas: any;
    currentPessoaConveniadaId: any;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _router: Router,
        private _store: Store<fromStore.ProcessosAppState>,
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
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingProcessoIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedProcessoIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();
        this.pessoasConveniadas = this._profile.vinculacoesPessoasUsuarios;
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:PROCESSO'
                }
            ]
        };

        this.loadingAssuntosProcessosId$ = this._store.pipe(select(fromStore.getIsAssuntoLoading));
        this.loadingInteressadosProcessosId$ = this._store.pipe(select(fromStore.getIsInteressadoLoading));
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
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            // eslint-disable-next-line radix
            this.currentProcessoId = parseInt(routerState.state.params['processoHandle'], 0);
            // eslint-disable-next-line radix
            this.currentPessoaConveniadaId = parseInt(routerState.state.params['targetHandle'], 0);
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

    addEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas.push(etiqueta);
        this.proccessEtiquetaFilter();
    }

    deleteEtiqueta(etiqueta: Etiqueta): void {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiqueta.id);
        this.proccessEtiquetaFilter();
    }

    proccessEtiquetaFilter(): any {
        this._store.dispatch(new fromStore.UnloadProcessos({reset: false}));
        const etiquetasId = [];
        this.etiquetas.forEach((e) => {
            etiquetasId.push(e.id);
        });
        const etiquetaFilter = {
            'vinculacoesEtiquetas.etiqueta.id': `in:${etiquetasId.join(',')}`
        };
        const nparams = {
            ...this.pagination,
            etiquetaFilter: etiquetaFilter
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
            acessoNegado: processo.acessoNegado,
            pessoaConveniada: this.currentPessoaConveniadaId
        }));
    }

    deleteProcesso(processoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteProcesso({
            processoId: processoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBlocoProcesso(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.deleteProcesso(id, this.lote));
    }

    doToggleUrgente(processo: Processo): void {
        this._store.dispatch(new fromStore.ToggleUrgenteProcesso(processo));
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
        const potencialProcessoListSize = (event.rectangle.width * this.processoListSize) / this.processoListOriginalSize;

        if (potencialProcessoListSize < 30) {
            this.processoListSize = 30;
            setTimeout(() => {
                this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        if (potencialProcessoListSize > 50) {
            this.processoListSize = 50;
            this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.processoListOriginalSize = this.processoListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.processoListSize = (event.rectangle.width * this.processoListSize) / this.processoListOriginalSize;
        this.processoListOriginalSize = event.rectangle.width;
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/protocolo-externo/' + this.routerState.params.typeHandle
        + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    /*
    * Função que carrega os assuntos do processo associado à processo
    * @processo
    * Recebe a referencia do processo carregada no componente de lista de processos
    */
    doLoadAssuntos(processo): void {

        const processoFilter = {
            'processo.id': `eq:${processo.id}`,
            'principal': 'eq:true'
        };

        const params = {
            filter: processoFilter,
            sort: {},
            limit: 1,
            offset: 0,
            populate: ['populateAll']
        };

        this._store.dispatch(new fromStore.GetAssuntosProcesso({processoId: processo.id, params: params}));
    }

    /*
    * Função que carrega os interessados no processo associado
    * @processo
    * Recebe a referencia do processo carregada no componente de lista de interessados
    */
    doLoadInteressados(processo): void {

        const processoFilter = {
            'processo.id': `eq:${processo.id}`
        };

        const params = {
            filter: processoFilter,
            sort: {},
            limit: 1,
            offset: 0,
            populate: ['populateAll', 'pessoa']
        };

        this._store.dispatch(new fromStore.GetInteressadosProcesso({processoId: processo.id, params: params}));
    }
}
