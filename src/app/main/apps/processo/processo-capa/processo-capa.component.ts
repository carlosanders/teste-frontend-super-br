import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    QueryList, ViewChild,
    ViewChildren, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Assunto, Juntada, Pagination, Processo, Tarefa, VinculacaoProcesso} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';
import {modulesConfig} from 'modules/modules-config';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {DynamicService} from '../../../../../modules/dynamic.service';

@Component({
    selector: 'processo-capa',
    templateUrl: './processo-capa.component.html',
    styleUrls: ['./processo-capa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoCapaComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChildren(CdkPerfectScrollbarDirective)
    cdkScrollbarDirectives: QueryList<CdkPerfectScrollbarDirective>;

    loading = false;

    pagination$: any;
    pagination: any;

    routerState: any;
    routerState$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo = null;

    assuntos$: Observable<Assunto[]>;
    assuntos: Assunto[] = [];
    paginationAssuntos$: Observable<any>;
    paginationAssuntos: any;
    loadingAssuntos$: Observable<boolean>;

    tarefa: Tarefa;
    interessados$: Observable<Assunto[]>;
    interessados: Assunto[] = [];
    paginationInteressados$: Observable<any>;
    paginationInteressados: any;
    loadingInteressados$: Observable<boolean>;

    vinculacoesProcessos$: Observable<VinculacaoProcesso[]>;
    vinculacoesProcessos: VinculacaoProcesso[] = [];
    paginationVinculacoesProcessos$: Observable<any>;
    paginationVinculacoesProcessos: any;
    loadingVinculacoesProcessos$: Observable<boolean>;

    juntadas$: Observable<Juntada[]>;
    paginationJuntadas$: Observable<any>;
    paginationJuntadas: Pagination;
    loadingJuntadas$: Observable<boolean>;

    togglingAcompanharProcesso$: Observable<boolean>;

    chaveAcesso: string;
    estaNumProcessoWorkflow: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _router
     * @param _dynamicService
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router,
        private _dynamicService: DynamicService,
        private _store: Store<fromStore.ProcessoCapaAppState>
    ) {
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntos));
        this.interessados$ = this._store.pipe(select(fromStore.getInteressados));
        this.vinculacoesProcessos$ = this._store.pipe(select(fromStore.getVinculacoesProcessos));
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));

        this.loadingAssuntos$ = this._store.pipe(select(fromStore.getIsAssuntosLoading));
        this.loadingInteressados$ = this._store.pipe(select(fromStore.getIsInteressadosLoading));
        this.loadingVinculacoesProcessos$ = this._store.pipe(select(fromStore.getIsVinculacoesProcessosLoading));
        this.loadingJuntadas$ = this._store.pipe(select(fromStore.getIsJuntadasLoading));

        this.paginationAssuntos$ = this._store.pipe(select(fromStore.getPaginationAssuntos));
        this.paginationInteressados$ = this._store.pipe(select(fromStore.getPaginationInteressados));
        this.paginationVinculacoesProcessos$ = this._store.pipe(select(fromStore.getPaginationVinculacoesProcessos));
        this.paginationJuntadas$ = this._store.pipe(select(fromStore.getPaginationJuntadas));
        this.togglingAcompanharProcesso$ = this._store.pipe(select(fromStore.getTogglingAcompanharProcesso));
    }

    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe((processo) => {
            this.processo = processo;

            if (this.processo && this.processo.especieProcesso?.workflow) {
                this.estaNumProcessoWorkflow = 'SIM';
            } else {
                this.estaNumProcessoWorkflow = 'NÃO';
            }
            this._changeDetectorRef.markForCheck();
        });

        this.assuntos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(assuntos => !!assuntos)
        ).subscribe((assuntos) => {
            this.assuntos = assuntos;
        });

        this.interessados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(interessados => !!interessados)
        ).subscribe((interessados) => {
            this.interessados = interessados;
        });

        this.vinculacoesProcessos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(vinculacoesProcessos => !!vinculacoesProcessos)
        ).subscribe((vinculacoesProcessos) => {
            this.vinculacoesProcessos = vinculacoesProcessos;
        });

        this.paginationAssuntos$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((pagination) => {
            this.paginationAssuntos = pagination;
        });

        this.paginationInteressados$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((pagination) => {
            this.paginationInteressados = pagination;
        });

        this.paginationVinculacoesProcessos$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((pagination) => {
            this.paginationVinculacoesProcessos = pagination;
        });

        this.paginationJuntadas$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((paginationJuntadas) => {
            this.paginationJuntadas = paginationJuntadas;
        });
    }

    ngAfterViewInit(): void {
        if (this.container !== undefined) {
            this.container.clear();
        }

        let path = 'app/main/apps/processo/processo-capa';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path) && this.processo.especieProcesso.generoProcesso.nome === module.name.toUpperCase()) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.detectChanges();
                        });
                }));
            }
        });
    }

    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reloadAssuntos(params): void {
        this._store.dispatch(new fromStore.UnloadAssuntos({reset: false}));

        this._store.dispatch(new fromStore.GetAssuntos({
            processoId: this.processo.id,
            ...this.paginationAssuntos,
            filter: {
                ...this.paginationAssuntos.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.paginationAssuntos.populate
        }));

    }

    reloadInteressados(params): void {
        this._store.dispatch(new fromStore.UnloadInteressados({reset: false}));

        this._store.dispatch(new fromStore.GetInteressados({
            processoId: this.processo.id,
            ...this.paginationInteressados,
            filter: {
                ...this.paginationInteressados.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.paginationInteressados.populate
        }));
    }

    reloadVinculacoesProcessos(params): void {
        this._store.dispatch(new fromStore.UnloadVinculacoesProcessos({reset: false}));

        this._store.dispatch(new fromStore.GetVinculacoesProcessos({
            processoId: this.processo.id,
            ...this.paginationVinculacoesProcessos,
            filter: {
                ...this.paginationVinculacoesProcessos.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.paginationVinculacoesProcessos.populate
        }));
    }

    reloadJuntadas(params): void {
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: false}));

        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.paginationJuntadas,
            filter: {
                ...this.paginationJuntadas.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.paginationJuntadas.populate
        }));

    }

    visualizarProcesso(processo: Processo): void {
        const chaveAcesso = processo.chaveAcesso ? '/chave/' + processo.chaveAcesso : '';
        this._router.navigate(['apps/processo/' + processo.id + chaveAcesso + '/visualizar']).then();
    }

    visualizarProcessoNovaAba(processo: Processo): void {
        const chaveAcesso = processo.chaveAcesso ? '/chave/' + processo.chaveAcesso : '';
        window.open('apps/processo/' + processo.id + chaveAcesso + '/visualizar', '_blank');
    }

    abrirJuntadaNovaAba(juntada: Juntada): void {
        let stepHandle: string = juntada.id.toString();
        if (juntada.ativo && (juntada.documento.componentesDigitais.length > 0 || juntada.documento.vinculacoesDocumentos.length > 0)) {
            const subStep = juntada.documento.componentesDigitais.length ?
                juntada.documento.componentesDigitais[0].id :
                juntada.documento.vinculacoesDocumentos[0].documentoVinculado.componentesDigitais[0].id;
            stepHandle += '-' + subStep;
        }
        window.open(
            this.routerState.url.split('/')[1] +
            `/processo/${this.processo.id}/visualizar/` + stepHandle
        );
    }
}

