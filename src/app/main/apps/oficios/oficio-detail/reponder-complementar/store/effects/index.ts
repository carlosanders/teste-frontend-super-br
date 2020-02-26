import {DocumentosEffects} from './documentos.effects';
import {ResponderEffects} from './responder.effects';
import {ComplementarEffects} from './complementar.effects';

export const effects = [
    DocumentosEffects,
    ResponderEffects,
    ComplementarEffects
];

export * from './documentos.effects';
export * from './responder.effects';
export * from './complementar.effects';
