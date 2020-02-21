import {generoAtividade} from './base.schema';
import {usuario} from './base.schema';
import {favorito} from './base.schema';
import {especieAtividade as especieAtividadeSchema} from './base.schema';

especieAtividadeSchema.define({
    generoAtividade: generoAtividade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    favoritos: [favorito]
});

export const especieAtividade = especieAtividadeSchema;
