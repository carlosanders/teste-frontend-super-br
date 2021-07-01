import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Assunto, Processo, Tarefa} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from '../../../../store';
import {Router} from '@angular/router';

@Component({
    selector: 'processo-capa',
    templateUrl: './processo-capa.component.html',
    styleUrls: ['./processo-capa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoCapaComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    @ViewChildren(CdkPerfectScrollbarDirective)
    cdkScrollbarDirectives: QueryList<CdkPerfectScrollbarDirective>;

    loading = false;

    pagination$: any;
    pagination: any;

    routerState: any;
    routerState$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

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

    vinculacoesProcessos$: Observable<Assunto[]>;
    vinculacoesProcessos: Assunto[] = [];
    paginationVinculacoesProcessos$: Observable<any>;
    paginationVinculacoesProcessos: any;
    loadingVinculacoesProcessos$: Observable<boolean>;

    togglingAcompanharProcesso$: Observable<boolean>;

    chaveAcesso: string;
    estaNumProcessoWorkflow: string;
    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router,
        private _store: Store<fromStore.ProcessoCapaAppState>
    ) {
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntos));
        this.interessados$ = this._store.pipe(select(fromStore.getInteressados));
        this.vinculacoesProcessos$ = this._store.pipe(select(fromStore.getVinculacoesProcessos));

        this.loadingAssuntos$ = this._store.pipe(select(fromStore.getIsAssuntosLoading));
        this.loadingInteressados$ = this._store.pipe(select(fromStore.getIsInteressadosLoading));
        this.loadingVinculacoesProcessos$ = this._store.pipe(select(fromStore.getIsVinculacoesProcessosLoading));

        this.paginationAssuntos$ = this._store.pipe(select(fromStore.getPaginationAssuntos));
        this.paginationInteressados$ = this._store.pipe(select(fromStore.getPaginationInteressados));
        this.paginationVinculacoesProcessos$ = this._store.pipe(select(fromStore.getPaginationVinculacoesProcessos));
        this.togglingAcompanharProcesso$ = this._store.pipe(select(fromStore.getTogglingAcompanharProcesso));
    }

    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }

        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe((processo) => {
            this.processo = processo;

            if (this.processo && this.processo.especieProcesso?.workflow) {
                this.estaNumProcessoWorkflow = 'SIM';
            }else{
                this.estaNumProcessoWorkflow = 'NÃO';
            }

            this._changeDetectorRef.markForCheck();
        });


        this.assuntos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(assuntos => !!assuntos)
        ).subscribe( (assuntos) => {
            this.assuntos = assuntos;
        });

        this.interessados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(interessados => !!interessados)
        ).subscribe( (interessados) => {
            this.interessados = interessados;
        });

        this.vinculacoesProcessos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(vinculacoesProcessos => !!vinculacoesProcessos)
        ).subscribe( (vinculacoesProcessos) => {
            this.vinculacoesProcessos = vinculacoesProcessos;
        });

        this.paginationAssuntos$.subscribe((pagination) => {
            this.paginationAssuntos = pagination;
        });

        this.paginationInteressados$.subscribe((pagination) => {
            this.paginationInteressados = pagination;
        });

        this.paginationVinculacoesProcessos$.subscribe((pagination) => {
            this.paginationVinculacoesProcessos = pagination;
        });
    }

    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
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

    view(emissao: {id: number; chaveAcesso?: string}): void {
        const chaveAcesso = emissao.chaveAcesso ? '/chave/' + emissao.chaveAcesso : '';
        this._router.navigate(['apps/processo/' + emissao.id + chaveAcesso + '/visualizar']);
    }

    acompanharProcesso(checked, processo): void {
        if (checked) {
            this._store.dispatch(new fromStore.SaveAcompanhamento(processo));
        } else {
            const payload = {
                'acompanhamentoId': processo.compartilhamentoUsuario.id,
                'processoId': processo.id
            };
            this._store.dispatch(new fromStore.DeleteAcompanhamento(payload));
        }
    }
}

