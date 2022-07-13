import {createSelector} from '@ngrx/store';
import {getProcessoTimelineAppState, ProcessoTimelineAppState, ProcessoTimelineState} from '../reducers';
import {getRouterState} from 'app/store';

export const getProcessoTimelineState: any = createSelector(
    getProcessoTimelineAppState,
    (state: ProcessoTimelineAppState) => state.processoTimeline
);

export const getProcessoHandle: any = createSelector(
    getRouterState,
    router => router?.state.params['processoHandle']
);

export const getIsLoaded: any = createSelector(
    getProcessoTimelineState,
    (state: ProcessoTimelineState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getProcessoTimelineState,
    (state: ProcessoTimelineState) => state.loading
);

export const getErrors: any = createSelector(
    getProcessoTimelineState,
    (state: ProcessoTimelineState) => state.errors
);

export const getList: any = createSelector(
    getProcessoTimelineState,
    (state: ProcessoTimelineState) => state.list
);

