import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const cargo = new schema.Entity('cargo', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

