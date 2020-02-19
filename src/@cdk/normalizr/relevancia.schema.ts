import {usuario} from './usuario.schema';
import {especieRelevancia} from './especie-relevancia.schema';
import {processo} from './processo.schema';
import {relevancia as relevanciaSchema} from './base.schema';

relevanciaSchema.define({
    especieRelevancia: especieRelevancia,
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const relevancia = relevanciaSchema;
