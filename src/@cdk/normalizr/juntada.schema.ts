import {documento} from './base.schema';
import {usuario} from './base.schema';
import {origemDados} from './base.schema';
import {juntada as juntadaSchema} from './base.schema';

juntadaSchema.define({
    documento: documento,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
});

export const juntada = juntadaSchema;
