import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {OficioDetailReducer, OficioDetailState} from './oficio-detail.reducer';

export interface OficioDetailAppState
{
    oficioDetail: OficioDetailState;
}

export const getDocumentoAvulsoDetailAppState = createFeatureSelector<OficioDetailAppState>(
    'oficio-detail-app'
);

export const getAppState: any = createSelector(
    getDocumentoAvulsoDetailAppState,
    (state: OficioDetailAppState) => state
);

export const reducers: ActionReducerMap<OficioDetailAppState> = {
    oficioDetail: OficioDetailReducer
};

export * from './oficio-detail.reducer';
