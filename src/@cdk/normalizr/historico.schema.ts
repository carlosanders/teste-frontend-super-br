import {processo} from './base.schema';
import {usuario} from './base.schema';
import {historico as historicoSchema} from './base.schema';

historicoSchema.define({
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const historico = historicoSchema;
