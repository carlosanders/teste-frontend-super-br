import {ProcessoEffect} from './processo.effects';
import {ProtocoloDocumentoEffects} from './protocolo-documento.effects';
import {ProtocoloExistenteEffects} from './protocolo-existente.effects';

export const effects = [
    ProcessoEffect,
    ProtocoloDocumentoEffects,
    ProtocoloExistenteEffects
];

export * from './processo.effects';
export * from './protocolo-documento.effects';
export * from './protocolo-existente.effects';


