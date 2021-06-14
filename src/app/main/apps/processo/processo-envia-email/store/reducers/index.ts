import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {EnviaEmailReducer, EnviaEmailState} from './envia-email.reducer';

export interface EnviaEmailAppState
{
    enviaemail: EnviaEmailState;
}

export const getEnviaEmailAppState = createFeatureSelector<EnviaEmailAppState>(
    'enviaemail-app'
);


export const reducers: ActionReducerMap<EnviaEmailAppState> = {
    enviaemail: EnviaEmailReducer
};

export * from './envia-email.reducer';
