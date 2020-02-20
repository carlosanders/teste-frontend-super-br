import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {modalidadeMeio} from './modalidade-meio.schema';
import {origemDados} from './origem-dados.schema';
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
