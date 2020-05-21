import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {DomSanitizer} from '@angular/platform-browser';
import {takeUntil} from 'rxjs/operators';
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

        this.doLoadAssuntos(this.processo);
        this.doLoadInteressados(this.processo);
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

    doLoadAssuntos(processo): void {
        const params = {
            filter: {'processo.id': `eq:${processo.id}`, 'principal': 'eq:true'},
            sort: {},
            limit: 1,
            offset: 0,
            populate: ['assuntoAdministrativo']
        };

        this._store.dispatch(new fromStore.GetAssuntosProcesso({processoId: processo.id, params: params}));
    }

    doLoadInteressados(processo): void {
        const params = {
            filter: {'processo.id': `eq:${processo.id}`},
            sort: {},
            limit: 1,
            offset: 0,
            populate: ['modalidadeInteressado', 'pessoa']
        };

        this._store.dispatch(new fromStore.GetInteressadosProcesso({processoId: processo.id, params: params}));
    }

    back(): void {
        this._location.back();
    }
}
