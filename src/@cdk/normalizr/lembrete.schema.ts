import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {lembrete as lembreteSchema} from './base.schema';

lembreteSchema.define({
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const lembrete = lembreteSchema;
