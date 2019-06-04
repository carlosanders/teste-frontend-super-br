import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeRepositorio = new schema.Entity('modalidadeRepositorio', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
