import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeCategoriaSigilo = new schema.Entity('modalidadeCategoriaSigilo', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
