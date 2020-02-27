import {generoRelevancia} from './genero-relevancia.schema';
import {usuario} from './usuario.schema';
import {especieRelevancia as especieRelevanciaSchema} from './base.schema';

especieRelevanciaSchema.define({
    generoRelevancia: generoRelevancia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieRelevancia = especieRelevanciaSchema;

