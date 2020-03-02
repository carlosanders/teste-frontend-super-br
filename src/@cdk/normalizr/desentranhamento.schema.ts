import {usuario} from './index.schema';
import {juntada} from './index.schema';
import {processo} from './index.schema';
import {desentranhamento as desentranhamentoSchema} from './index.schema';

desentranhamentoSchema.define({
    juntada: juntada,
    processoDestino: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const desentranhamento = desentranhamentoSchema;
