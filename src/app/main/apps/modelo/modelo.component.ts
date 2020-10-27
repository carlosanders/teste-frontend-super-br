import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Modelo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Processo} from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {DynamicService} from 'modules/dynamic.service';
import {modulesConfig} from 'modules/modules-config';

@Component({
    selector: 'modelo',
    templateUrl: './modelo.component.html',
    styleUrls: ['./modelo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModeloComponent implements OnInit, AfterViewInit, OnDestroy  {

    modelos$: Observable<Modelo[]>;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    erro: any;
    pagination$: Observable<any>;
    pagination: any;

    processo$: Observable<any>;
    processo: Processo;

    tarefa$: Observable<any>;
    tarefa: Tarefa;

    routerState: any;

    filter = {};

    routeAtividadeTarefa = 'atividades/criar';
    routeAtividadeDocumento = 'atividade'

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _dynamicService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosAppState>,
        private _dynamicService: DynamicService
    ) {

        this.modelos$ = this._store.pipe(select(fromStore.getModelos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.error$ = this._store.pipe(select(fromStore.getErrors));

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/tarefas/tarefa-detail';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(path) &&
                module.routerLinks[path].hasOwnProperty('atividades') &&
                module.routerLinks[path]['atividades'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividadeTarefa = module.routerLinks[path]['atividades'][this.routerState.params.generoHandle];
            }
        });
        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('atividade') &&
                module.routerLinks[pathDocumento]['atividade'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeAtividadeDocumento = module.routerLinks[pathDocumento]['atividade'][this.routerState.params.generoHandle];
            }
        });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
        this.processo$.subscribe(processo => {
            this.processo = processo;
        });
        this.tarefa$.subscribe(tarefa => {
            this.tarefa = tarefa;
        });
        this.error$.subscribe(erro => {
            if (erro) {
                this.erro = erro.error.message;
            }
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadModelos());
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
        this._store.dispatch(new fromStore.CreateComponenteDigital({
            modelo: modelo,
            tarefaOrigem: this.tarefa,
            processoOrigem: this.processo,
            routeAtividadeTarefa: this.routeAtividadeTarefa,
            routeAtividadeDocumento: this.routeAtividadeDocumento
        }));
    }

}
