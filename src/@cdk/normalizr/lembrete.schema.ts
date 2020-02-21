import {usuario} from './base.schema';
import {processo} from './base.schema';
import {lembrete as lembreteSchema} from './base.schema';

lembreteSchema.define({
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const lembrete = lembreteSchema;
