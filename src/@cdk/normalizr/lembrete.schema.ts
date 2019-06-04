import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';

export const lembrete = new schema.Entity('lembrete', {
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
