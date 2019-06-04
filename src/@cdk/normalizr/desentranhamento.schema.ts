import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {juntada} from './juntada.schema';
import {processo} from './processo.schema';

export const desentranhamento = new schema.Entity('desentranhamento', {
    juntada: juntada,
    processoDestino: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
