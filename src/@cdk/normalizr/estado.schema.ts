import {schema} from '@cdk/normalizr-src';
import {pais} from './pais.schema';
import {usuario} from './usuario.schema';

export const estado = new schema.Entity('estado', {
    pais: pais,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

