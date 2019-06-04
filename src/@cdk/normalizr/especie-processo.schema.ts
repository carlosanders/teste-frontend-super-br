import {schema} from '@cdk/normalizr-src';
import {generoProcesso} from './genero-processo.schema';
import {usuario} from './usuario.schema';

export const especieProcesso = new schema.Entity('especieProcesso', {
    generoProcesso: generoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
