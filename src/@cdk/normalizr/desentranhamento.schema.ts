import {usuario} from './base.schema';
import {juntada} from './base.schema';
import {processo} from './base.schema';
import {desentranhamento as desentranhamentoSchema} from './base.schema';

desentranhamentoSchema.define({
    juntada: juntada,
    processoDestino: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const desentranhamento = desentranhamentoSchema;
