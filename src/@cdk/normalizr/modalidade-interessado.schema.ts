import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeInteressado = new schema.Entity('modalidadeInteressado', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
