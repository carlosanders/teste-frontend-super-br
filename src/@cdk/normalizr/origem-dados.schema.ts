import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const origemDados = new schema.Entity('origemDados', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

