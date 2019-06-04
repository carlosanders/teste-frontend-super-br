import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeTipoInibidor = new schema.Entity('modalidadeTipoInibidor', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
