import {usuario} from './index.schema';
import {origemDados} from './index.schema';
import {nome as nomeSchema} from './index.schema';

nomeSchema.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const nome = nomeSchema;
