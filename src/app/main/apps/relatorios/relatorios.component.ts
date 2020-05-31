import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {CdkTranslationLoaderService} from '@cdk/services/translation-loader.service';

import {Relatorio} from '@cdk/models/relatorio.model';
import {RelatorioService} from '@cdk/services/relatorio.service';
import * as fromStore from 'app/main/apps/relatorios/store';

import {getRouterState, getScreenState} from 'app/store/reducers';

import {locale as english} from 'app/main/apps/relatorios/i18n/en';

import {Folder, Tarefa} from '@cdk/models';

import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../auth/login/login.service';
import {ToggleMaximizado} from 'app/main/apps/relatorios/store';
import {Usuario} from '@cdk/models';
import {TipoRelatorio} from '../../../../@cdk/models/tipo-relatorio.model';

@Component({
    selector: 'relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatoriosComponent implements OnInit, OnDestroy, AfterViewInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;

    searchInput: FormControl;

    folders$: Observable<Folder[]>;
    currentRelatorioId: number;

    relatorios: Relatorio[] = [];
    relatorioListSize = 30;
    relatorioListOriginalSize: number;

    relatorios$: Observable<Relatorio[]>;
    loading$: Observable<boolean>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];

    selectedRelatorios$: Observable<Relatorio[]>;

    selectedRelatorios: Relatorio[] = [];

    screen$: Observable<any>;

    filter = {};

    etiquetas: Etiqueta[] = [];

    pagination$: Observable<any>;
    pagination: any;

    routerState$: Observable<any>;

    maximizado$: Observable<boolean>;
    maximizado = false;

    vinculacaoEtiquetaPagination: Pagination;

    private _profile: Usuario;

    mobileMode = false;

    PesquisaRelatorio: string;

    /**
     * Variaveis TipoRelatorio
     */
    tipoRelatorios: TipoRelatorio[] = [];
    tipoRelatorios$: Observable<TipoRelatorio[]>;

    @ViewChild('relatorioListElement', {read: ElementRef, static: true}) relatorioListElement: ElementRef;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _relatorioService
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _relatorioService: RelatorioService,
        private _router: Router,
        private _store: Store<fromStore.RelatoriosAppState>,
        public _loginService: LoginService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this._cdkTranslationLoaderService.loadTranslations(english);
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.relatorios$ = this._store.pipe(select(fromStore.getRelatorios));

        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        this.selectedRelatorios$ = this._store.pipe(select(fromStore.getSelectedRelatorios));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedRelatorioIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.maximizado$ = this._store.pipe(select(fromStore.getMaximizado));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingRelatorioIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedRelatorioIds));
        this.screen$ = this._store.pipe(select(getScreenState));
        this._profile = _loginService.getUserProfile();
        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id};

        if (this._loginService.isGranted('ROLE_ADMIN')) {
            this.tipoRelatorios$ = this._store.pipe(select(fromStore.getTipoRelatorios));
            this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingTipoRelatorioIds));
            this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedTipoRelatorioIds));
            this.selectedRelatorios$ = this._store.pipe(select(fromStore.getSelectedTipoRelatorios));
            this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedTipoRelatorioIds));
            this.loading$ = this._store.pipe(select(fromStore.getIsLoadingTipoRelatorio));
            this.pagination$ = this._store.pipe(select(fromStore.getPaginationTipoRelatorio));
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.currentRelatorioId = parseInt(routerState.state.params['relatorioHandle'], 0);
        });

        this.relatorios$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(relatorios => !!relatorios)
        ).subscribe(relatorios => {
            this.relatorios = relatorios;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(maximizado => {
            this.maximizado = maximizado;
        });

        this.selectedRelatorios$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedRelatorios => {
            this.selectedRelatorios = selectedRelatorios;
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedIds => {
            this.selectedIds = selectedIds;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(screen => {
            if (screen.size !== 'desktop') {
                this.mobileMode = true;
                if (this.maximizado) {
                    this._store.dispatch(new ToggleMaximizado());
                }
            } else {
                this.mobileMode = false;
            }
        });

        this.PesquisaRelatorio = 'relatorio';

        if (this._loginService.isGranted('ROLE_ADMIN') && this.routerState.params.typeHandle === 'tipo-relatorio') {
            this.tipoRelatorios$.pipe(
                takeUntil(this._unsubscribeAll),
                filter(tipoRelatorios => !!tipoRelatorios)
            ).subscribe(tipoRelatorios => {
                this.tipoRelatorios = tipoRelatorios;
            });
        }
    }

    ngAfterViewInit(): void {
        this.relatorioListOriginalSize = this.relatorioListElement.nativeElement.offsetWidth;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reload(params): void {

            this._store.dispatch(new fromStore.UnloadRelatorios({reset: false}));

            const nparams = {
                ...this.pagination,
                listFilter: params.listFilter,
                sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
            };

            this._store.dispatch(new fromStore.GetRelatorios(nparams));
    }

    reloadTipoRelatorio(params): void {
        if (this._loginService.isGranted('ROLE_ADMIN')) {
                this._store.dispatch(new fromStore.UnloadTipoRelatorios({reset: false}));

                const nparams = {
                    ...this.pagination,
                    listFilter: params.listFilter,
                    sort: params.listSort && Object.keys(params.listSort).length ? params.listSort : this.pagination.sort
                };

                this._store.dispatch(new fromStore.GetTipoRelatorios(nparams));
            }
    }

    setCurrentRelatorio(relatorio: Relatorio): void {
        this._store.dispatch(new fromStore.SetCurrentRelatorio({
            relatorioId: relatorio.id
        }));
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
        this._store.dispatch(new fromStore.UnloadRelatorios({reset: false}));
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
        this._store.dispatch(new fromStore.GetRelatorios(nparams));
    }

    onScroll(): void {
        if (this.relatorios.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        if (!this._loginService.isGranted('ROLE_ADMIN') && this.routerState.params.typeHandle === 'tipo-relatorio') {
            this._store.dispatch(new fromStore.GetRelatorios(nparams));
        }
        else {
            this._store.dispatch(new fromStore.GetTipoRelatorios(nparams));
        }

    }

    deleteRelatorio(relatorioId: number): void {
        this._store.dispatch(new fromStore.DeleteRelatorio(relatorioId));
    }

    deleteTipoRelatorio(tipoRelatorioId: number): void {
        this._store.dispatch(new fromStore.DeleteTipoRelatorio(tipoRelatorioId));
    }

    editTipoRelatorio(tipoRelatorio: TipoRelatorio): void {

        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/'
        + 'tipo-relatorio/entrada/criar-tipo-relatorio/' + tipoRelatorio.id]).then();
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
           this._store.dispatch(new fromStore.ChangeSelectedRelatorios(ids));
    }

    changeSelectedIdsTipoRelatorio(ids: number[]): void {
        this._store.dispatch(new fromStore.ChangeSelectedTipoRelatorios(ids));
    }

    setFolderOnSelectedRelatorios(folder): void {
        this.selectedRelatorios.forEach((relatorio) => {
            this._store.dispatch(new fromStore.SetFolderOnSelectedRelatorios({relatorio: relatorio, folder: folder}));
        });
    }

    onResizeEndRelatorioList(event: ResizeEvent): void {
        const potencialRelatorioListSize = (event.rectangle.width * this.relatorioListSize) / this.relatorioListOriginalSize;

        if (potencialRelatorioListSize < 30) {
            this.relatorioListSize = 30;
            setTimeout(() => {
                this.relatorioListOriginalSize = this.relatorioListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        if (potencialRelatorioListSize > 50) {
            this.relatorioListSize = 50;
            this.relatorioListOriginalSize = this.relatorioListElement.nativeElement.offsetWidth;
            setTimeout(() => {
                this.relatorioListOriginalSize = this.relatorioListElement.nativeElement.offsetWidth;
            }, 500);
            return;
        }

        this.relatorioListSize = (event.rectangle.width * this.relatorioListSize) / this.relatorioListOriginalSize;
        this.relatorioListOriginalSize = event.rectangle.width;
    }

    doCreateRelatorio(params): void {
        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/criar/']).then();
    }

    doEditRelatorio(relatorioId): void {
        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/relatorio/' + relatorioId + '/editar']).then();
    }

    doEtiquetarBloco(): void {
        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

}
