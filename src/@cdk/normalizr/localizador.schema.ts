import {schema} from '@cdk/normalizr-src';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';

export const localizador = new schema.Entity('localizador', {
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
