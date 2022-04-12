import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {componenteDigitalReducer, ComponenteDigitalState} from './componente-digital.reducer';

export interface ValidacaoAssinaturaAppState
{
    componenteDigital: ComponenteDigitalState;
}

export const getValidacaoAssinaturaAppState = createFeatureSelector<ValidacaoAssinaturaAppState>(
    'validacao-assinatura-app'
);

export const getAppState: any = createSelector(
    getValidacaoAssinaturaAppState,
    (state: ValidacaoAssinaturaAppState) => state
);

export const reducers: ActionReducerMap<ValidacaoAssinaturaAppState> = {
    componenteDigital: componenteDigitalReducer
};

export * from './componente-digital.reducer';
