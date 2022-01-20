import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {normalized, NormalizedState} from '@cdk/ngrx-normalizr';
import {MercureReducer, MercureState} from './mercure.reducer';
import {AjudaReducer, AjudaState} from './ajuda.reducer';
import {assinaturaReducer, AssinaturaState} from './assinatura.reducer';
import {ScreenReducer, ScreenState} from './screen.reducer';
import {OperacoesReducer, OperacoesState} from './operacoes.reducer';
import {LOGOUT} from '../../main/auth/login/store';
import {CounterReducer, CounterState} from './counter.reducer';
import {NotificacaoReducer, NotificacaoState} from './notificacao.reducer';
import {avaliacaoReducer, AvaliacaoState} from './avaliacao.reducer';
import {objetoAvaliadoReducer, ObjetoAvaliadoState} from './objeto-avaliado.reducer';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State extends NormalizedState {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    mercureReducer: MercureState;
    counterReducer: CounterState;
    ajudaReducer: AjudaState;
    assinaturaReducer: AssinaturaState;
    screenReducer: ScreenState;
    operacoesReducer: OperacoesState;
    notificacoes: NotificacaoState;
    avaliacaoReducer: AvaliacaoState;
    objetoAvaliadoReducer: ObjetoAvaliadoState;
}

export const reducers: ActionReducerMap<State> = {
    normalized,
    routerReducer: fromRouter.routerReducer,
    mercureReducer: MercureReducer,
    counterReducer: CounterReducer,
    ajudaReducer: AjudaReducer,
    assinaturaReducer: assinaturaReducer,
    screenReducer: ScreenReducer,
    operacoesReducer: OperacoesReducer,
    notificacoes: NotificacaoReducer,
    avaliacaoReducer: avaliacaoReducer,
    objetoAvaliadoReducer: objetoAvaliadoReducer
};

export const clearState = (reducer): any => {
    return (state, action) => {

        if (action.type === LOGOUT) {
            state = undefined;
        }

        return reducer(state, action);
    };
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getMercureState = createFeatureSelector<MercureState>('mercureReducer');

export const getCounterState = createFeatureSelector<CounterState>('counterReducer');

export const getAjudaState = createFeatureSelector<AjudaState>('ajudaReducer');

export const getAssinaturaState = createFeatureSelector<AssinaturaState>('assinaturaReducer');

export const getScreenState = createFeatureSelector<ScreenState>('screenReducer');

export const getOperacoesState = createFeatureSelector<OperacoesState>('operacoesReducer');

export const getNotificacoesState = createFeatureSelector<NotificacaoState>('notificacoes');

export const getAvaliacaoState = createFeatureSelector<AvaliacaoState>('avaliacaoReducer');

export const getObjetoAvaliadoState = createFeatureSelector<ObjetoAvaliadoState>('objetoAvaliadoReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const {url} = routerState;
        const {queryParams} = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const {params} = state;

        return {
            url,
            queryParams,
            params
        };
    }
}


