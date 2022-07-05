import {VisualizarProcessoEffects} from './visualizar-processo.effects';
import {AssinaturasEffects} from './assinaturas.effects';
import {VolumesEffects} from './volumes.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';

export const effects = [
    VisualizarProcessoEffects,
    AssinaturasEffects,
    ComponentesDigitaisEffects,
    VolumesEffects
];

export * from './visualizar-processo.effects';
export * from './assinaturas.effects';
export * from './componentes-digitais.effects';
export * from './volumes.effects';
