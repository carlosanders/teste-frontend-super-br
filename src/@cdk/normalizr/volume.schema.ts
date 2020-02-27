import {usuario} from './base.schema';
import {processo} from './base.schema';
import {modalidadeMeio} from './base.schema';
import {origemDados} from './base.schema';
import {volume as volumeSchema} from './base.schema';

volumeSchema.define({
    modalidadeMeio: modalidadeMeio,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const volume = volumeSchema;
