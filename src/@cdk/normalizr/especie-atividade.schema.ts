import {generoAtividade} from './genero-atividade.schema';
import {usuario} from './usuario.schema';
import {favorito} from './favorito.schema';
import {especieAtividade as especieAtividadeSchema} from './base.schema';

especieAtividadeSchema.define({
    generoAtividade: generoAtividade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    favoritos: [favorito]
});

export const especieAtividade = especieAtividadeSchema;
