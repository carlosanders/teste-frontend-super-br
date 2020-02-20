import {usuario} from './base.schema';
import {especieRelevancia} from './base.schema';
import {processo} from './base.schema';
import {relevancia as relevanciaSchema} from './base.schema';

relevanciaSchema.define({
    especieRelevancia: especieRelevancia,
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const relevancia = relevanciaSchema;
