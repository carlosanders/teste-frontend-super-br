import { DadosBasicosEffect } from './dados-basicos.effects';
import { AssuntosEffect } from './assunto.effects';
import { InteressadosEffect } from './interessado.effects';
import { VinculacaoProcessoEffects } from './vinculacao-processo.effects';

export const effects = [
    DadosBasicosEffect,
    AssuntosEffect,
    InteressadosEffect,
    VinculacaoProcessoEffects
];

export * from './dados-basicos.effects';
export * from './assunto.effects';
export * from './interessado.effects';
export * from './vinculacao-processo.effects';
