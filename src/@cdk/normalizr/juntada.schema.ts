import {documento} from './index.schema';
import {usuario} from './index.schema';
import {origemDados} from './index.schema';
import {juntada as juntadaSchema} from './index.schema';

juntadaSchema.define({
    documento: documento,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
});

export const juntada = juntadaSchema;
