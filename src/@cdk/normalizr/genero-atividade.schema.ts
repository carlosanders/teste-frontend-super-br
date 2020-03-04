import {usuario} from './index.schema';
import {generoAtividade as generoAtividadeSchema} from './index.schema';

generoAtividadeSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoAtividade = generoAtividadeSchema;
