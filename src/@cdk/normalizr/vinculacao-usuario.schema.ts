import {usuario} from './index.schema';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from './index.schema';

vinculacaoUsuarioSchema.define({
    usuario: usuario,
    usuarioVinculado: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoUsuario = vinculacaoUsuarioSchema;
