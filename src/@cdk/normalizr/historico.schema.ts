import {processo} from './index.schema';
import {usuario} from './index.schema';
import {historico as historicoSchema} from './index.schema';

historicoSchema.define({
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const historico = historicoSchema;
