import {RelatorioCreateEffect} from './relatorio-create.effects';
import {GeneroRelatoriosEffects} from './genero-relatorio.effects';

export const effects = [
    RelatorioCreateEffect,
    GeneroRelatoriosEffects
];

export * from './relatorio-create.effects';
export * from './genero-relatorio.effects';
