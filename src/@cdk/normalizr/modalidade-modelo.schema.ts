import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeModelo = new schema.Entity('modalidadeModelo', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
