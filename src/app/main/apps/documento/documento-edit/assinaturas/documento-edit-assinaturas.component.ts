import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {Assinatura, Documento} from '../../../../../../@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';

@Component({
    selector: 'documento-edit-assinaturas',
    templateUrl: './documento-edit-assinaturas.component.html',
    styleUrls: ['./documento-edit-assinaturas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAssinaturasComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    documento: Documento;
    pagination: any;

    formAssinaturas = false;
    assinatura: Assinatura;
    assinaturas$: Observable<Assinatura[]>;
    assinaturaLoading$: Observable<boolean>;
    deletingAssinaturaIds$: Observable<any>;
    deletedAssinaturaIds$: Observable<any>;
    deletingAssinaturaErrors$: Observable<any>;
    paginationAssinatura$: Observable<any>;

    routerState: any;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditAssinaturasAppState>,
        private _location: Location,
        private _router: Router,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef
    ) {
        this.assinaturas$ = this._store.pipe(select(fromStore.getAssinaturas));
        this.paginationAssinatura$ = this._store.pipe(select(fromStore.getAssinaturasPagination));
        this.deletingAssinaturaIds$ = this._store.pipe(select(fromStore.getDeletingAssinaturaIds));
        this.deletedAssinaturaIds$ = this._store.pipe(select(fromStore.getDeletedAssinaturaIds));
        this.deletingAssinaturaErrors$ = this._store.pipe(select(fromStore.getDeletingAssinaturaErrors));
        this.assinaturaLoading$ = this._store.pipe(select(fromStore.getAssinaturasIsLoading));
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
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.paginationAssinatura$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reloadAssinaturas(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });
    }

    ngAfterViewInit(): void {
        const path1 = 'app/main/apps/documento/documento-edit/assinaturas';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => {
                            this.container.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadAssinaturas());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reloadAssinaturas(params): void {
        this._store.dispatch(new fromStore.GetAssinaturas({
            ...this.pagination,
            filter: {
                'componenteDigital.id': 'eq:' + this.routerState.params.componenteDigitalHandle
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    deleteAssinatura(assinaturaId: number): void {
        this._store.dispatch(new fromStore.DeleteAssinatura({componenteDigitalId: this.routerState.params.componenteDigitalHandle, assinaturaId: assinaturaId}));
    }

}
