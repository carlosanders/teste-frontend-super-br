import {usuario} from './index.schema';
import {especieRelevancia} from './index.schema';
import {processo} from './index.schema';
import {relevancia as relevanciaSchema} from './index.schema';

relevanciaSchema.define({
    especieRelevancia: especieRelevancia,
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const relevancia = relevanciaSchema;
