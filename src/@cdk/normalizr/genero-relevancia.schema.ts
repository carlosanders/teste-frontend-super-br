import {usuario} from './index.schema';
import {generoRelevancia as generoRelevanciaSchema} from './index.schema';

generoRelevanciaSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const generoRelevancia = generoRelevanciaSchema;
