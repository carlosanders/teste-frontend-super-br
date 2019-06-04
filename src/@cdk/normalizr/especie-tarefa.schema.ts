import {schema} from '@cdk/normalizr-src';
import {generoTarefa} from './genero-tarefa.schema';
import {usuario} from './usuario.schema';

export const especieTarefa = new schema.Entity('especieTarefa', {
    generoTarefa: generoTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

