import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { OficioDetailReducer, DocumentoAvulsoDetailState } from './oficio-detail.reducer';

export interface OficioDetailAppState
{
    oficioDetail: DocumentoAvulsoDetailState;
}

export const getOficioDetailAppState = createFeatureSelector<OficioDetailAppState>(
    'oficio-detail-app'
);

export const getAppState = createSelector(
    getOficioDetailAppState,
    (state: OficioDetailAppState) => state
);

export const reducers: ActionReducerMap<OficioDetailAppState> = {
    oficioDetail: OficioDetailReducer
};

export * from './oficio-detail.reducer';
