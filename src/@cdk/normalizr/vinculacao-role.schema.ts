import {usuario} from './index.schema';
import {vinculacaoRole as vinculacaoRoleSchema} from './index.schema';

vinculacaoRoleSchema.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoRole = vinculacaoRoleSchema;
