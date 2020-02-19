import { ProcessosEffect } from './processos.effects';
import { FoldersEffect } from './folders.effects';
import {DocumentosAvulsoEffects} from './documentos-avulso.effects';

export const effects = [
    ProcessosEffect,
    DocumentosAvulsoEffects,
    FoldersEffect
];

export * from './processos.effects';
export * from './folders.effects';
export * from './documentos-avulso.effects';
