import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const modalidadeAlvoInibidor = new schema.Entity('modalidadeAlvoInibidor', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
