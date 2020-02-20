import {usuario} from './usuario.schema';
import {origemDados} from './origem-dados.schema';
import {nome as nomeSchema} from './base.schema';

nomeSchema.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const nome = nomeSchema;
