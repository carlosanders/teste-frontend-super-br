import {usuario} from './index.schema';
import {pessoa} from './index.schema';
import {vinculacaoPessoaUsuario as vinculacaoPessoaUsuarioSchema} from './index.schema';

vinculacaoPessoaUsuarioSchema.define({
    usuario: usuario,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const vinculacaoPessoaUsuario = vinculacaoPessoaUsuarioSchema;
