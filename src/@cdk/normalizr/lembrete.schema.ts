import {usuario} from './index.schema';
import {processo} from './index.schema';
import {lembrete as lembreteSchema} from './index.schema';

lembreteSchema.define({
    // processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const lembrete = lembreteSchema;
