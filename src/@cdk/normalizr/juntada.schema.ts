import {documento} from './documento.schema';
import {usuario} from './usuario.schema';
import {origemDados} from './origem-dados.schema';
import {juntada as juntadaSchema} from './base.schema';

juntadaSchema.define({
    documento: documento,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
});

export const juntada = juntadaSchema;
