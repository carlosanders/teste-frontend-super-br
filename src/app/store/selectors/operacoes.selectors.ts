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

export const getCurrentLote = createSelector(
    getOperacoesState,
    (state: OperacoesState) => state.currentLote
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

export const getOperacoesLoteAtual = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual) => {
        const operacoesLoteAtual = {};
        if (loteAtual) {
            lotes[loteAtual].operacoesId.forEach((operacaoId) => {
                operacoesLoteAtual[operacaoId] = (operacoes[operacaoId]);
            });
        }
        return operacoesLoteAtual;
    }
);

export const getOperacoesEmProcessamentoLoteAtual = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual) => {
        const operacoesEmProcessamentoLoteAtual = {};
        if (loteAtual) {
            lotes[loteAtual].operacoesId.forEach((operacaoId) => {
                if (operacoes[operacaoId]['status'] === 0) {
                    operacoesEmProcessamentoLoteAtual[operacaoId] = (operacoes[operacaoId]);
                }
            });
        }
        return operacoesEmProcessamentoLoteAtual;
    }
);

export const getOperacoesRefazerLoteAtual = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual) => {
        const operacoesRefazerLoteAtual = {};
        if (loteAtual) {
            lotes[loteAtual].operacoesId.forEach((operacaoId) => {
                if (operacoes[operacaoId]['status'] >= 2 && operacoes[operacaoId]['redo']) {
                    operacoesRefazerLoteAtual[operacaoId] = (operacoes[operacaoId]);
                }
            });
        }
        return operacoesRefazerLoteAtual;
    }
);

export const getOperacoesDesfazerLoteAtual = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual) => {
        const operacoesDesfazerLoteAtual = {};
        if (loteAtual) {
            lotes[loteAtual].operacoesId.forEach((operacaoId) => {
                if (operacoes[operacaoId]['status'] === 1 && operacoes[operacaoId]['undo']) {
                    operacoesDesfazerLoteAtual[operacaoId] = (operacoes[operacaoId]);
                }
            });
        }
        return operacoesDesfazerLoteAtual;
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
