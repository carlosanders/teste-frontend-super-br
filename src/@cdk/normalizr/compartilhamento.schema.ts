import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';

export const compartilhamento = new schema.Entity('compartilhamento', {
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
