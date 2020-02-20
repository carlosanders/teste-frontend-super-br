import {generoRelevancia} from './base.schema';
import {usuario} from './base.schema';
import {especieRelevancia as especieRelevanciaSchema} from './base.schema';

especieRelevanciaSchema.define({
    generoRelevancia: generoRelevancia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieRelevancia = especieRelevanciaSchema;

