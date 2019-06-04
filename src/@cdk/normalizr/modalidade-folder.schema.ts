import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeFolder = new schema.Entity('modalidadeFolder', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
