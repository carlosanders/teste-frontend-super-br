import { TarefasEffect } from './protocolos-externos.effects';
import { FoldersEffect } from './folders.effects';

export const effects = [
    TarefasEffect,
    FoldersEffect
];

export * from './protocolos-externos.effects';
export * from './folders.effects';
