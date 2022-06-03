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

import {Relatorio} from '@cdk/models/relatorio.model';
import {RelatorioService} from '@cdk/services/relatorio.service';
import * as fromStore from 'app/main/apps/relatorios/store';
import {LoadRelatorioSuccess, ToggleMaximizado} from 'app/main/apps/relatorios/store';

import {getMercureState, getRouterState, getScreenState} from 'app/store/reducers';

import {locale as english} from 'app/main/apps/relatorios/i18n/en';

import {Etiqueta, Folder, Pagination, Usuario} from '@cdk/models';

import {ResizeEvent} from 'angular-resizable-element';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../auth/login/login.service';
import {CdkUtils} from '@cdk/utils';
import {MercureService} from '@cdk/services/mercure.service';
import {plainToClass} from 'class-transformer';
import {relatorio as relatorioSchema} from '@cdk/normalizr';
import {AddData} from '@cdk/ngrx-normalizr';

@Component({
    selector: 'relatorios',
    templateUrl: './relatorios.component.html',
    styleUrls: ['./relatorios.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatoriosComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('relatorioListElement', {read: ElementRef, static: true}) relatorioListElement: ElementRef;
    routerState: any;
    searchInput: FormControl;
    folders$: Observable<Folder[]>;
    currentRelatorioId: number;
    relatorios: Relatorio[] = [];
    relatorioListSize = 30;
    relatorioListOriginalSize: number;
    relatorios$: Observable<Relatorio[]>;
    loading$: Observable<boolean>;
    loading: boolean;
    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;
    selectedIds$: Observable<number[]>;
    selectedIds: number[] = [];
    selectedRelatorios$: Observable<Relatorio[]>;
    selectedRelatorios: Relatorio[] = [];
    loadedIdRelatorios$: Observable<number>;
    loadedIdRelatorios: number;
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
    mostraCriar = false;
    pesquisaRelatorio: string;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _cdkTranslationLoaderService
     * @param _relatorioService
     * @param _router
     * @param _store
     * @param _loginService
     * @param _mercureService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _cdkTranslationLoaderService: CdkTranslationLoaderService,
        private _relatorioService: RelatorioService,
        private _router: Router,
        private _store: Store<fromStore.RelatoriosAppState>,
        public _loginService: LoginService,
        private _mercureService: MercureService
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
        this.vinculacaoEtiquetaPagination.filter = {
            orX: [
                {
                    'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                },
                {
                    'vinculacoesEtiquetas.setor.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                },
                {
                    'vinculacoesEtiquetas.unidade.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // eslint-disable-next-line max-len
                    'vinculacoesEtiquetas.modalidadeOrgaoCentral.id': 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'modalidadeEtiqueta.valor': 'eq:RELATORIO'
                }
            ]
        };

        this.loadedIdRelatorios$ = this._store.pipe(select(fromStore.getLoadedRelatorioIds));
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
            this.currentRelatorioId = parseInt(routerState.state.params['relatorioHandle'], 0);
        });

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
            if (message && message.type && message.type === 'relatorio_create') {
                this._store.dispatch(new LoadRelatorioSuccess(message.content.relatorio));
            }
        });

        this.loading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loading = loading;
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.relatorios$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(relatorios => !!relatorios)
        ).subscribe((relatorios) => {
            // coloca todos que devem estar
            const mercureSubscribed = [];
            relatorios.forEach((relatorio) => {
                if (mercureSubscribed.indexOf(relatorio['@id']) === -1) {
                    mercureSubscribed.push(relatorio['@id']);
                }
            });
            // retira todos que nao devem estar
            const mercureUnsubscribed = [];
            this.relatorios.forEach((relatorio) => {
                if (mercureSubscribed.indexOf(relatorio['@id']) === -1) {
                    mercureUnsubscribed.push(relatorio['@id']);
                }
            });
            this._mercureService.unsubscribe(mercureUnsubscribed);
            this._mercureService.subscribe(mercureSubscribed);
            this.relatorios = relatorios;
        });

        this.maximizado$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((maximizado) => {
            this.maximizado = maximizado;
        });

        this.selectedRelatorios$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedRelatorios) => {
            this.selectedRelatorios = selectedRelatorios;
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

        this.loadedIdRelatorios$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((idRelatorio) => {
            this.loadedIdRelatorios = idRelatorio;
            this._changeDetectorRef.markForCheck();
        });

        this.pesquisaRelatorio = 'relatorio';
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
        this._unsubscribeAll.next(true);
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

        if (this.loading) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetRelatorios(nparams));
    }

    deleteRelatorio(relatorioId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteRelatorio({
            relatorioId: relatorioId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBlocoRelatorio(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.deleteRelatorio(id, this.lote));
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
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/criar/']).then();
    }

    doEditRelatorio(relatorioId): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/relatorio/' + relatorioId + '/editar']).then();
    }

    doEtiquetarBloco(): void {
        // eslint-disable-next-line max-len
        this._router.navigate(['apps/relatorios/' + this.routerState.params.generoHandle + '/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    criarRelatorio(): void {
        this._store.dispatch(new fromStore.CreateRelatorio());
        this.mostraCriar = true;
    }

    retornar(): void {
        this.mostraCriar = false;
        this.currentRelatorioId = null;
    }
}
