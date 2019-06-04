import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {especieRelevancia} from './especie-relevancia.schema';
import {processo} from './processo.schema';

export const relevancia = new schema.Entity('relevancia', {
    especieRelevancia: especieRelevancia,
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
