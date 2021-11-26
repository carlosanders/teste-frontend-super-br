import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {ModalidadeTransicao, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {modulesConfig} from 'modules/modules-config';
import {DynamicService} from 'modules/dynamic.service';
import * as fromStoreProcessos from '../arquivista-list/store';
import {getModalidadeTransicao} from '../arquivista-list/store';

@Component({
    selector: 'arquivista-operacoes-bloco',
    templateUrl: './arquivista-operacoes-bloco.component.html',
    styleUrls: ['./arquivista-operacoes-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaOperacoesBlocoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    processos$: Observable<Processo[]>;
    processos: Processo[];

    selectedIds$: Observable<number[]>;
    selectedIds: number[];

    routerState: any;

    modalidadeTransicao$: Observable<ModalidadeTransicao>;

    displayProcessos = false;

    private _profile: any;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _dynamicService
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _dynamicService: DynamicService,
        private _store: Store<fromStore.State>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.processos$ = this._store.pipe(select(fromStoreProcessos.getSelectedProcessos));
        this.selectedIds$ = this._store.pipe(select(fromStoreProcessos.getSelectedProcessoIds));
        this.modalidadeTransicao$ = this._store.pipe(select(getModalidadeTransicao));
        this._profile = _loginService.getUserProfile().colaborador;

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processos) => {
            this.processos = processos;
            if (!processos || processos.length <= 1) {
                this._router.navigate([
                    'apps',
                    'arquivista',
                    this.routerState.params.unidadeHandle,
                    this.routerState.params.typeHandle
                ]).then();
            }
        });

        this.selectedIds$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(selected => this.selectedIds = selected);
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/arquivista/operacoes-bloco';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doEtiquetarBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/vinculacao-etiqueta-bloco']).then();
    }

    doEditarBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/arquivista-editar-bloco']).then();
    }

    doTransicaoBloco(): void {
        // tslint:disable-next-line:max-line-length
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/temporalidade-destinacao-bloco']).then();
    }

    doDesarquivarBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/desarquivar-bloco']).then();
    }

    doRegistrarExtravioBloco(): void {
        this._router.navigate(['apps/arquivista/' + this.routerState.params.unidadeHandle + '/' + this.routerState.params.typeHandle + '/registrar-extravio-bloco']).then();
    }

    doAbort(): void {
        this._store.dispatch(new fromStoreProcessos.ChangeSelectedProcessos([]));
    }

    exibeProcessos(): void {
        this.displayProcessos = !this.displayProcessos;
    }
}
