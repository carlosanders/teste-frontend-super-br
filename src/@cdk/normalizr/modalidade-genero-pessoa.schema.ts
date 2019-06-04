import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeGeneroPessoa = new schema.Entity('modalidadeGeneroPessoa', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
