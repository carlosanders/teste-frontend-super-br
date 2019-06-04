import {schema} from '@cdk/normalizr-src';
import {generoSetor} from './genero-setor.schema';
import {usuario} from './usuario.schema';

export const especieSetor = new schema.Entity('especieSetor', {
    generoSetor: generoSetor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

