import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Modelo, Pagination, Processo, Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';
import {LoginService} from "../../../auth/login/login.service";

@Component({
    selector: 'modelo',
    templateUrl: './modelo.component.html',
    styleUrls: ['./modelo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloComponent implements OnInit, AfterViewInit, OnDestroy {

    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    saving$: Observable<boolean>;
    error$: Observable<any>;
    erro: any;
    pagination$: Observable<any>;
    pagination: any;
    mobileMode: boolean;
    processo$: Observable<any>;
    processo: Processo;

    tarefa$: Observable<any>;
    tarefa: Tarefa;

    routerState: any;

    filter = {};

    routeAtividadeTarefa = 'atividades/criar';
    routeAtividadeDocumento = 'atividade';
    private _unsubscribeAll: Subject<any> = new Subject();
    private screen$: Observable<any>;

    orgaoCentralPagination: Pagination;
    unidadePagination: Pagination;
    setorPagination: Pagination;

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _dynamicService
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosAppState>,
        private _dynamicService: DynamicService,
        private _loginService: LoginService,
    ) {
        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.error$ = this._store.pipe(select(fromStore.getErrors));
        this.saving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.screen$ = this._store.pipe(select(getScreenState));

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.setorPagination = new Pagination();
        this.setorPagination.filter = {
            id: 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor?.id).join(','),
            parent: 'isNotNull'
        };

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {
            id: 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor?.unidade?.id).join(','),
            parent: 'isNull'
        };

        this.orgaoCentralPagination = new Pagination();
        this.orgaoCentralPagination.filter = {
            id: 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor?.unidade?.modalidadeOrgaoCentral?.id).join(','),
        };
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/tarefa-detail';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividades') &&
                module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeTarefa = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
            }
        });
        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle) &&
                (module.name === this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
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
        this._store.dispatch(new fromStore.UnloadModelos());
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetModelos({
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
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    doSelect(modelo): void {
        this.loading$ = this._store.pipe(select(fromStore.getIsLoadingSaving));
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            operacaoId: operacaoId,
            tarefaOrigem: this.tarefa,
            processoOrigem: this.processo,
            routeAtividadeTarefa: this.routeAtividadeTarefa,
            routeAtividadeDocumento: this.routeAtividadeDocumento
        }));
    }

    doVisualizar(modeloId): void {
        this._store.dispatch(new fromStore.VisualizarModelo(modeloId));
    }
}
