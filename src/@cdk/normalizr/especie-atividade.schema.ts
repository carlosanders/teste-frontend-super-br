import {schema} from '@cdk/normalizr-src';
import {generoAtividade} from './genero-atividade.schema';
import {usuario} from './usuario.schema';
import {favorito} from './favorito.schema';
import {folder} from './folder.schema';
import {vinculacaoEtiqueta} from './vinculacao-etiqueta.schema';

export const especieAtividade = new schema.Entity('especieAtividade', {
    generoAtividade: generoAtividade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    favoritos: [favorito]
});
