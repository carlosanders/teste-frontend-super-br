import {usuario} from './usuario.schema';
import {generoAtividade as generoAtividadeSchema} from './base.schema';

generoAtividadeSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoAtividade = generoAtividadeSchema;
