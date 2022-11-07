import {AnexarCopiaEffects} from './anexar-copia.effects';
import {AssinaturasEffects} from './assinaturas.effects';
import {VolumesEffects} from './volumes.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';
import {AnexosEffects} from './anexos.effects';

export const effects = [
    AnexarCopiaEffects,
    AssinaturasEffects,
    ComponentesDigitaisEffects,
    VolumesEffects,
    AnexosEffects
];

export * from './anexar-copia.effects';
export * from './assinaturas.effects';
export * from './componentes-digitais.effects';
export * from './volumes.effects';
export * from './anexos.effects';
