import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeTransicao = new schema.Entity('modalidadeTransicao', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
