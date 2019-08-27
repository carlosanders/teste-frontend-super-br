import {ActivatedRouteSnapshot, RouterStateSnapshot, Params} from '@angular/router';
import {createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {NormalizedState, normalized} from '@cdk/ngrx-normalizr';
import {MercureReducer, MercureState} from './mercure.reducer';
import {ScreenReducer, ScreenState} from './screen.reducer';
import {OperacoesReducer, OperacoesState} from './operacoes.reducer';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State extends NormalizedState {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    mercureReducer: MercureState;
    screenReducer: ScreenState;
    operacoesReducer: OperacoesState;
}

export const reducers: ActionReducerMap<State> = {
    normalized,
    routerReducer: fromRouter.routerReducer,
    mercureReducer: MercureReducer,
    screenReducer: ScreenReducer,
    operacoesReducer: OperacoesReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getMercureState = createFeatureSelector<MercureState>('mercureReducer');

export const getScreenState = createFeatureSelector<ScreenState>('screenReducer');

export const getOperacoesState = createFeatureSelector<OperacoesState>('operacoesReducer');

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


