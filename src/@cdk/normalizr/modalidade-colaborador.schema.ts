import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeColaborador = new schema.Entity('modalidadeColaborador', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

