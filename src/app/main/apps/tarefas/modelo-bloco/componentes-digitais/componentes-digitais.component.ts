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
import {ComponenteDigital, Tarefa} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState, getScreenState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';
import {getSelectedTarefas} from '../../store';
import {getOperacoes} from '../../../../../store';

@Component({
    selector: 'componentes-digitais-bloco',
    templateUrl: './componentes-digitais.component.html',
    styleUrls: ['./componentes-digitais.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponentesDigitaisComponent implements OnInit, OnDestroy {

    componentesDigitais$: Observable<ComponenteDigital[]>;
    loading$: Observable<boolean>;
    saving$: Observable<boolean>;
    error$: Observable<any>;
    erro: any;
    pagination$: Observable<any>;
    pagination: any;
    mobileMode: boolean;
    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    lote: string;

    routerState: any;

    filter = {};

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
        private _store: Store<fromStore.ComponentesDigitaisBlocoAppState>,
        public _loginService: LoginService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.componentesDigitais$ = this._store.pipe(select(fromStore.getComponentesDigitais));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this._profile = _loginService.getUserProfile();
        this.screen$ = this._store.pipe(select(getScreenState));
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
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

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'componente digital' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes)
                .filter((operacao: any) => operacao.type === 'componente digital' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.markForCheck();
        });
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
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
        this._store.dispatch(new fromStore.UnloadComponentesDigitais());
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
            populate: [
                ...this.pagination.populate
            ],
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
        this.lote = CdkUtils.makeId();
        this.tarefas.forEach((tarefa) => {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.CreateComponenteDigital({
                componenteDigitalOrigem: componenteDigitalOrigem,
                operacaoId: operacaoId,
                tarefaOrigem: tarefa,
                processoOrigem: tarefa.processo,
                loteId: this.lote
            }));
        });
    }
}
