import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeRepresentante = new schema.Entity('modalidadeRepresentante', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
