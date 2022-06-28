import {ProtocoloCreateEffects} from './protocolo-create.effects';
import {ProcessoEffect} from './processo.effects';
import {ProtocoloDocumentoEffects} from './protocolo-documento.effects';
import {EstadosEffects} from './estados.effects';

export const effects = [
    ProtocoloCreateEffects,
    ProcessoEffect,
    ProtocoloDocumentoEffects,
    EstadosEffects
];

export * from './protocolo-create.effects';
export * from './processo.effects';
export * from './protocolo-documento.effects';
export * from './estados.effects';

