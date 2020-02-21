import {usuario} from './base.schema';
import {generoRelevancia as generoRelevanciaSchema} from './base.schema';

generoRelevanciaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoRelevancia = generoRelevanciaSchema;
