import {usuario} from './index.schema';
import {processo} from './index.schema';
import {modalidadeMeio} from './index.schema';
import {origemDados} from './index.schema';
import {volume as volumeSchema} from './index.schema';

volumeSchema.define({
    modalidadeMeio: modalidadeMeio,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const volume = volumeSchema;
