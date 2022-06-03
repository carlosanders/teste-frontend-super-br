import {createSelector} from '@ngrx/store';
import * as fromStore from '../';

export const getComponenteDigitalState: any = createSelector(
    fromStore.getTarefaDetailAppState,
    (state: fromStore.TarefaDetailAppState) => state.componentesDigitais
);

export const getSavingComponentesDigitaisIds: any = createSelector(
    getComponenteDigitalState,
    (state: fromStore.ComponenteDigitalState) => state.saving
);

export const getErrorsComponentesDigitais: any = createSelector(
    getComponenteDigitalState,
    (state: fromStore.ComponenteDigitalState) => state.errors
);

export const getIsLoadingSaving: any = createSelector(
    getComponenteDigitalState,
    (state: fromStore.ComponenteDigitalState) => state.loading
);
