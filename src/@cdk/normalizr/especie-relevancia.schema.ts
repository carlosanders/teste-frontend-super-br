import {schema} from '@cdk/normalizr-src';
import {generoRelevancia} from './genero-relevancia.schema';
import {usuario} from './usuario.schema';

export const especieRelevancia = new schema.Entity('especieRelevancia', {
    generoRelevancia: generoRelevancia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

