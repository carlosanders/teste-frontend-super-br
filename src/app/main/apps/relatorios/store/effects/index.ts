import { RelatoriosEffect } from './relatorios.effects';
import { FoldersEffect } from './folders.effects';
import { TipoRelatoriosEffect } from './tipo-relatorio.effects';

export const effects = [
    RelatoriosEffect,
    FoldersEffect,
    TipoRelatoriosEffect
];

export * from './relatorios.effects';
export * from './folders.effects';
export * from './tipo-relatorio.effects';
