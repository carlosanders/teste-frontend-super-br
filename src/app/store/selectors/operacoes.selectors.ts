import {createSelector} from '@ngrx/store';
import {OperacoesState} from '../reducers/operacoes.reducer';
import {getOperacoesState} from '../reducers';

export const getOperacoes: any = createSelector(
    getOperacoesState,
    (state: OperacoesState) => state.operacoes
);

export const getLotes: any = createSelector(
    getOperacoesState,
    (state: OperacoesState) => state.lotes
);

export const getCurrentLote: any = createSelector(
    getOperacoesState,
    (state: OperacoesState) => state.currentLote
);

export const getOperacoesEmProcessamento: any = createSelector(
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

export const getOperacoesLoteAtual: any = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual: any) => {
        const operacoesLoteAtual = {};
        if (loteAtual) {
            lotes[loteAtual].operacoesId.forEach((operacaoId) => {
                operacoesLoteAtual[operacaoId] = (operacoes[operacaoId]);
            });
        }
        return operacoesLoteAtual;
    }
);

export const getOperacoesEmProcessamentoLoteAtual: any = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual: any) => {
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

export const getOperacoesRefazerLoteAtual: any = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual: any) => {
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

export const getOperacoesDesfazerLoteAtual: any = createSelector(
    getLotes,
    getOperacoes,
    getCurrentLote,
    (lotes, operacoes, loteAtual: any) => {
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

export const getLotesEmProcessamento: any = createSelector(
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
