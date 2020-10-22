import {createSelector} from '@ngrx/store';
import {OperacoesState} from '../reducers/operacoes.reducer';
import {getOperacoesState} from '../reducers';

export const getOperacoes = createSelector(
    getOperacoesState,
    (state: OperacoesState) => state.operacoes
);

export const getLotes = createSelector(
    getOperacoesState,
    (state: OperacoesState) => state.lotes
);

export const getOperacoesEmProcessamento = createSelector(
    getOperacoes,
    (operacoes) => {
        const operacoesEmProcessamento = {};
        Object.keys(operacoes).forEach((operacaoId) => {
            if (operacoes[operacaoId]['status'] === 0) {
                operacoesEmProcessamento[operacaoId] = (operacoes[operacaoId]);
            }
        });
        return operacoesEmProcessamento;
    }
);

export const getLotesEmProcessamento = createSelector(
    getLotes,
    getOperacoesEmProcessamento,
    (lotes, operacoesEmProcessamento) => {
        const operacoesIdEmProcessamento = Object.keys(operacoesEmProcessamento);
        const lotesEmProcessamento = {};
        Object.keys(lotes).forEach((loteId) => {
            lotes[loteId]['operacoesId'].forEach((operacaoId) => {
                if (operacoesIdEmProcessamento.indexOf(operacaoId) > -1) {
                    lotesEmProcessamento[loteId] = lotes[loteId];
                }
            });
        });
        return lotesEmProcessamento;
    }
);
