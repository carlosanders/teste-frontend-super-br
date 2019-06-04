import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {role} from './role.schema';

export const vinculacaoRole = new schema.Entity('vinculacaoRole', {
    role: role,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
