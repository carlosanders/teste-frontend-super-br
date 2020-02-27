import {usuario} from './usuario.schema';
import {juntada} from './juntada.schema';
import {processo} from './processo.schema';
import {desentranhamento as desentranhamentoSchema} from './base.schema';

desentranhamentoSchema.define({
    juntada: juntada,
    processoDestino: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const desentranhamento = desentranhamentoSchema;
