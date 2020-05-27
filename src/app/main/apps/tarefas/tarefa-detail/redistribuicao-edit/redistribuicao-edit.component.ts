import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Favorito, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/store';
import { SaveTarefa } from 'app/main/apps/tarefas/tarefa-detail/store';
import {filter, skip, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../../auth/login/login.service';
import {Colaborador} from '@cdk/models';
import {getOperacoesState, getRouterState} from '../../../../../store/reducers';
import {Router} from '@angular/router';
import * as fromStoreTarefas from 'app/main/apps/tarefas/store';
import * as fromStoreFavoritos from 'app/main/apps/tarefas/store';

@Component({
    selector: 'redistribuicao-edit',
    templateUrl: './redistribuicao-edit.component.html',
    styleUrls: ['./redistribuicao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RedistribuicaoEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pagination$: Observable<any>;
    pagination: any;

    _profile: Colaborador;

    operacoes: any[] = [];
    routerState: any;

    favoritos$: Observable<Favorito[]>;

    /**
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.TarefaDetailAppState>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
        this.pagination$ = this._store.pipe(select(fromStoreTarefas.getPagination));

        this.favoritos$ = this._store.pipe(select(fromStoreFavoritos.getFavoritoList));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });

        this._store
            .pipe(
                select(getOperacoesState),
                skip(1),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'tarefa')
            )
            .subscribe(
                operacao => {

                    this.reloadTarefas();

                    this._router.navigate(['apps/tarefas/' + this.routerState.params.generoHandle + '/' +
                    this.routerState.params.typeHandle + '/' +
                    '/' + this.routerState.params.targetHandle]).then();
                }
            );

        this.tarefa$.pipe(
            filter(tarefa => !this.tarefa || (tarefa.id !== this.tarefa.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefa => {
            this.tarefa = tarefa;
            this.tarefa.unidadeResponsavel = tarefa.setorResponsavel.unidade;
            this.tarefa.setorResponsavel = null;
            this.tarefa.usuarioResponsavel = null;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reloadTarefas(): void {

        this._store.dispatch(new fromStoreTarefas.UnloadTarefas({reset: false}));

        const nparams = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter
            },
            sort: this.pagination.sort,
            limit: this.pagination.limit,
            offset: this.pagination.offset,
            populate: this.pagination.populate
        };

        this._store.dispatch(new fromStoreTarefas.GetTarefas(nparams));

    }

    submit(values): void {

        const tarefa = new Tarefa();

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        tarefa.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas;

        this._store.dispatch(new SaveTarefa(tarefa));

    }

    getFavoritos(value): void {

        this._store.dispatch(new fromStoreFavoritos.GetFavoritos({
            filter:
                {
                    'usuario.id': `eq:${this._loginService.getUserProfile().id}`,
                    'objectClass': `eq:SuppCore\\AdministrativoBackend\\Entity\\` + value
                },
            limit: 5,
            sort: {prioritario: 'DESC', qtdUso: 'DESC'}
        }));
    }

}
