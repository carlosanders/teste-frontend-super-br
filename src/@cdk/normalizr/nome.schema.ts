import {usuario} from './base.schema';
import {origemDados} from './base.schema';
import {nome as nomeSchema} from './base.schema';

nomeSchema.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const nome = nomeSchema;
