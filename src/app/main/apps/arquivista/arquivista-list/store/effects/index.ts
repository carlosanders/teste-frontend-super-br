import {ArquivistaEffect} from './arquivista.effects';
import {LembreteEffects} from './lembrete.effects';
import {ModalidadeTransicaoEffects} from './modalidade-transicao.effects';

export const effects = [
    ArquivistaEffect,
    LembreteEffects,
    ModalidadeTransicaoEffects
];

export * from './arquivista.effects';
export * from './lembrete.effects';
export * from './modalidade-transicao.effects';
