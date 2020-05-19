import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Favorito, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import * as fromStoreFavoritos from 'app/main/apps/tarefas/store';

@Component({
    selector: 'redistribuicao-edit-bloco',
    templateUrl: './redistribuicao-edit-bloco.component.html',
    styleUrls: ['./redistribuicao-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RedistribuicaoEditBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    blocoEditDistribuicao = true;
    favoritos$: Observable<Favorito[]>;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.RedistribuicaoEditBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

        this.favoritos$ = this._store.pipe(select(fromStoreFavoritos.getFavoritoList));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => this.tarefas = tarefas);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'tarefa')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        this.operacoes = [];

        this.tarefas.forEach(tarefaBloco => {
            const tarefa = new Tarefa();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.id = tarefaBloco.id;
console.log(tarefa);
            let changes = {};

            if (this.blocoEditDistribuicao) {
                changes = {
                    setorResponsavel: tarefa.setorResponsavel,
                    usuarioResponsavel: tarefa.usuarioResponsavel
                };
            }

            this._store.dispatch(new fromStore.SaveTarefa({tarefa: tarefa, changes: changes}));
        });
    }

    getFavoritos (value): void {

        this._store.dispatch(new fromStoreFavoritos.GetFavoritos({
            'filter':
                {
                    'usuario.id': `eq:${this._loginService.getUserProfile().id}`,
                    'objectClass': `eq:SuppCore\\AdministrativoBackend\\Entity\\` + value
                },
            'limit': 5,
            'sort': {prioritario:'DESC', qtdUso: 'DESC'}
        }));
    }
}
