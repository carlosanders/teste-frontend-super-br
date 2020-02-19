import {processo} from './processo.schema';
import {usuario} from './usuario.schema';
import {historico as historicoSchema} from './base.schema';

historicoSchema.define({
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const historico = historicoSchema;
