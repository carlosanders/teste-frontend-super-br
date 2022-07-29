import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ProcessoTimelineReducer, ProcessoTimelineState} from './processo-timeline.reducer';

export interface ProcessoTimelineAppState
{
    processoTimeline: ProcessoTimelineState;
}

export const getProcessoTimelineAppState = createFeatureSelector<ProcessoTimelineAppState>(
    'processo-timeline-app'
);

export const getAppState: any = createSelector(
    getProcessoTimelineAppState,
    (state: ProcessoTimelineAppState) => state
);

export const reducers: ActionReducerMap<ProcessoTimelineAppState> = {
    processoTimeline: ProcessoTimelineReducer
};

export * from './processo-timeline.reducer';
