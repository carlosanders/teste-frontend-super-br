import {generoRelevancia} from './index.schema';
import {usuario} from './index.schema';
import {especieRelevancia as especieRelevanciaSchema} from './index.schema';

especieRelevanciaSchema.define({
    generoRelevancia: generoRelevancia,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieRelevancia = especieRelevanciaSchema;

