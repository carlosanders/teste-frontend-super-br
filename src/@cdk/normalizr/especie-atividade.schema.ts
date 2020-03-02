import {generoAtividade} from './index.schema';
import {usuario} from './index.schema';
import {favorito} from './index.schema';
import {especieAtividade as especieAtividadeSchema} from './index.schema';

especieAtividadeSchema.define({
    generoAtividade: generoAtividade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    favoritos: [favorito]
});

export const especieAtividade = especieAtividadeSchema;
