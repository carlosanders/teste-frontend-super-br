import { ProtocoloCreateEffects } from './protocolo-create.effects';
import { ProcessoEffect } from './processo.effects';

export const effects = [
    ProtocoloCreateEffects,
    ProcessoEffect
];

export * from './protocolo-create.effects';
export * from './processo.effects';
