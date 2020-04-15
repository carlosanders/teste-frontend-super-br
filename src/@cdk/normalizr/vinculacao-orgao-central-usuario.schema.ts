import {usuario} from './index.schema';
import {vinculacaoOrgaoCentralUsuario as vinculacaoOrgaoCentralUsuarioSchema} from './index.schema';

vinculacaoOrgaoCentralUsuarioSchema.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoOrgaoCentralUsuario = vinculacaoOrgaoCentralUsuarioSchema;
