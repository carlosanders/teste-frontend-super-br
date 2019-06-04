import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {origemDados} from './origem-dados.schema';

export const componenteDigital = new schema.Entity('componenteDigital', {
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
