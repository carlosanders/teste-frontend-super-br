import {schema} from '@cdk/normalizr-src';
import {processo} from './processo.schema';
import {tarefa} from './tarefa.schema';
import {usuario} from './usuario.schema';

export const modalidadeFase = new schema.Entity('modalidadeFase', {
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
