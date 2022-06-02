import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital, Pagination} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pesquisa/componentes-digitais/store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {LoginService} from '../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'componentes-digitais',
    templateUrl: './componentes-digitais.component.html',
    styleUrls: ['./componentes-digitais.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponentesDigitaisComponent implements OnInit, OnDestroy {

    routerState: any;
    componentesDigitais$: Observable<ComponenteDigital[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    mobileMode: boolean;
    private screen$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();

    private _profile: any;

    unidadePagination: Pagination;
    setorPagination: Pagination;

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _activatedRoute
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ComponentesDigitaisAppState>,
        public _loginService: LoginService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.componentesDigitais$ = this._store.pipe(select(fromStore.getComponentesDigitais));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this._profile = _loginService.getUserProfile();
        this.screen$ = this._store.pipe(select(getScreenState));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetComponentesDigitais({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: {
                ...params.context
            }
        }));
    }

    edit($event: { componenteDigital: ComponenteDigital; chaveAcesso: string }): void {
        const chaveAcessoHandle = $event.chaveAcesso ? '/' + $event.chaveAcesso : '';

        const primary = 'componente-digital/' + $event.componenteDigital.id + '/visualizar' + chaveAcessoHandle;

        const sidebar = 'empty';

        this._router.navigate([
                this.routerState.url + '/documento/' + $event.componenteDigital.documento.id,
                {
                    outlets: {
                        primary: primary,
                        sidebar: sidebar
                    }
                }],
            {
                queryParams: {pesquisa: true}
            }).then();
    }
}
