import {usuario} from './usuario.schema';
import {role} from './role.schema';
import {vinculacaoRole as vinculacaoRoleSchema} from './base.schema';

vinculacaoRoleSchema.define({
    role: role,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoRole = vinculacaoRoleSchema;
