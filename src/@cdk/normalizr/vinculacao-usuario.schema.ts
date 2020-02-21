import {usuario} from './base.schema';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from './base.schema';

vinculacaoUsuarioSchema.define({
    usuario: usuario,
    usuarioVinculado: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoUsuario = vinculacaoUsuarioSchema;
