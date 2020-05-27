import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {Assunto, Juntada, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from '../../../../store/reducers';
import {Location} from '@angular/common';

@Component({
    selector: 'processo-capa',
    templateUrl: './processo-capa.component.html',
    styleUrls: ['./processo-capa.component.scss'],
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
    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];
    assuntos$: Observable<Assunto[]>;
    assuntos: Assunto[] = [];
    interessados$: Observable<Assunto[]>;
    interessados: Assunto[] = [];

    paginationJuntadas$: Observable<any>;
    paginationJuntadas: any;
    paginationAssuntos$: Observable<any>;
    paginationAssuntos: any;
    paginationInteressados$: Observable<any>;
    paginationInteressados: any;

    loadingJuntas$: Observable<boolean>;
    loadingInteressados$: Observable<boolean>;
    loadingAssuntos$: Observable<boolean>;


    chaveAcesso: string;

    /**
     *
     * @param _juntadaService
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.ProcessoCapaAppState>,
        private _location: Location
    ) {
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadas));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntos));
        this.interessados$ = this._store.pipe(select(fromStore.getInteressados));

        this.loadingJuntas$ = this._store.pipe(select(fromStore.getIsJuntadasLoading));
        this.loadingAssuntos$ = this._store.pipe(select(fromStore.getIsAssuntosLoading));
        this.loadingInteressados$ = this._store.pipe(select(fromStore.getIsInteressadosLoading));
        this.paginationJuntadas$ = this._store.pipe(select(fromStore.getPagination));
        this.paginationAssuntos$ = this._store.pipe(select(fromStore.getPaginationAssuntos));
        this.paginationInteressados$ = this._store.pipe(select(fromStore.getPaginationInteressados));
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.routerState$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => {
            this.processo = processo;
        });

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas)
        ).subscribe( juntadas => {
            this.juntadas = juntadas;
        });

        this.assuntos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(assuntos => !!assuntos)
        ).subscribe( assuntos => {
            this.assuntos = assuntos;
        });

        this.interessados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(interessados => !!interessados)
        ).subscribe( interessados => {
            this.interessados = interessados;
        });

        this.paginationJuntadas$.subscribe(pagination => {
            this.paginationJuntadas = pagination;
        });

        this.paginationAssuntos$.subscribe(pagination => {
            this.paginationAssuntos = pagination;
        });

        this.paginationInteressados$.subscribe(pagination => {
            this.paginationInteressados = pagination;
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

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

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

    reloadJuntadas(params): void {
        this._store.dispatch(new fromStore.UnloadJuntadas({reset: false}));

        this._store.dispatch(new fromStore.GetJuntadas({
            processoId: this.processo.id,
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

    back(): void {
        this._location.back();
    }
}
