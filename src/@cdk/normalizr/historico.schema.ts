import {schema} from '@cdk/normalizr-src';
import {processo} from './processo.schema';
import {usuario} from './usuario.schema';

export const historico = new schema.Entity('historico', {
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
