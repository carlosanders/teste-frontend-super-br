import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {NotificacaoListReducer, NotificacaoListState} from './notificacao-list.reducer';

export interface NotificacaoListAppState
{
    notificacaoList: NotificacaoListState;
}

export const getNotificacaoListAppState = createFeatureSelector<NotificacaoListAppState>(
    'notificacao-list-app'
);

export const getAppState: any = createSelector(
    getNotificacaoListAppState,
    (state: NotificacaoListAppState) => state
);

export const reducers: ActionReducerMap<NotificacaoListAppState> = {
    notificacaoList: NotificacaoListReducer
};

export * from './notificacao-list.reducer';
