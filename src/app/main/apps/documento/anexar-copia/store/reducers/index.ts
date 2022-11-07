import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {anexarCopiaReducer, AnexarCopiaState} from './anexar-copia.reducer';
import {assinaturasReducer, AssinaturasState} from './assinaturas.reducer';
import {volumesReducer, VolumesState} from './volumes.reducer';
import {anexosReducer, AnexosState} from './anexos.reducer';

export interface AnexarCopiaAppState
{
    anexarCopia: AnexarCopiaState;
    assinaturas: AssinaturasState;
    volumes: VolumesState;
    anexos: AnexosState;
}

export const getAnexarCopiaAppState = createFeatureSelector<AnexarCopiaAppState>(
    'anexar-copia-app'
);

export const getAppState: any = createSelector(
    getAnexarCopiaAppState,
    (state: AnexarCopiaAppState) => state
);

export const reducers: ActionReducerMap<AnexarCopiaAppState> = {
    anexarCopia: anexarCopiaReducer,
    assinaturas: assinaturasReducer,
    volumes: volumesReducer,
    anexos: anexosReducer
};

export * from './anexar-copia.reducer';
export * from './assinaturas.reducer';
export * from './volumes.reducer';
export * from './anexos.reducer';
