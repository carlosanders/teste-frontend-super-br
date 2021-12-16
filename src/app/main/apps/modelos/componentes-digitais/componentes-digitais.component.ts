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
import {ComponenteDigital, Processo, Tarefa} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {LoginService} from '../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../@cdk/utils';

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
    processo$: Observable<any>;
    processo: Processo;
    tarefa$: Observable<any>;
    tarefa: Tarefa;
    error$: Observable<any>;
    erro: any;
    saving$: Observable<boolean>;
    routeAtividadeTarefa = 'atividades/criar';
    routeAtividadeDocumento = 'atividade';

    private screen$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: any;

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
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.error$ = this._store.pipe(select(fromStore.getErrors));
        this.saving$ = this._store.pipe(select(fromStore.getIsSaving));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });
        this.tarefa$.pipe(
            filter(tarefa => !!tarefa),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;
        });
        this.error$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(erro => !!erro)
        ).subscribe((erro) => {
            this.erro = erro.error.message;
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
                this._router.url.replace(
                    '/modelos/componente-digital',
                    '/modelos/componente-digital/documento/' + $event.componenteDigital.documento.id
                ),
                {
                    outlets: {
                        primary: primary,
                        sidebar: sidebar
                    }
                }
            ],
            {
                queryParams: {pesquisa: true}
            }).then();
    }

    doSelect(componenteDigitalOrigem): void {
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            componenteDigitalOrigem: componenteDigitalOrigem,
            operacaoId: operacaoId,
            tarefaOrigem: this.tarefa,
            processoOrigem: this.processo,
            routeAtividadeTarefa: this.routeAtividadeTarefa,
            routeAtividadeDocumento: this.routeAtividadeDocumento
        }));
    }
}
