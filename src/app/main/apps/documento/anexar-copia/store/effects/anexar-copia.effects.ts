import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoActions from '../actions/anexar-copia.actions';
import {ProcessoService} from '@cdk/services/processo.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Processo} from '@cdk/models';
import {processo as processoSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';

@Injectable()
export class AnexarCopiaEffects {
    routerState: any;
    /**
     * Get Processo with router parameters
     *
     * @type {Observable<any>}
     */
    getProcesso: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ProcessoActions.GetProcesso>(ProcessoActions.GET_PROCESSO),
        mergeMap((action) => {
            const contexto = this.routerState.params.chaveAcessoHandle ? {
                chaveAcesso: this.routerState.params.chaveAcessoHandle
            } : {};

            contexto['compartilhamentoUsuario'] = 'processo';

            const populate = action.payload.populate ? [...action.payload.populate] : [];
            return this._processoService.get(
                action.payload.id,
                JSON.stringify([
                    ...populate,
                    'origemDados',
                    'especieProcesso',
                    'especieProcesso.generoProcesso',
                    'especieProcesso.workflow',
                    'especieProcesso.workflow.especieTarefaInicial',
                    'tarefaAtualWorkflow',
                    'tarefaAtualWorkflow.especieTarefa',
                    'setorAtual',
                    'setorAtual.especieSetor',
                    'vinculacoesEtiquetas',
                    'vinculacoesEtiquetas.etiqueta']
                ),
                JSON.stringify(contexto));
        }),
        switchMap(response => [
            new AddData<Processo>({data: [response], schema: processoSchema}),
            new ProcessoActions.GetProcessoSuccess({
                loaded: {
                    id: 'processoCopiaHandle',
                    value: this.routerState.params.processoCopiaHandle,
                    acessoNegado: response.acessoNegado
                },
                processoId: response.id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ProcessoActions.GetProcessoFailed(err));
        })
    ));

    private _profile: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        public _loginService: LoginService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
    }
}
