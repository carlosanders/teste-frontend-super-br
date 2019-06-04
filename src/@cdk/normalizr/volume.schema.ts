import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {modalidadeMeio} from './modalidade-meio.schema';
import {origemDados} from './origem-dados.schema';

export const volume = new schema.Entity('volume', {
    modalidadeMeio: modalidadeMeio,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
