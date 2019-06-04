import {schema} from '@cdk/normalizr-src';
import {generoAtividade} from './genero-atividade.schema';
import {usuario} from './usuario.schema';

export const especieAtividade = new schema.Entity('especieAtividade', {
    generoAtividade: generoAtividade,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
