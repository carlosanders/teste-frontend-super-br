import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeEtiqueta = new schema.Entity('modalidadeEtiqueta', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
