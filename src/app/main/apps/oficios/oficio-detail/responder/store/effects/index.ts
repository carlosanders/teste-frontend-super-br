import {DocumentosEffects} from './documentos.effects';
import {ResponderEffects} from './responder.effects';
import {ComplementaresEffects} from './complementares.effects';

export const effects = [
    DocumentosEffects,
    ResponderEffects,
    ComplementaresEffects
];

export * from './documentos.effects';
export * from './responder.effects';
export * from './complementares.effects';
